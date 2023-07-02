# WhatsApp Web Clone

This project is a clone of the WhatsApp web application, built using PostgreSQL, React, Node.js, and Redis.

## Table of Contents

- [WhatsApp Web Clone](#whatsapp-web-clone)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Database Setup](#database-setup)
  - [Installation](#installation)
  - [Contributing](#contributing)
  - [License](#license)
  - [Beta Version](#beta-version)
  - [Built With](#built-with)

## Getting Started

To get started with the project, follow these steps:

    Clone the repository to your local machine.
    Install the dependencies using npm install.
    Set up a PostgreSQL database.
    Set up a Redis and run the server.
    Run the database migrations using npm run migrate:up.
    Start the backend server using npm start.
    Start the frontend server using npm run dev
    Navigate to http://localhost:5173 in your web browser.

## Database Setup

1. Create a new PostgreSQL database named `whats_app`.
   - `CREATE DATABASE whats_app;`
2. Run the following commands to create a new PostgreSQL user:
   - `CREATE ROLE admin WITH LOGIN PASSWORD 'admin';`
   - `ALTER ROLE admin SUPERUSER CREATEROLE CREATEDB;`
   - `GRANT ALL PRIVILEGES ON DATABASE whats_app TO admin;`

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` or `yarn` to install dependencies.
3. Start the API in dev mode with `npm run dev` or `yarn dev`.
4. Without closing the terminal, navigate to the frontend directory with `cd frontend`.
5. Run `npm install` or `yarn` to install frontend dependencies.
6. Start the frontend server with `npm run start` or `yarn start`.

**Note:** The `.env` file contains environment variables that are used by the application to connect to the database and Redis server, as well as the session secret key. Please review the file carefully before using it, and make any necessary changes to ensure that it works with your specific environment.

## Contributing

To contribute to this project, follow these steps:

1. Fork this repository.
2. Create a branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request to this repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Beta Version

This project is still in beta version and is not yet ready for production use. There may be bugs, incomplete features, or other issues that need to be addressed. Use at your own risk and please report any issues you encounter.

## Built With

- [React](https://reactjs.org/) - Single Page Application Library
- [Node.js](https://nodejs.org) - JavaScript Runtime
- [Express](https://expressjs.com/) - JavaScript API Framework
- [Redis](https://redis.io/) - In-Memory Data Store
- [PostgreSQL](https://www.postgresql.org/) - Open Source Relational Database
