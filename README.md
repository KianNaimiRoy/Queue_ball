# QueueBall

QueueBall is a modern way of reserving your spot at a pool table in your favourite bar. As a single-page app built with Node.js, Express.js, React, and socket.io, users can scan a QR code, choose their desired table to play at, and then add themselves to the queue. The number of players at each table updates in real time, so you'll never lose track of your place in line. We like to think that this is an efficient alternative to hunting for pocket change just so you can line up for that next exciting match.  


# Final Product
!["When a user scans the QR code, they will be redirected to homepage."](https://raw.githubusercontent.com/KianNaimiRoy/Queue_ball/23cdfba922eb562b2a4bae31dd36181afdcb85c5/docs/Screenshot%202023-05-24%20at%205.43.58%20PM.png)
!["Once a user has enter their name, they will be able to browse the tables and join the queue."](https://raw.githubusercontent.com/KianNaimiRoy/Queue_ball/23cdfba922eb562b2a4bae31dd36181afdcb85c5/docs/Screenshot%202023-05-24%20at%205.47.43%20PM.png)
!["A user can join any table that is marked available"](https://raw.githubusercontent.com/KianNaimiRoy/Queue_ball/23cdfba922eb562b2a4bae31dd36181afdcb85c5/docs/Screenshot%202023-05-24%20at%205.47.11%20PM.png)
!["Screenshot Description"](#)


## Setup
1. Fork and clone the App from github: https://github.com/KianNaimiRoy/Queue_ball
2. The project is a mono repo with two directories within it that separates the backend and frontend. Cd into the backend directory from the root directory and run `npm install` to install dependencies. Go back to the root directory of the project and cd into the frontend directory, and then also run `npm install` to install dependencies. 
3. Create a .env file based on .env.example.
4. To start the app, open two separate terminal windows for the backend and front end. Run `npm start` for both the backend and frontend to start. Go to [http://localhost:3000](http://localhost:3000) to view the app in your browser.
5. To reset the database, run `npm run db:reset` from the 'backend' directory. Be sure to clear the local storage in your browser so that you don't encounter any funny queueing behaviour. 
6. Enjoy the app!


## Dependencies
- Express
- Dotenv
- PostgreSQL
- Nodemon
- Morgan
- Cors
- Socket.io, server side
- Socket.io-client, client side
- Axios
- Classnames
- Body-parser

