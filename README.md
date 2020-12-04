### dev_jobs_usa
Job search for Web Developers in the US by state and city.
Hopes are to make an informed decision of what ever city you might be moving to.

Express authentication template using Cheerio + Passport + flash messages + custom middleware

## What it includes

* Sequelize user model / migration
* Settings for PostgreSQL
* Passport and passport-local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* EJS Templating and EJS Layouts

## What it includes

* Sequelize user model / migration
* Settings for PostgreSQL
* Passport and passport-local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt
* EJS Templating and EJS Layouts

### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| name | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |



## Steps To Use
#### 1. Fork and Clone repo 'dev_jobs_usa'
* Go to `https://github.com/canourrea23/dev_jobs_usa` and fork this repository or go to `https://jobs-for-developers.herokuapp.com/` to check it out. 
* Clone your new repo to your local machine.

#### 2. You will need to add all the dependencies
```
npm i   
```
#### 3. Create a new database for the new project
Using the sequelize command line interface, you can create a new database from the terminal.

```
createdb <new_db_name>
```

#### 4. Run the migrations

```
sequelize db:migrate
```
#### 5. Add a `.env` file with the following fields:

* SESSION_SECRET: Can be any random string; usually a hash in production
* PORT: Usually 3000 or 8000

#### 6. Run server; make sure it works

```
nodemon
```

