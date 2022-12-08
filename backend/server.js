const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Chicken = require('./models/chicken.js');

const app = express();

app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// });


//create
app.post('/fastfood', (req, res) => {
    Chicken.create(req.body, (err, createChicken) => {
        res.json(createChicken)
    })
});

//get
app.get('/fastfood', (req, res) => {
    Chicken.find({}, (err, foundChicken) => {
        res.json(foundChicken)
    })
});


//delete
app.delete('/fastfood/:id', (req, res) => {
    Chicken.findByIdAndRemove(req.params.id, (err, deletedChicken) => {
        res.json(deletedChicken)
    })
});

//update
app.put('/fastfood/:id', (req, res) => {
    Chicken.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedChicken) => {
        res.json(updatedChicken)
    })
});

mongoose.connect('mongodb://localhost:27017/fastfood')
mongoose.connection.once('open', () => {
    console.log('mongod...')
});

app.listen(3000, () => {
    console.log('listening...')
});