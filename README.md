# Paytm-Clone

## Introduction
This project is a basic Paytm clone that provides essential e-wallet functionalities such as adding money to the wallet and transferring money between users. It leverages a modern tech stack to ensure a seamless and responsive user experience.

## Features
- **User Authentication and Authorization**: Secure user login and registration.
- **Add Money to Wallet**: Users can add funds to their digital wallet.
- **Money Transfer**: Users can transfer money to other users' wallets.
- **Webhooks Integration**: Utilizes webhooks for onRamp backends to handle asynchronous events.
- **Merchant App**: A merchant application is currently in development to facilitate transactions for businesses.

## Tech Stack
- **Frontend & Backend**: Next.js
- **Auxiliary Backends**: Express.js
- **Monorepo Management**: Turborepo
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **CI/CD** - Github Workflows

## Project Structure
The project is structured to separate concerns and facilitate a microservices architecture:
- **apps**: Contains the main Next.js application.
- **packages**: Contains shared libraries and configurations.
- **services**: Contains auxiliary backend services built with Express.js.

## Environment Variables
The project requires the following environment variables to be configured:

Change .env.example -> .env and replace variable accordingly


- npm install
- Run postgres either locally or on the cloud (neon.tech)

```jsx
docker run  -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```
- Go to `packages/db`
    - npx prisma migrate dev
    - npx prisma db seed
- Go to `apps/user-app` , run `npm run dev`
- Try logging in using phone - 1111111111 , password - alice (See `seed.ts`)