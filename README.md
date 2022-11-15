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

* 

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

In order to deploy the app online, there are some steps to be done.

...

### Documentation:
* [fastify-env](https://github.com/fastify/fastify-env)

## 📄 License

This project is under the **MIT** license. For more information, access [LICENSE](./LICENSE).
