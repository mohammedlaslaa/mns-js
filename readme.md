# mns-js

## Overview
`mns-js` is a personal Node.js project that generates routes automatically based on a specific schema. This project is developed in TypeScript and utilizes various tools and libraries to handle routing, databases, and schema management efficiently.

## Features
- Auto-generates routes based on a defined schema
- Uses Express for server-side routing
- Integrated with Prisma for database migrations and queries
- Supports MongoDB with Mongoose for data management
- Command-line interface (CLI) for custom script execution

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mohammedlaslaa/mns-js.git
    cd mns-js
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Setup environment variables by creating a `.env.local` file:

    ```bash
    touch .env.local
    # Add your environment variables here
    ```

## Scripts

The following scripts are defined in the `package.json` and can be executed with `npm run`:

- **build**: Compile the TypeScript files into JavaScript

    ```bash
    npm run build
    ```

- **start**: Start the application

    ```bash
    npm start
    ```

- **dev**: Run the app in development mode with hot-reloading and environment variables

    ```bash
    npm run dev
    ```

- **prisma:generate:dev**: Generate Prisma client

    ```bash
    npm run prisma:generate:dev
    ```

- **prisma:migrate:dev**: Run Prisma migrations in development

    ```bash
    npm run prisma:migrate:dev
    ```

## CLI

This project includes a custom command-line interface (CLI) available through the `mns` command. You can run CLI tasks using:

    ```bash
    mns <command>
    ```

## Technologies Used

- **Node.js**: JavaScript runtime
- **TypeScript**: Typed superset of JavaScript
- **Prisma**: Database toolkit
- **MongoDB**: NoSQL database
- **Express**: Web framework for Node.js
- **Mongoose**: MongoDB object modeling for Node.js
- **Zod**: TypeScript-first schema declaration and validation

## Development

To develop locally, you can use the following command:

    ```bash
    npm run dev
    ```

This will start the TypeScript compiler in watch mode, alias paths, and a nodemon process for auto-reloading.

## Contributing

This is a personal project and not open to contributions at the moment.

## License

Licensed under the ISC License.
