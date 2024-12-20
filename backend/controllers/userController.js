import Appointment from "../models/Appointment.js"

const getUserAppointments = async (req, res) => {
  const { user } = req.params // Obtiene el ID del usuario de los parámetros de la URL 

  if (user != req.user._id.toString()) {
    const error = new Error('Acceso Denegado ')
    return res.status(403).json({msg: error.message})
  }
  
  try {
    const query = req.user.admin ? { date: { $gte: new Date() } } : { user, date: { $gte: new Date() } } 
    const appointments = await Appointment
                                .find(query)
                                .populate('services')
                                .populate({path: 'user', select: 'name email' })
                                .sort({date: 'asc'}) 

    res.json(appointments) 
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al obtener citas' }) 
  }
}

export {
  getUserAppointments
}
