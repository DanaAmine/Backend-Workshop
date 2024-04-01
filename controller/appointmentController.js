const Appointment = require('../model/appointment');

exports.greeting = (req, res)=>{
    res.send("Hello World");
}

exports.createAppointment = async (req,res)=>{ 
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
}

exports.getAllAppointments = async (req,res)=>{
    const appointment = await Appointment.findById(req.params.id);
    res.json(appointment);
}

exports.updateAppointment = async (req, res) => {
    try {
      const { name, age, email, date } = req.body;
      const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, { name, age, email, date }, { new: true });
      if (!updatedAppointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

exports.deleteAppointment = async (req, res) => {
    try {
      const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
      if (!deletedAppointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json({ message: 'Appointment deleted successfully', appointment: deletedAppointment });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }