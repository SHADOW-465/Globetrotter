# 🌍 Globetrotter - Multi-City Travel Planner

Globetrotter is a premium, intelligent, and collaborative travel planning application. It helps users organize complex multi-city trips with ease, featuring a stunning glassmorphism design and powerful budgeting tools.

## ✨ Features

- **Intuitive Dashboard**: Track ongoing, upcoming, and completed trips at a glance.
- **Multi-Step Trip Wizard**: Effortlessly start your next adventure with our guided creation flow.
- **Dynamic Itinerary Builder**: Manage stops, activities, and schedules in a beautiful vertical timeline.
- **Smart Discovery**: Explore cities and activities with curated meta-information and "AI-inspired" recommendations.
- **Financial Analytics**: Visualize your travel spending with detailed category breakdowns and budget health alerts.
- **Admin Dashboard**: Comprehensive overview for platform administrators to track usage and trends.
- **Premium UI/UX**: Built with a focus on aesthetics, featuring glassmorphism, micro-animations, and full responsiveness.

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **PostgreSQL** (for the database)

### Installation

1. **Clone and Install**:
   ```bash
   cd globetrotter
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env` file in the `globetrotter/` directory:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
   ```
   > [!NOTE]
   > **API Keys**: Currently, the application uses mock data for searches and "AI" suggestions to be functional immediately. If you wish to integrate real 3rd-party services in the future (e.g., Google Maps, OpenAI), you will need to add those keys to your `.env`.

3. **Database Setup**:
   Initialize your database schema with Prisma:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to explore Globetrotter.

## 🛠 Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS + [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database**: [Prisma](https://www.prisma.io/) with PostgreSQL
- **Icons**: [Lucide React](https://lucide.dev/)

## 📖 Usage Guide

1. **Onboarding**: Start by **Registering** to create your profile.
2. **Planning**: Use the **"Plan a New Trip"** button on the dashboard.
3. **Building**: In the **Itinerary Builder**, add stops (cities) and activities for each stop to see your timeline grow.
4. **Budgeting**: Check the **Budget** page to see real-time financial breakdowns of your plan.
5. **Exploring**: Visit the **Explore** tab to find inspiration for your next destination.
6. **Admin**: Access `/admin` to see platform-wide analytics.

---
Built with ❤️ by the Globetrotter Team.
