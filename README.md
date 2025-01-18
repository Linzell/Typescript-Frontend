# Medication Manager Frontend

A modern React application for managing medications, built with TypeScript and following clean architecture principles.

## 🏗️ Architecture

This project follows Clean Architecture, DDD principles, and modern React best practices:

```typescript
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
│   ├── ui/        # Shadcn components
│   └── common/    # Shared components
├── features/       # Feature-based modules
│   ├── auth/
│   └── medications/
├── hooks/          # Shared hooks
├── lib/           # Utilities and configurations
├── providers/     # Context providers
├── pages/         # Route pages
├── services/      # API services
└── types/         # Shared types
```

### Key Design Principles

- **Domain-Driven Design**: Feature-based architecture
- **Clean Architecture**: Separation of concerns
- **SOLID Principles**: Maintainable and extensible code
- **Component-Driven Development**: Using Storybook
- **Test-Driven Development**: Comprehensive test coverage

## 🚀 Features

- Authentication system (login/register)
- Paginated medication list
- Filtering by active substance and administration routes
- Detailed medication information
- Responsive design
- Internationalization support
- Dark/Light theme

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Routing**: TanStack Router
- **State Management**: TanStack Query
- **Styling**: Tailwind CSS + Shadcn
- **Forms**: React Hook Form + Zod
- **Testing**: Bun Test + Testing Library
- **Documentation**: Storybook
- **Build Tool**: Vite

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm
- Docker (optional)

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd medication-frontend
```

2. Copy the environment template:
```bash
cp .env.example .env
```

3. Install dependencies:
```bash
bun install
```

### Development

```bash
# Start development server
bun run dev

# Run tests
bun run test

# Run Storybook
bun run storybook

# Type checking
bun run type-check
```

### Docker Development

```bash
# Build and start container
bun run docker:build
bun run docker:up

# Stop container
bun run docker:down

# View logs
bun run docker:logs
```

## 📚 API Integration

The application connects to a backend API with the following endpoints:

- `GET /api/v1/medications` - Get paginated list of medications
- `GET /api/v1/medications/:id` - Get medication details
- `POST /auth/login` - Authentication
- `POST /auth/logout` - Logout
- `POST /auth/register` - Register

## 🧪 Testing

```bash
# Run all tests
bun run test

# Watch mode
bun run test:watch

# Coverage report
bun run test:coverage
```

### Storybook

```bash
# Run Storybook
bun run storybook

# Build static Storybook
bun run build-storybook
```

## 🔧 Configuration

Key environment variables:

```env
VITE_BACKEND_URL=http://localhost:3000
API_URL=http://localhost:3000
```

## 🚢 Deployment

### Production Build

```bash
# Create production build
bun run build

# Preview production build
bun run preview
```

### Docker Production

```bash
# Build production image
docker build -t medication-frontend .

# Run production container
docker run -p 80:80 medication-frontend
```

## 📝 Code Style

- ESLint and Prettier for code formatting
- Conventional Commits for commit messages
- Pre-commit hooks with lint-staged
- TypeScript strict mode enabled

## 👥 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/)
- [TanStack](https://tanstack.com/)
- [FDA Drug NDC API](https://open.fda.gov/apis/drug/ndc/)
