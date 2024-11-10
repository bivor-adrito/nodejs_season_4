BongoDev - Backend

Bivor Faruque Adrito

Js Basics
React
Frontend 

Development 
    1. Frontend
    2. Backend 
    3. Full Stack 
Operations
    1. Deployment - DevOps

NodeJS => ExpressJS => Database => API

Database =>
1. SQL => Postgres
2. NoSQL => MongoDB 

Overview
1. Introduction
    - NodeJS setup [DONE]
    - VS Code [DONE]
    - How to open folder in VS Code [DONE]

2. Create my first node js app
    - npm [DONE]
    - express [DONE]
    - How to run a node app [DONE]
3. Create our first API 
    - Learn POSTMAN [DONE]
4. CRUD Operation
    - Create - POST
    - Read - GET
    - Update - PUT // PATCH
    - Delete - DELETE
5. CRUD without DB
    - Create - POST [DONE]
    - Read - GET [DONE]
    - Update - PUT [DONE]
    - Delete - DELETE [DONE]
6. MongoDB
    - connection with DB [DONE]
7. CRUD using MongoDB
    - Create [DONE]
    - Get [DONE]
        - ALL [DONE]
        - One [DONE]
    - Update [DONE]
    - Delete [DONE]

8. Authentication
    - Create user using Password and email [Done]
    - Login with email [DONE]
    - Create a middleware for authentication [DONE]
    - Login with refresh token [Done]

9. Single vendor market place
    Features
    1. There will be two types of users []
        a. Admin
        b. Customer

    - Admins will be able to do the followings
        1. Admin will be able to create a product []
        2. Admin will be able to upload an image on the product []
        3. Admin will be able to update a product []
        4. Admin will be able to see all the products []
        5. Admin will be able to see a specific product []
        6. Admin will be able to delete [amend] a product []
        7. Admin will be able to see a specific order []
        8. Admin will be able to make change to an order []
        9. Admin will be able to update status of a order []
        10. Admin will be able to delete an order []


    - Customers will be able to do the followings
        1. Customers will be able to see all the products []
        2. Customers will be able to see the details of a product []
        3. Customers will be able to make an order []
        4. Customers will be able to see a specific order []          
        5. Customers will be able to cancel an order []

    - Customers will NOT be able to do the followings
        1. Customers will not be able to create a product []
        2. Customers will not be able to upload an image on the product []
        3. Customers will not be able to update a product []
        4. Customers will not be able to delete a product []

Database Structure
 - User {
    ...user
    userType: [customer, admin]
 }
 - Product {
    name: string,
    description: string,
    madeIn: string,
    price: number,
    userId: objectId,
    category: string,
    fileId: objectId,
    pQty: number
 }
 - File {
    name: string,
    path: string,
 }
 - Order{
    productId: ObjectId,
    userId: ObjectId,
    qty: number,
    total: number,
    purchaseDate: Date,
    deliveryLocation: string,
    expectedDeliveryDate: Date,
    deliveryStatus: [delivered, in-progress, canceled],
 }

Home Project:
 - To-Do app:
    - using auth flow
    1. Will be able to create task
    2. Will be able to view my own task details [use auth middleware]
    3. Will be able to update task
    4. Will be able to update task status
    5. Will be able to delete a task
Commands
    - node -v
    - npm -v
    - code .
    - npm init
    - npm init -y
    - npm i express --save
    - npm run start
    - npm i nodemon --save-dev
    - npm i body-parser --save
    - npm i mongoose --save
    - npm i dotenv --save
    - npm i bcrypt --save
    - npm i jsonwebtoken --save

Rules: 
    - Communication - Discord
    - Sun, Mon - 9pm

