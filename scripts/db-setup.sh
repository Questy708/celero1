#!/bin/bash
# xCelero Labs Database Setup Script
# Usage: ./scripts/db-setup.sh [sqlite|postgresql]

set -e

DB_TYPE=${1:-sqlite}

if [ "$DB_TYPE" = "postgresql" ]; then
  echo "Switching to PostgreSQL..."
  cp prisma/schema.production.prisma prisma/schema.prisma
  
  if [ -z "$DATABASE_URL" ]; then
    echo "ERROR: DATABASE_URL environment variable must be set for PostgreSQL"
    echo "Example: export DATABASE_URL='postgresql://user:password@host:5432/xcelero?schema=public'"
    exit 1
  fi
  
  echo "Running Prisma migrations..."
  npx prisma migrate dev --name init
  echo "PostgreSQL setup complete!"
else
  echo "Using SQLite (development mode)..."
  echo "DATABASE_URL=file:./db/custom.db"
  npx prisma db push
  echo "SQLite setup complete!"
fi
