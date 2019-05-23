# Customer-CRUD
Single Page Customer Application that performs CRUD operations on customer data.

## Before Start
- Commands that listed below runs server and client applications in development mode.
- customer-server application runs on port 3001 and customer-client application runs on port 3000.
- MongoDB is used as data source.

## Pre-Requisites
>To configure MongoDB connection URL, simply rename file .env.example to .env in customer-server folder
>Then edit MONGODB_URI and enter your _username_, _password_, _host_, _port_, _database_ info.
>Default connection url: **_mongodb://127.0.0.1:27017/Customer_**
## Installation

- `git clone https://github.com/harunozceyhan/customer-crud.git`
- `npm run install`
- `npm run fullinstall`
- `npm run start`

## App URL

- [http://localhost:3000/customers](http://localhost:3000/customers)

## Technologies Used
- Client Side
    - React.js
    - react-router
    - react-redux
    - redux-thunk
    - react-bootstrap
    - axios
- Server Side
    - Node.js
    - express
    - mongoose