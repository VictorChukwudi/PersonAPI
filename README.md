# Person API

## Table of Contents

- [General Info](#general-info)
- [Modules and Dependencies](#modules)
- [Setup](#setup)
- [Usage](#usage)

## General Info

A simple API built with fastify, that perform basic CRUD functionalities.

- C - Creates a new person.
- R - Reads a person from the database.
- U - Updates a person's record in the database.
- D - Deletes a person's record from the database.

The above functionalities performed using MongoDB Atlas database.

## Modules and Dependencies

The node modules used for this API are

- Fastify
- Joi
- Mongoose
  with their versions shown in the package.json file.

## Setup

To run this project (i.e. locally), mongodb should be available on your machine or use mongodb Atlas

- Clone the repo:

```
$ git clone https://github.com/VictorChukwudi/hng_stage_two.git
```

- Open the folder and run the command to install the dependencies:

```
$ npm install
```

- Create a .env file in the root and add code below to the file

```
dbURI= <mongodb_connection_string>
```

- Next, run the command below to start the server

```
$ npm run dev
```

## Usage

The Person API has the routes(endpoints) available for the api usage:

- **POST** /api : to add or create a new person.
- **GET** /api/user_id : to fetch an existing person details using the user_id.
- **PUT** /api/user_id : to update an existing person details using the user_id.
- **DELETE** /api/user_id : to delete an existing person details using the user_id.

### Deployed

To use the deployed version of the API, the base URL is https://personapi-xc6z.onrender.com (with the routes attached for any of the CRUD operations)
