import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

// Tüm kullanıcıları getir
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Kullanıcılar getirilemedi' }, { status: 500 });
  }
}

// Kullanıcı güncelle (ad, email, şifre, rol)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, email, password, role } = body;

    if (!id) {
      return NextResponse.json({ error: 'Kullanıcı ID gerekli' }, { status: 400 });
    }

    const updateData: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    } = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (role) updateData.role = role;
    if (password) updateData.password = await hashPassword(password);

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user, message: 'Kullanıcı güncellendi' });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
  }
}

// Kullanıcı sil
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Kullanıcı ID gerekli' }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Kullanıcı silindi' });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 });
  }
}