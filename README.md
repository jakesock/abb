# Typescript/GraphQL Auth Server Boilerplate

A monorepo for an AirBnB clone using Next.js, Express, Apollo Server/Apollo Client, Typescript, TypeORM, PostgreSQL and Redis.

## TODO:

- [x] Add update listings functionality
- [x] Add delete listings funcitonality
- [ ] Update User entity to include host name, etc.
- [ ] Update Listings entity to include more info about the listing
- [ ] Add seed function to drop the db and seed database with dummy data
- [ ] Finish writing server tests
- [ ] Client tests
- [ ] Finish package tests
- [ ] Add a utils package for common functions
- [ ] Update all README files
- [ ] (?) Deploy packages to NPM and install them from registry rather than workspaces
- [ ] Dockerize server
- [ ] Deploy the server
- [ ] Deploy the client

## Packages and Apps

- [apps/web](https://github.com/jakesock/abb/tree/main/apps/server#readme): Next.js web frontend for abb
- [apps/server](https://github.com/jakesock/abb/tree/main/apps/server#readme): GraphQL Server for abb
- [packages/errors](https://github.com/jakesock/abb/tree/main/packages/errors#readme): Custom error types and responses to be used throughout apps
- [packages/yup-schemas](https://github.com/jakesock/abb/tree/main/packages/yup-schemas#readme): Yup schemas for input validation
- [packages/config](https://github.com/jakesock/abb/tree/main/packages/config#readme): ESLint Configuration files
- [packages/tsconfig](https://github.com/jakesock/abb/tree/main/packages/tsconfig#readme): A collection of tsconfig.json files for different environments

## Installation

This project uses yarn v2 for dependency and workspace (monorepo) management. For more information on installing yarn, visit [their website](https://yarnpkg.com/getting-started/install).

1. Clone the repository

```
git clone git@github.com:jakesock/abb.git
```

2. Change to the root directory of the repository

```
cd abb
```

3. Install package dependencies

```
yarn workspaces focus @abb/errors @abb/yup-schemas @abb/config @abb/tsconfig
```

4. Build the packages the server and web app will use

```
yarn run errors:build && yarn run yup-schemas:build
```

5. Install rest of dependencies

```
yarn install
```

6. Run this command to install husky hooks for git:

```
yarn run prepare
```

7. Start the PostgreSQL server on your local machine and create a dev and test database.

```
createdb <YOUR_DATABASE_NAME>
```

8. Install and start the Redis Server on your local machine.

9. Create a .env file in the apps/server folder and copy the contents of .env.example into it. Fill out the port and database connection information.

10. Visit [Ethereal Email](https://ethereal.email) and generate email credentials. Fill out the email variables in the .env file. Finish by filling out the session secreate and frontend url variables.

11. At the root of the project, run this command to build the packages and apps.

```
yarn run build
```

## Running the Development Server for @abb/web and @abb/server

1. Change directories to the apps/server folder and run this command:

```
yarn run build:watch
```

2. In a second terminal window (still in the apps/server folder), run this command to start the development server:

```
yarn run dev
```

3. In a third terminal window, change directories in to the apps/web folder and run this command:

```
yarn run dev
```

## Making commits

This project uses husky, commitlint, and commitizen for a local CI process. To make a commit, run this command:

```
yarn run commit
```

and follow the instructions. When you are done, husky will automatically run a lint and prettier check, as well as checking for a conventional commmit message before committing. When you push your commits, it will run style checks, tests, type checks and build tests before finalizing the push.

All of this behavior can be changed by editing the files within the .husky folder, as well as the .lintstagedrc.json and comitlint.config.js files.

Commands to run tests, type checks, builds, and style checks can be found in the root package.json, as well as the package.json files within the apps and packages folders.

## Features (Old, to be updated)

- Authentication using session cookies (Register, Login, Logout, Reset/Forgot Password, Change Password)
- Email verification and communication using redis for token storage
- Rate limiting
- GraphQL query complexity limit
- Input validation and regulated error handling/responses
- Logging using winston (barebones implementation logging to console)
- Testing with jest
- Local CI and style-enforcement pipeline using husky, lintstaged, commitizen, commitlint, eslint, and prettier.
