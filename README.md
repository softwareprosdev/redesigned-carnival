# Dental Prodigy

**DentalProdigy** is a modern, comprehensive dental practice management solution built as a high-performance monorepo. It bridges the gap between clinical efficiency and patient engagement through two dedicated applications: a **Clinical Dashboard** for dental professionals and a **Patient Portal** for appointment management and history.

## Project Overview

Built with a "performance-first" architecture, DentalProdigy leverages the latest web technologies to deliver a seamless experience.

*   **Architecture**: Turborepo Monorepo
*   **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
*   **Backend/Database**: Supabase (PostgreSQL), Drizzle ORM
*   **Language**: TypeScript (Strict)
*   **Package Manager**: Bun

## Features

### 🏥 Clinical App
*   **Dashboard Analytics**: Real-time overview of revenue, patient counts, and active treatments.
*   **Patient Management**: Comprehensive patient lists and detailed profiles.
*   **Interactive Odontogram**: SVG-based visual charting for tooth status (decay, fillings, crowns, etc.).
*   **Appointment Calendar**: Monthly view for scheduling and managing visits.
*   **Secure Authentication**: Role-based access for staff and dentists.

### 👤 Patient App
*   **Personalized Portal**: Secure login for patients to view their specific data.
*   **Appointment Management**: View upcoming and past appointments with status tracking.
*   **Treatment History**: Access historical treatment records and notes.
*   **Responsive Design**: Mobile-optimized interface for on-the-go access.

## Installation

### Prerequisites
*   **Node.js** >= 18
*   **Bun** >= 1.0
*   **Git**

### Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/softwareprosdev/redesigned-carnival.git
    cd redesigned-carnival
    ```

2.  **Install dependencies**
    We use `bun` for incredibly fast dependency resolution.
    ```bash
    bun install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the root directory. You will need Supabase credentials.
    ```env
    DATABASE_URL="postgresql://..."
    NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
    ```

4.  **Database Setup**
    Push the schema to your Supabase instance.
    ```bash
    cd packages/database
    bun run db:push
    ```

## Usage

### Development
Run both the Clinical and Patient applications simultaneously in development mode.
```bash
bun dev
```
*   **Clinical App**: [http://localhost:3000](http://localhost:3000)
*   **Patient App**: [http://localhost:3001](http://localhost:3001)

### Production Build
Build all applications and packages.
```bash
bun run build
```

### Start Production Server
```bash
bun start
```

## Project Structure

```text
├── apps/
│   ├── clinical/    # Next.js app for dentists/staff
│   └── patient/     # Next.js app for patients
├── packages/
│   ├── auth/        # Shared authentication logic
│   ├── database/    # Drizzle ORM schema and queries
│   ├── ui/          # Shared React components (Button, Card, Odontogram)
│   ├── eslint-config/ # Shared ESLint configurations
│   └── typescript-config/ # Shared TS configurations
```

## Contributing

We welcome contributions! Please follow these steps:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'feat: Add amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License.

---
**Dental Prodigy** — *Redefining Dental Software.*