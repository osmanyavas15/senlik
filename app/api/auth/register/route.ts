import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createToken, isAdminEmail } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Tüm alanlar gerekli' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Bu email zaten kayıtlı' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: isAdminEmail(email) ? 'admin' : 'buyer',
      },
    });

    const token = createToken(user.id, user.email, user.role);
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Kayıt sırasında bir hata oluştu' }, { status: 500 });
  }
}