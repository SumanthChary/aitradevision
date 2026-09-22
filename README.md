# AI Trade Vision

AI Trade Vision is a Web Application built with React, TypeScript, and Vite. It integrates Supabase for backend services and AI-driven features to assist with trading insights and analytics.

---

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Vite
* **UI & Styling:** Tailwind CSS, shadcn/ui
* **Backend & Database:** Supabase
* **Package Manager:** npm / bun

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

Ensure you have Node.js (v18+) and npm installed on your machine.

```bash
# Verify Node installation
node -v
npm -v

```

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/SumanthChary/aitradevision.git
cd aitradevision

```


2. **Install dependencies**
```bash
npm install

```


3. **Set up environment variables**
Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

```


4. **Run the development server**
```bash
npm run dev

```


Open your browser and navigate to `http://localhost:5173`.

---

## 📁 Project Structure

```text
aitradevision/
├── public/          # Static assets
├── src/             # Application source code
│   ├── components/  # React components & UI primitives
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # Route pages
│   └── lib/         # Utility functions & Supabase client setup
├── supabase/        # Database migrations & edge functions
├── index.html       # HTML entry point
├── package.json     # Project dependencies and scripts
└── vite.config.ts   # Vite configuration

```

---

## 📜 Available Scripts

In the project directory, you can run:

* `npm run dev`: Runs the app in development mode with HMR.
* `npm run build`: Builds the app for production to the `dist` folder.
* `npm run preview`: Locally preview the production build.
* `npm run lint`: Runs ESLint to check for code formatting issues.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
