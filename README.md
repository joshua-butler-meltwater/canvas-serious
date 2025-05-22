# AI Chat Input

A React application built with Vite, featuring a chat interface and various components for AI-powered interactions.

## Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Deployment

This project is configured for deployment on Vercel. You can deploy it in two ways:

### Using Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy to Vercel
vercel
```

### Using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy your project

## TypeScript Notes

The project contains some TypeScript errors that currently don't prevent the app from running. If you want to run TypeScript checks:

```bash
npx tsc --noEmit
```

To build with type checking:

```bash
npm run build:type-check
```
