# Splitify - Expense Sharing Application

A minimalist web application to share expenses with friends and family. This is a customized version with English and Hindi language support, featuring a clean, unbranded interface.

## 🌟 Features

- ✅ Create groups and share expenses with friends
- ✅ Add expenses with detailed descriptions
- ✅ View group balances and settlements
- ✅ Create reimbursement expenses
- ✅ Progressive Web App (PWA)
- ✅ Split expenses evenly or unevenly
- ✅ Mark groups as favorites
- ✅ Assign categories to expenses
- ✅ Search for expenses within groups
- ✅ Upload and attach receipts/images
- ✅ Scan receipts to create expenses
- ✅ **Bilingual Support**: English and Hindi
- ✅ **Clean Interface**: No branding or promotional content

## 🌐 Language Support

- **English** (`en-US`) - Full support
- **हिन्दी** (`hi-HI`) - Complete Hindi translation

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd spliit
   ```

2. **Set up environment variables**
   Create a `.env` file:
   ```env
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=1234
   POSTGRES_DB=spliit
   POSTGRES_PRISMA_URL=postgresql://postgres:1234@localhost:5432/spliit?schema=public
   POSTGRES_URL_NON_POOLING=postgresql://postgres:1234@localhost:5432/spliit?schema=public
   ```

3. **Start the database**
   ```bash
   docker-compose up -d db
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Docker Setup (Alternative)

1. **Create container environment**
   ```bash
   cp container.env.example container.env
   ```

2. **Build and run with Docker**
   ```bash
   docker-compose build
   docker-compose up
   ```

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) - React framework for web applications
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/UI](https://ui.shadcn.com/) - Modern UI component library
- [Prisma](https://prisma.io) - Database ORM and migrations
- [PostgreSQL](https://postgresql.org/) - Relational database
- [Docker](https://docker.com/) - Containerization

## 📱 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server

# Database
npm run postinstall # Run Prisma migrations and generate client

# Code Quality
npm run lint        # Run ESLint
npm run check-types # TypeScript type checking
npm run prettier    # Format code with Prettier

# Docker
npm run build-image      # Build Docker image
npm run start-container  # Start with Docker Compose
```

## 🗄️ Database Management

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio
```

## 🐳 Docker Commands

```bash
# Start only database
docker-compose up -d db

# Check service status
docker-compose ps

# View logs
docker-compose logs db

# Stop services
docker-compose down

# Remove volumes (reset data)
docker-compose down --volumes
```

### Environment Variables for Production

```env
POSTGRES_PRISMA_URL=your_database_connection_string
POSTGRES_URL_NON_POOLING=your_non_pooling_connection_string
NEXT_PUBLIC_BASE_URL=your_production_url
```

## 🔧 Troubleshooting

### Common Issues

**Database Connection Error:**
- Ensure PostgreSQL is running
- Check your `.env` file configuration
- Verify database credentials

**Port Already in Use:**
- The app will automatically try ports 3001, 3002, etc.
- Or manually specify: `npm run dev -- -p 3001`

**npm install Fails:**
- Make sure database is running first
- Check Node.js version (requires v18+)

