const express = require('express');
const fs = require('fs');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 8080

app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const clock=()=>{
let date = new Date();
let options = {timeZone: 'Asia/Jakarta', timeZoneName: 'short'};
return(jakartaTime = date.toLocaleString('en-US', options))
}

app.use(cors({
  origin: 'https://todolist-app-client.vercel.app/' // Replace this with your frontend's domain
}));

let activities = [
    {
        id : 1,
        todo: "Buat Sarapan",
        time: clock(),
        status: true
    },
    {
        id : 2,
      todo: "Buat Tugas",
      time: clock(),
      status: true
    },
    {
        id : 3,
        todo: "Buat Apa Aja",
        time: clock(),
        status: true
    },
]
app.get('/api',(req,res)=>{
    res.json(activities);
})

app.delete('/api',(req,res)=>{
  const {id} = req.body
  const searchData = activities.find(c => c.id === id)
  if (searchData) {
    activities.pop(searchData);
  }
  res.send("nice")
})

app.post('/api',(req,res)=>{
  const {todo,status} = req.body;
  const newData = {
    id: activities.length + 1,
    todo: todo,
    time: clock(),
    status: status
  }
  console.log(newData)
  activities.push(newData);
  res.send("success")
})

app.patch('/api', (req,res)=>{
  const newData = req.body;
  const searchData = activities.find(c => c.id === newData.id);

  if (!searchData) {
    return res.status(404).json({ error: 'Data not found' });
  }

  if (!req.body) {
    return res.status(400).json({ error: 'Missing request body' });
  }
  
  searchData.status = newData.status;

  // Your other logic here

  res.json({ message: 'Data updated successfully' });
  console.log(newData)
})

app.get('/api/edit',(req,res)=>{
  res.json(activities);
})
app.patch('/api/edit',(req, res) => {
  const newData = req.body
  const searchData = activities.find(c => c.id === newData.id);
  if (searchData) {
    searchData.id = newData.id;
    searchData.status = newData.status;
    searchData.time = clock();
    searchData.todo = newData.todo;
    res.send("success")
  }
  if (!req.body) {
    return res.status(400).json({ error: 'Missing request body' });
  }
})
app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})
