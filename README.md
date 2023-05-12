# Readme

▻ Clone code and install dependencies.

```
$ git clone git@github.com:ZEA-repository/contacts.git
```

```
$ cd contacts/backend/docker && sudo -S docker-compose up -d
```

```
$ cd contacts/backend && npm install
```

▻ Create a file called `.env.local` in the root of project:

```
MONGO_URL="mongodb://root:pass12345@localhost:27017"
JWT_ACCESS_SECRET="jwt-access-secret-key"
JWT_REFRESH_SECRET="jwt-refresh-secret-key"
SMPT_HOST=smtp.gmail.com
SMPT_PORT=587
SMPT_USER=example@gmail.com
SMPT_PASSWORD=password
API_URL=http://localhost:4001
CLIENT_URL=http://localhost:5173
PORT=4001
NODE_ENV=development
```

▻ Signing in to Google:

```
1. Settings -> Forwarding and POP/IMAP -> Status: IMAP is enabled -> Enable IMAP
2. Account -> Security -> 2-Step Verification -> Enable
```

▻ [Create and use app password for email authentication through SMTP.](https://myaccount.google.com/apppasswords)

```
SMPT_USER="example@gmail.com"
SMPT_PASSWORD="use_app_password"

```

▻ Run backend.

```sh
$ npm run dev
```

$ cd contacts/frontend && npm install

▻ Run frontend.

```sh
$ npm run dev
```
