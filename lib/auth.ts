import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'kutsal1993@hotmail.com';
const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword);
}

export function createToken(userId: number, email: string, role: string): string {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function isAdminEmail(email: string): boolean {
  return email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

// Generate random token for password reset
export function generateResetToken(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}