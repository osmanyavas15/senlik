import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, comparePassword } from '@/lib/auth';

// Profil güncelle (ad, email)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, email } = body;

    if (!id) {
      return NextResponse.json({ error: 'Kullanıcı ID gerekli' }, { status: 400 });
    }

    const updateData: { name?: string; email?: string } = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json({ user, message: 'Profil güncellendi' });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Güncelleme başarısız' }, { status: 500 });
  }
}

// Şifre değiştir
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, oldPassword, newPassword } = body;

    if (!id || !oldPassword || !newPassword) {
      return NextResponse.json({ error: 'Tüm alanlar gerekli' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });
    }

    const passwordMatch = await comparePassword(oldPassword, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Mevcut şifre yanlış' }, { status: 401 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Yeni şifre en az 6 karakter olmalı' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: Number(id) },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: 'Şifre başarıyla değiştirildi' });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'Şifre değiştirilemedi' }, { status: 500 });
  }
}