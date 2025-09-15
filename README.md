 Buyer Lead Intake App

A mini app built with Next.js and TypeScript to capture, manage, and track buyer leads efficiently. It includes validation, server-side rendering, search/filter functionalities, and CSV import/export with proper error handling.

 🚀 Features

- Create new buyer leads with full validation (client + server)
- List leads with pagination, filtering, sorting, and search
- View and edit leads with concurrency control and change history
- Import leads from CSV with row-level validation and transaction safety
- Export filtered leads as CSV
- Ownership enforcement: users can only edit/delete their own leads
- Authentication using magic link or demo login
- Accessibility-friendly forms and error handling

 ✅ Tech Stack

- Framework : Next.js (App Router) with TypeScript
- Database : PostgreSQL / Supabase / SQLite using Prisma ORM with migrations
- Validation : Zod for both server and client-side validation
- Authentication : Simple magic link or demo login
- Styling : Tailwind CSS (optional)
- Testing : Unit tests for validation logic
- Error Handling : Error boundaries, rate limiting, stale data handling

 📂 Data Model

- `buyers`: Main table to store buyer leads
- `buyer_history`: Tracks changes to leads, who changed them, and when

 📥 CSV Import Format

The CSV must include these headers:

Each row represents one lead with validated fields.

 📦 Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/buyer-lead-intake.git
   cd buyer-lead-intake
2. Install dependencies:

npm install

3. Configure environment variables:

DATABASE_URL=your_database_connection_string
NEXT_PUBLIC_AUTH_SECRET=your_secret

4. Run migrations:

npx prisma migrate dev

5. Start the development server:

npm run dev

Visit http://localhost:3000 to use the app.

Benefits : 

✔ Accuracy: The solution ensures that only valid, complete, and consistent data is saved in the database.

✔ User Experience: Clear error reporting and validation help users fix mistakes easily without frustration.

✔ Data Integrity: Transaction-safe processing prevents partial imports and protects the database from inconsistent records.

✔ Scalability: The design handles multiple rows efficiently while ensuring performance.

✔ Business Alignment: This feature supports common workflows for managing leads from various sources in real estate, improving operational efficiency.
