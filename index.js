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
    console.log(newUser);
    newUser.save(); 
    res.json({ username: newUser.username, _id: newUser._id });
  });

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});