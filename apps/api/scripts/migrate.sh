#!/bin/bash
set -e

echo "Running database migrations..."
npx prisma db push --accept-data-loss

echo "Seeding database..."
npm run seed

echo "Database setup complete!"
