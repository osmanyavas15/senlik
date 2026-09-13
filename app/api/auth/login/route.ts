import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, createToken } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email ve şifre gerekli' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Email veya şifre yanlış' }, { status: 401 });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Email veya şifre yanlış' }, { status: 401 });
    }

    const token = createToken(user.id, user.email, user.role);
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}