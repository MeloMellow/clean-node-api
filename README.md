# clean-node-api

> This project was made using software architecture concepts such as TDD, Clean and SOLID. The motivation was just for my own practice, enjoy.

This project is an example of an API that only authenticates a user.

## Usage
First you will need a MongoDb database with a model called 'users' working, then you will need to set the environment variables. The environment variables must be set in an .env file at the project root or they can be changed in the /src/main/config/env.js directory
~~~.env
MONGO_URL=your_mongodb_url
TOKEN_SECRET=any_secret_you_want
PORT=any_port_you_want
~~~
Now you will need to insert a users model record in your database with 'email' and 'password' fields.
Note that the email must be written correctly (with the provider and type) and the password must be generated from the hashSync function of the Bcrypt library with Round set to 10.
~~~npm
npm install
~~~

* TDD
* Clean Architecture
* Design Patterns


