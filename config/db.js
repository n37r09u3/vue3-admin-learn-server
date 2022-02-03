
const config = require('./index')
const mongoose = require('mongoose');
mongoose.connect(config.URL);

const db = mongoose.connection;

db.on('error', ()=>{
    console.error('connection error')
})
db.on('open', ()=>{
    console.info('connection success')
})
