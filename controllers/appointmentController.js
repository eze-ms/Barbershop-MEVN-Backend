import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import Appointment from "../models/Appointment.js"
import { validateObjectId, handleNotFoundError, formatDate } from '../utils/index.js'
import { sendEmailNewAppointment, sendEmailUpdateAppointment, sendEmailCancelAppointment } from '../emails/appointmentEmailService.js'


//! Función para crear una nueva cita
const createAppointment = async (req, res) => {
  const appointment = req.body;
  appointment.user = req.user._id.toString(); // Asigna correctamente el ID del usuario autenticado
  
  if (appointment.date) {
    // Mantener la fecha tal como llega desde el cliente (sin conversión de zona horaria)
    // Asegurarse de que la fecha se almacene tal cual
    const date = new Date(appointment.date);  // Si la fecha está en formato ISO, simplemente la asignamos
    appointment.date = date; // Asignamos la fecha sin modificarla
  }

  try {
    const newAppointment = new Appointment(appointment) // Crea una nueva instancia de Appointment con los datos recibidos
    const result = await newAppointment.save();  // Guarda la cita en la base de datos

    await sendEmailNewAppointment({
      date: formatDate (result.date),
      time: result.time,
      email: req.user.email
    })

    // Envía una respuesta de éxito al cliente
    res.status(201).json({
      msg: '¡Cita creada correctamente!',
      newAppointment
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error al crear la cita',
      error: error.message
    });
  }
};

//! Función para obtener citas por fecha
const getAppointmentsByDate = async (req, res) => {
  const { date } = req.query
  
  const newDate = parse(date, 'dd/MM/yyyy', new Date())

  // Verificación de validez de fecha para evitar errores en la consulta
  if(!isValid(newDate)) {
    const error = new Error('Fecha no válida')
    return res.status(400).json({
      msg: error.message
    })
  }

  const isoDate = formatISO(newDate)

  try {
    // Filtra las citas solo en el día especificado
    const appointments = await Appointment.find({
      date: {
        $gte: startOfDay(new Date(isoDate)), // Inicio del día
        $lte: endOfDay(new Date(isoDate))     // Fin del día
      }
    }).select('time')  // Selecciona solo el campo "time" en los resultados
    res.json(appointments)
  
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error al obtener citas',
      error: error.message
    })
  }
}

//! Función para obtener una cita por ID
const getAppointmentsById = async (req, res) => {
  const { id } = req.params

  // Validar si el ID es válido 
  if(validateObjectId(id, res)) 
    return
  
  // Buscar la cita por ID
  const appointment = await Appointment.findById(id).populate('services')
  if (!appointment) {
    // Manejar el error si no se encuentra la cita
    return handleNotFoundError('La cita no existe', res)
  }

  // Si la persona que creó la cita es diferente al usuario autenticado
  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error('No tiene permiso ')
    return res.status(403).json({msg: error.message})
  }

  // Retornar la cita
  res.json(appointment)
}

//! Función para actualizar una cita
const updateAppointment = async (req, res) => {
  const { id } = req.params

  // Validar si el ID es válido 
  if(validateObjectId(id, res)) 
    return
  
  // Buscar la cita por ID
  const appointment = await Appointment.findById(id).populate('services')
  if (!appointment) {
    // Manejar el error si no se encuentra la cita
    return handleNotFoundError('La cita no existe', res)
  }

  // Si la persona que creó la cita es diferente al usuario autenticado
  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error('No tiene permiso ')
    return res.status(403).json({msg: error.message})
  }

  const { date, time, totalAmount, services } = req.body 
  
  appointment.date = date
  appointment.time = time
  appointment.totalAmount = totalAmount
  appointment.services = services

  try {
    const result = await appointment.save()
    await sendEmailUpdateAppointment({
      date: formatDate (result.date),
      time: result.time,
      email: req.user.email
    })
    res.json({
      msg: 'Cita actualizada correctamente',
      appointment: result  
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al actualizar la cita', error: error.message })
  }
}

//! Función para borrar una cita
const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  // Validar si el ID es válido
  if (validateObjectId(id, res)) return;

  // Buscar la cita por ID
  const appointment = await Appointment.findById(id).populate('services');
  if (!appointment) {
    // Manejar el error si no se encuentra la cita
    return handleNotFoundError('La cita no existe', res);
  }

  // Si la persona que creó la cita es diferente al usuario autenticado
  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error('No tiene permiso ');
    return res.status(403).json({ msg: error.message });
  }

  try {
    // Guarda los datos de la cita antes de eliminarla
    const { date, time } = appointment;

    // Elimina la cita
    await appointment.deleteOne();

    // Envía el correo utilizando los datos guardados
    await sendEmailCancelAppointment({
      date: formatDate(date), // Formatea la fecha
      time,                  // Usa el tiempo directamente
      email: req.user.email, // Email del usuario autenticado
    });

    res.json({
      msg: 'Cita borrada correctamente',
      appointment: { date, time },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Error al borrar la cita', error: error.message });
  }
};


export {
  createAppointment,
  getAppointmentsByDate,
  getAppointmentsById,
  updateAppointment,
  deleteAppointment
}
