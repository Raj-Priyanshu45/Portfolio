# Priyanshu Raj — Engineering Portfolio

A standalone, recruiter-facing React + Vite portfolio for **Priyanshu Raj — Java & Spring Boot Developer**.

## Run locally

Your terminal log showed **Node 22.23.2 with npm 10.9.8**, and npm 10.9.x has a known Arborist crash that can produce `Cannot read properties of null (reading 'edgesOut')` while resolving dependency trees. The npm CLI issue tracker documents the same failure mode, and current guidance in affected packages is to use npm 11. citeturn667698search0turn667698search2

This portfolio has also been deliberately reduced to a small dependency set, removing the unnecessary Tailwind/Radix/Lovable runtime tree. The included `.npmrc` also enables `legacy-peer-deps` to avoid npm 10 peer-resolution problems.

Recommended setup:

```bash
# from this project directory
npm install -g npm@11
npm install
npm run dev
```

Then open `http://localhost:3000`.

If you do not want to change your global npm yet, try:

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production output is `dist/`.

## Vercel

This is a normal Vite project. Import the repository into Vercel with:

- Build command: `npm run build`
- Output directory: `dist`

No Lovable account, backend, database, authentication, or environment variables are required.

## Portfolio facts

- Name: Priyanshu Raj
- Headline: Java & Spring Boot Developer
- B.E. Information Science and Engineering
- 5th semester
- Expected graduation: 2028
- Projects: Real-Time Chat App, ShopNetic, Distributed API Gateway

Contact and project destinations are centralized in `src/lib/content.ts`.
