import Services from '../models/Services.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

//! Crear un nuevo servicio
const createServices = async(req, res) => {
  // Verificar campos vacíos
  if(Object.values(req.body).includes('')) {
    const error = new Error('Todos los campos son obligatorios')
    
    return res.status(400).json({
      msg: error.message
    })
  }

  try {
    // Guardar el nuevo servicio
    const services = new Services(req.body) // Crear nuevo servicio con datos del usuario
    await services.save() // Guardar en la base de datos

    res.json({
      msg: 'El servicio se creó correctamente'
    })
  } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Error al crear el servicio' }) // Manejar cualquier error de Mongoose
  }
}

//! Obtener todos los servicios
const getServices = async (req, res) => {
  try {
    const services = await Services.find()
    res.json(services)
  } catch (error) {
      console.log(error);
  }
}

//! Obtener un servicio por su ID en la base de datos
const getServicesById = async (req, res) => {
  const { id } = req.params // Obtener ID de la URL solicitada

  // Validar un object id
  if (validateObjectId(id, res)) return  // Si el ID no es válido, se detiene la ejecución

  try {
    // Validar si el servicio existe
    const service = await Services.findById(id) // Buscar el servicio en la base de datos

    if(!service) {
      return handleNotFoundError('El servicio no existe', res)
    }
    res.json(service) // Devolver el servicio encontrado
  } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Error al obtener el servicio' }) // Manejar errores de la consulta
  }  
}

//! Actualizar un servicio existente
const updateService = async (req, res) => {
  const { id } = req.params // Obtener el ID de los parámetros de la URL

  // Validar un object id
  if (validateObjectId(id, res)) return  // Si el ID no es válido, se detiene la ejecución

  // Validar si el servicio existe
  const service = await Services.findById(id) // Buscar el servicio en la base de datos

  if(!service) {
    return handleNotFoundError('El servicio no existe', res)
  }

  // Actualizar los campos con los valores nuevos si existen
  service.name = req.body.name || service.name
  service.description = req.body.description || service.description
  service.price = req.body.price || service.price

  try {
    await service.save(); // Guardar los cambios en la base de datos
    res.json({ msg: 'El servicio se actualizó correctamente' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al actualizar el servicio' }) // Manejar errores de la actualización
  }
}

//! Borrar el servicio
const deleteService = async (req, res) => {
  const { id } = req.params // Obtener el ID de los parámetros de la URL

  // Validar un object id
  if (validateObjectId(id, res)) return  // Si el ID no es válido, se detiene la ejecución

  // Validar si el servicio existe
  const service = await Services.findById(id) // Buscar el servicio en la base de datos

  if(!service) {
    return handleNotFoundError('El servicio no existe', res)
  }

  try {
    await service.deleteOne()
    res.json({
      msg: 'El servicio se eliminó correctamente'
    })
  } catch (error) {
      console.log(error)
      res.status(500).json({ msg: 'Error al actualizar el servicio' }) // Manejar errores de la actualización
  }
}

export {
  createServices,
  getServices,
  getServicesById,
  updateService,
  deleteService
}
