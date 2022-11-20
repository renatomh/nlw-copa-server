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

### ⌨ Linux
In Linux systems, you can use the use [PM2](https://pm2.keymetrics.io/) to run the app:

```bash
$ pm2 start build/src/server.js --watch --ignore-watch="prisma/dev.db" --name "nlw-copa-server"
```

We can also salve the PM2 process list and set it on system's startup:

```bash
$ pm2 save
$ pm2 starttup -u [USER_NAME]
```

In order to serve the application with Nginx, it can be configured like so (adjusting the paths, server name, etc.):

```
# NLW Copa Server
server {
    listen 80;
    server_name bolao-copa.mhsw.com.br;

    location / {
        proxy_pass http://localhost:3333;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        # Setting client's IP forwarding
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 📜 SSL/TLS

You can also add security with SSL/TLS layer used for HTTPS protocol. One option is to use the free *Let's Encrypt* certificates.

For this, you must [install the *Certbot*'s package](https://certbot.eff.org/instructions) and use its *plugin*, with the following commands (also, adjusting the srver name):

```bash
$ sudo apt install snapd # Installs snapd
$ sudo snap install core; sudo snap refresh core # Ensures snapd version is up to date
$ sudo snap install --classic certbot # Installs Certbot
$ sudo ln -s /snap/bin/certbot /usr/bin/certbot # Prepares the Certbot command
$ sudo certbot --nginx -d bolao-copa.mhsw.com.br
```

### Documentation:
* [fastify-env](https://github.com/fastify/fastify-env)

## 📄 License

This project is under the **MIT** license. For more information, access [LICENSE](./LICENSE).
