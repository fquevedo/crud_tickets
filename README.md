#Crud Tickets 

Its a REST API Server side and React Client side, developed for Saltala HC Partners. 

Technologies: Laravel Rest API Server and React JavaScript Client

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
* Composer [https://getcomposer.org/](https://getcomposer.org/)
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
### Database Configuration
First import database.sql (located in root) from MySQL and call "gestion_tickets" to this new database
Set database name, user and password on database.php configuration laravel file:
```
        'mysql' => [
            'driver' => 'mysql',
            'url' => env('DATABASE_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'gestion_tickets'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ]
```
#### Deploy
to deploy Server use this command:
```
$ 5. $ cd.. && php artisan serve
```
in the same root open another cmd and deploy Client using this command:
```
$ 6. cd client && npm start
```

## Running the tests
[http://localhost:3000](https://localhost:3000)


## Built With
* [Node.js](https://nodejs.org/es/) - JavaScript runtime built 
* [React](https://es.reactjs.org) - JavaScript library
* [Postman](https://www.getpostman.com/) - For test Api requests

## Authors
* **Fernando Quevedo** - *Initial work* - [fquevedo](https://github.com/fquevedo)
