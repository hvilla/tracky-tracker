# Tracky Tracker

A project for an interview that consists in an app running on nodejs + express (with MongoDB) as DB
of an app that contabilize the time spent doing some tasks

## Requirements

Docker (Optional)
Node 12
Yarn
Mongo DB (Latest)

## How to use

### Running With Docker (Best)

For running with docker go to project folder and verify docker-compose.yml the run on terminal,

```
$ docker-compose up --build
```

Then create a .env and copy this

```
APP_PORT=9000
DB_HOST=localhost
DB_NAME=TTDB
DB_USER=superadmin 
DB_PASSWORD=qwerty123 
DB_PORT=27017
PASSWORD_SALT_FACTOR=10
```

Then run the app using yarn (It will run in dev mode)

```
$ yarn dev
```

### Running with installed DB

If you have MongoDB installed just change

```
APP_PORT=<port of app>
DB_HOST=<db-dir>
DB_NAME=<db-name>
DB_USER=<db-user> 
DB_PASSWORD=<db-password> 
DB_PORT=<db-port listener>
PASSWORD_SALT_FACTOR=10
```

**Note:** Default PASSWORD_SALT_FACTOR por bcryptjs generator is 10.

## Tests

### Tests with Mocha And Chai
If you need to run default tests you can use the command

```
$ yarn dev
```

**Note**: It will run default tests.

### Tests with Postman

If you need to run default tests with postman, in the folder postman you can import all the requests used.


**Note**: For downloads https://www.getpostman.com/downloads/, for linux you can use snap for install it.

## Author

* **Hector Villa Pizarro** - [HVP](https://github.com/hvilla)

## Acknowledgments

* This was made for an interview.

## License

MIT
