const express = require('express');
const userRouter = require('./routes/user')
const connectDB = require('./lib/connect');


const app = express();
app.use(express.json());
app.use(userRouter);

console.log(process.env.DATABASE_URL)

app.listen(1312, () => {
    connectDB();
    console.log('Server is running on http://localhost:1312');
});