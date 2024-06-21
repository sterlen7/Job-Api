const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const { adminRouter } = require('./routes/adminRouter');
require('dotenv').config()

const multer = require('multer')
const upload=multer()

app.use(upload.array())



const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('Database connected'))
.catch((err)=>{console.log(err)})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', userRouter)
app.use('/api',adminRouter)

app.get('/', (req, res, next) => {
    res.json('Server is running');
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`); 
})