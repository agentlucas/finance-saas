import { PrismaClient } from '@prisma/client';

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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
