import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed default categories
  const categories = [
    { name: 'Salary', type: 'INCOME', icon: '💰', color: '#10b981' },
    { name: 'Freelance', type: 'INCOME', icon: '💼', color: '#3b82f6' },
    { name: 'Investment', type: 'INCOME', icon: '📈', color: '#8b5cf6' },
    { name: 'Food & Dining', type: 'EXPENSE', icon: '🍔', color: '#ef4444' },
    { name: 'Transportation', type: 'EXPENSE', icon: '🚗', color: '#f59e0b' },
    { name: 'Shopping', type: 'EXPENSE', icon: '🛍️', color: '#ec4899' },
    { name: 'Entertainment', type: 'EXPENSE', icon: '🎬', color: '#6366f1' },
    { name: 'Bills & Utilities', type: 'EXPENSE', icon: '📄', color: '#64748b' },
    { name: 'Healthcare', type: 'EXPENSE', icon: '⚕️', color: '#14b8a6' },
    { name: 'Education', type: 'EXPENSE', icon: '📚', color: '#0ea5e9' },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.name },
      update: {},
      create: category as any,
    });
  }

  console.log('✅ Seeded categories');

  // Seed test users
  const hashedUserPassword = await bcrypt.hash('user123', 10);
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      name: 'Test User',
      password: hashedUserPassword,
      role: 'USER',
    },
  });

  await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: { role: 'ADMIN' }, // Update existing user to ADMIN if exists
    create: {
      email: 'admin@test.com',
      name: 'Admin User',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Seeded test users');
  console.log('   - user@test.com / user123 (USER)');
  console.log('   - admin@test.com / admin123 (ADMIN)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
