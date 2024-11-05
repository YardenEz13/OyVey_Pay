const express = require('express');
const routes= require('./routes');
const connectDB = require('./lib/connect');



const app = express();
app.use(express.json());
app.use(routes);

console.log(process.env.DATABASE_URL)

app.listen(1312, () => {
    connectDB();
    console.log('Server is running on http://localhost:1312');
});