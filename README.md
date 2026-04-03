# VocoMate

An AI speech training platform for interview preparation, speech practice, and vocabulary improvement.

## Features

- **Train Mode**: Live real-time speech analytics and feedback
- **Interview Mode**: Dynamic mock interview bot simulating behavioral and technical questions
- **Vocabulary Lab**: Advanced terminology alternative suggestions 
- **Profile Dashboard**: Recharts-based history and trends

## Tech Stack

- **Framework**: Next.js 15 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & shadcn/ui components
- **Persistence**: Prisma ORM + PostgreSQL (Fallback mode supported natively)
- **Speech Parsing**: Local browser Web Speech API implementation (No server bills, 100% private)
- **Charts**: Recharts

## Setup & Local Development

This app is designed to run purely locally out-of-the-box. We have integrated graceful fallbacks so the app works flawlessly on your machine without needing to connect any databases immediately. 

### Prerequisites

- Node.js >= 18
- (Optional) PostgreSQL database url if you wish to persist real data

### Installation Steps

1. Install all dependencies:
\`\`\`bash
npm install
\`\`\`

2. Define your environment values:
We've included an example in `.env.example`.
Create a `.env` file and define `DATABASE_URL`:
\`\`\`bash
cp .env.example .env
\`\`\`
> Note: If you don't supply a SQL database, the app automatically switches to *Fallback Mode*, simulating the database writes.

3. *(Optional)* Generate DB and schemas (skipped automatically if you use Fallback mode):
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

4. Run the development server
\`\`\`bash
npm run dev
\`\`\`

Go to \`http://localhost:3000\`.
*Any test credentials (e.g. \`test@example.com\`, \`password123\`) will successfully log you into the demo dashboard!*

## Architecture

- **`src/app/`**: Next.js 15 server routes and API entry points.
- **`src/components/`**: Clean separation of feature-based client components (train, interview, vocabulary, profile).
- **`src/hooks/`**: Specialized `useSpeechRecognition` hooks handling generic abstractions.
- **`src/app/actions.ts`**: Pure server-actions for executing DB mutations.

## Extending Real AI

To plug in a real LLM provider (e.g., OpenAI or Anthropic):
- Check `src/components/train/TrainRecorder.tsx` strings. We simulate live AI pacing logic.
- You can route the transcription from the local browser client (`transcript` var) to a `fetch('/api/ai')` call.
