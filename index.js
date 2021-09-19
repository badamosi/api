const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose');

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/category')
const app = express()

dotenv.config();
app.use(express.json())

mongoose.connect(process.env.MongoURL

    , {
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true
    }).then(console.log("MongoDb Connected!")).catch((err) => { console.log(err) });

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)

const port = process.env.PORT

app.listen(port || 7000, () => {
    console.log(`Server started on ${port}`);
});