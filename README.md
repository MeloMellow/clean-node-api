# clean-node-api

> This project was made using software architecture concepts such as TDD, Clean and SOLID. The motivation was just for my own practice, enjoy.

This project is an example of an API that only authenticates a user.

## Usage

> Knowledge of NodeJs and MongoDb is required to perform the following steps

First you will need a MongoDb database with a model called **users** working, then you will need to set the environment variables. The environment variables must be set in an .env file at the project root or they can be changed in the /src/main/config/env.js directory.
~~~.env
MONGO_URL=your_mongodb_url
TOKEN_SECRET=any_secret_you_want
PORT=any_port_you_want
~~~

Now you will need to insert a users model record in your database with **email** and **password** fields.

Note that the email must be written correctly (with the provider and type) and the password must be generated from the hashSync function of the Bcrypt library with Round set to 10.

The following is an example of an email and already encrypted password that you can use if you want:
~~~npm
email : teste@teste.com
password : $2a$10$sdx89DESXg/jZp./1CeEU.M6lwq7VhbyBQpOnwf.Vjbz9j7QngMS.
~~~
The password is **test**

Now in the root directory of the application you must run the following command to download all the project's dependencies:
~~~npm
npm install
~~~

Now the project is ready to work.

To run the project, simply run the following command in the root directory::
~~~npm
npm run start
~~~


To perform all the unit and integration tests, just run the following command in the root directory:
~~~npm
npm run test:ci
~~~

You can check **package.json** for other possible commands.

## Applied concepts

* TDD
* Clean Architecture
* Design Patterns


