const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const uid = require('uuid'); 

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
let users = [];

app.post('api/users', (req, res) => {
  let user = users.push(req.body.username);
  let id = uuidv4();
  res.json({
    username: req.body.username,
    id: id)
  });
});

const listener = app.listen(process.env.PORT || 3000, () => 
{
  console.log('Your app is listening on port ' + listener.address().port)
})