# Home Task for Interview

This project using [Nest](https://nestjs.com), a progressive [Node.js](http://nodejs.org) framework for building efficient and scalable server-side applications.

### Installation

1. Make sure that you have [Node.js](https://nodejs.org)(>= 16.14.2) installed.
2. Clone this repository by running `git clone https://github.com/maooson/hometask.git`.
3. Move to the appropriate directory: `cd hometask`.
4. Run `yarn` to install dependencies.

### Configuration Files

#### [Prisma](https://github.com/prisma/prisma) Configurations

This template uses SQLite by default. If you want to use another database, follow instructions in the [official Nest recipe on Prisma](https://docs.nestjs.com/recipes/prisma).

#### JWT Configurations

A secret key is needed in encryption process. Generate a secret key using a service like [randomkeygen](https://randomkeygen.com/).

Enter your secret key to [`config.ts`](src/config.ts) file. You can also the change expiration time, default is 2 hours.

```js
  jwt: {
    secretOrKey: '__JWT_SECRET_KEY__',
    expiresIn: '2h',
  },
```

### Migrations

Please refer to the official [Prisma Migrate Guide](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate) to get more info about Prisma migrations.

```bash
# generate migration for local environment
$ yarn migrate:dev:create
# run migrations in local environment
$ yarn migrate:dev

# deploy migration to prod environment
$ yarn migrate:deploy:prod
```

### Running the app

```bash
# development mode
$ yarn start:dev

# production
$ yarn build
$ yarn start:prod
```

### Running the tests

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```