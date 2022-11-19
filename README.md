<h1 align="center"><img alt="NLW Copa Server" title="NLW Copa Server" src=".github/logo.svg" width="250" /></h1>

# NLW Copa Server

## 💡 Project's Idea

This project was developed during the RocketSeat's Next Level Week - Copa event. It aims to create a *backend* server application for providing world cup pools for friends which are loooking for placing their bets on the Fifa 2022 World Cup Games.

## 🔍 Features

* Users register/login;
* Available pools listing;
* New pools creation;
* Users count;
* Available games listing;
* New guesses creation;
* Available guesses listing;

## 💹 Extras

* New games creation;
* Pools ranking listing;
* Games results setting (with auto score updating for guesses and participants);

## 🛠 Technologies

During the development of this project, the following techologies were used:

- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io/)
- [Fasfity JWT](https://github.com/fastify/fastify-jwt)
- [Fastify env](https://github.com/fastify/fastify-env)
- [Prisma](https://www.prisma.io/)
- [Mermaid.js](https://mermaid-js.github.io/mermaid/#/)
- [TypeScript](https://www.typescriptlang.org/)

## 💻 Project Configuration

### First, install the dependencies for the project

```bash
$ yarn
```

### In order to create new migrations for the database, the following command should be used. After executing it, you should provide the nem migration name.

```bash
$ npx prisma migrate dev
```

### If you want to seed more data to the datatable with *seed* files, the following command must be used, replacing the "*prisma/seed.ts*" section, with the desired file name and path.

```bash
$ npx tsx prisma/seed.ts
```

## 🌐 Setting up config files

Create an *.env* file on the root directory, with all needed variables, credentials and API keys, according to the sample provided (*.env example*).

## ⏯️ Running

To run the project in a development environment, execute the following command on the root directory.

```bash
$ yarn dev
```

In order to view and update the database contents, we can use the [Prisma Studio](https://www.prisma.io/studio), which can be launched with the following command:

```bash
$ npx prisma studio
```

In order to generate the database entity relationship diagram (ERD), use the following command:

```bash
$ npx prisma generate
```

## 🔨 Project's *Build* for *Deploy*

In order to deploy the app online, there are some steps to be done. First, you must build the application using the following command:

```bash
$ yarn build
```

After that, you can run the production server with the command below:

```bash
$ yarn start
```

### Documentation:
* [fastify-env](https://github.com/fastify/fastify-env)

## 📄 License

This project is under the **MIT** license. For more information, access [LICENSE](./LICENSE).
