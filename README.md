# gCast

A modern podcast platform built with React, TypeScript, and Vite.

## Features

- 🎧 Podcast streaming and management
- 🔐 Secure authentication with Google OAuth
- 📱 Responsive design for all devices
- 🎨 Modern UI with Material-UI
- ⚡ Fast performance with Vite
- 🔍 Type safety with TypeScript
- 🧪 Comprehensive testing with Vitest
- 📦 Easy deployment with Netlify

## Prerequisites

- Node.js 18 or later
- npm or yarn
- Google OAuth credentials

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gcast.git
   cd gcast
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   VITE_APP_NAME=gCast
   VITE_APP_VERSION=1.0.0
   VITE_APP_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── assets/        # Static assets
├── components/    # React components
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── services/      # API services
├── theme/         # Theme configuration
├── types/         # TypeScript types
└── utils/         # Utility functions
```

## Deployment

The project is configured for deployment on Netlify. Simply connect your repository to Netlify and it will automatically build and deploy your application.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
