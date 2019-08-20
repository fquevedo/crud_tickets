#Crud Tickets 

Its Rest API server side and React Client side, deploy for Saltala HC Partners. 
Technologies: Laravel Rest API Server and React JavaScript Client

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
* nodejs + npm [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* XAMP (or another package that supports MySQL DB) [https://www.apachefriends.org/es/index.html](https://www.apachefriends.org/es/index.html)

#### Optional for test:
* Postman [https://www.getpostman.com/](https://www.getpostman.com/)

### Installation

#### Install via git clone
```
$ 1. git clone https://github.com/fquevedo/crud_tickets
$ 2. cd crud_tickets
$ 3. composer install
$ 4. cd client && npm install
```
Dont forget to import database.sql( in the root of the repository )

#### Deploy
to deploy Server use this command:
```
5. $ php artisan serve
```
in another cmd deploy Client using this command:
```
6. cd cliente && npm start
```

## Running the tests
[http://localhost:3000](https://localhost:3000)


## Built With
* [Node.js](https://nodejs.org/es/) - JavaScript runtime built 
* [React](https://es.reactjs.org) - JavaScript library
* [Postman](https://www.getpostman.com/) - For test Api requests

## Authors
