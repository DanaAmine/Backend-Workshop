const express = require('express');
const mongoose = require('mongoose');
const appointmentController = require('./controller/appointmentController');


const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/vaccinationApp')
.then(()=>{
    console.log('Connected to MongoDB');
}).catch(err=>console.log(err));



app.use(express.json());

app.get("/", appointmentController.greeting)
app.post('/appointments', appointmentController.createAppointment )
app.get('/appointments/:id', appointmentController.getAllAppointments)
app.put('/appointments/:id', appointmentController.updateAppointment);
app.delete('/appointments/:id', appointmentController.deleteAppointment);
  


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})