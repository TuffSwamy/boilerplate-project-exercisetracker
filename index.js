const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid'); // Corrected import
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb'); // Import ObjectId

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

let userSchema = new mongoose.Schema({
  username: String,
  _id: mongoose.Schema.Types.ObjectId
});

let User = mongoose.model('User', userSchema);

app.post('/api/users', (req, res) => {
  let newUser = new User(
    { 
      username: req.body.username,
       _id: new ObjectId() 
    });
    console.log(req.body.username);
    newUser.save((err, data) => {
      if (err) return console.error(err);
    res.json({ username: newUser.username, _id: newUser._id });
  });

app.get('/api/users', (req, res) => {
    User.find({}, (err, data) => {
      if (err) return console.error(err);
      res.data = data;
      res.json(data);
    });
  }); 

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});