# Toop

This project is a hands-on personal sample built to enhance my resume and showcase proficiency with modern frontend technologies. The main objectives are:

- **Page Architecture with Next.js**: Utilizing Server-Side Rendering (SSR) and Static Site Generation (SSG) to optimize performance and SEO.
- **Data Fetching**: Implementing `fetch` in Next.js with automatic caching to keep football scores and news up to date.
- **Simple and Accessible UI**: Crafting a responsive design with Tailwind CSS for live league results, match schedules, and latest news.
- **TypeScript & TSX Integration**: Writing type-safe components and leveraging JSX features within a Next.js project.
- **Consuming Multiple External APIs**:

  - Football data (league tables and match schedules) from `football-data.org`.
  - Daily football news from `newsapi.org`.

## Project Preview

View the project’s functionality and user interface via video or GIF:

- [Preview 1](https://drive.google.com/file/d/1f0S5s9Wa6m5uCkSMg5Nr_mJ8m2CghHVV/view?usp=sharing)
- [Preview 2](https://drive.google.com/file/d/1XEUlZBP4zx4BWWmfpZy3kSxF-7GpXGD-/view?usp=sharing)
- [Preview 3](https://drive.google.com/file/d/1rcB6T1p2QTJUKFdBOc6QntAeowqscGxe/view?usp=sharing)

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/toop.git
   cd toop
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your API keys.
4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Customization

Feel free to tweak this project to suit your needs by:

- Adding custom styles or themes with Tailwind CSS
- Integrating other APIs or creating new Next.js routes
- Modifying component structures or adding custom pages

## Bug Reports

If you encounter any issues:

1. Check existing Issues to avoid duplicates.
2. Open a new Issue with a clear title and detailed description.
3. Attach screenshots or logs if possible.

## Known Issues

- **Responsive Design**: Some sections may not display optimally on extremely small or large screens.
- **searchParams on Home Page**:Limitations in newer Next.js versions required SSR for passing parameters, which may affect routing behavior. (Despite hours of effort, the issue could not be resolved, and the only viable solution found was using Server-Side Components (SSC), which diverged from the original project goals.)

## Upcoming Features

- User profile page to display favorite leagues and prioritize matches
- Final deployment on cloud platforms (Vercel, Netlify, or custom server)
- Dark theme support
