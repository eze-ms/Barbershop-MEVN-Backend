import User from '../models/User.js'
import { sendEmailVerification, sendEmailPasswordReset } from '../emails/authEmailService.js'
import { generateJWT, uniqueId } from '../utils/index.js'

//! Función para registrar un nuevo usuario
const register = async (req, res) => {
  // Valida todos los campos
  if (Object.values(req.body).includes('')) {
    const error = new Error('Todos los campos son obligatorios')
    return res.status(400).json({ msg: error.message })
  }

  const { email, password, name } = req.body

  // Evitar registros duplicados
  const userExists = await User.findOne({ email })
  if (userExists) {
    const error = new Error('Usuario ya registrado')
    return res.status(400).json({ msg: error.message })
  }
  
  // Validar la extensión de la contraseña
  const MIN_PASSWORD_LENGTH = 4
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(`La contraseña tiene que tener ${MIN_PASSWORD_LENGTH} caracteres`)
    return res.status(400).json({ msg: error.message })
  }

  try {
    const user = new User(req.body)
    const result = await user.save()

    const { name, email, token } = result // Desestructura el resultado
    await sendEmailVerification(name, email, token) // Envía el correo de verificación

    res.json({ msg: 'El usuario se ha creado correctamente, revisa tu email' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al crear el usuario' })
  }
}

//! Función para verificar la cuenta del usuario
const verifyAccount = async (req, res) => {
  const { token } = req.params

  // Busca el usuario por token
  const user = await User.findOne({ token })
  if (!user) {
    const error = new Error('Hubo un error, el token no es válido')
    return res.status(401).json({ msg: error.message })
  }

  // Si el token es válido, confirmar cuenta
  try {
    user.verified = true // Marca el usuario como verificado
    user.token = '' // Limpia el token
    await user.save() // Guarda los cambios

    res.json({ msg: 'Usuario confirmado correctamente' }) // Respuesta exitosa
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error al confirmar el usuario' }) // Respuesta en caso de error
  }
}

//! Función para login de usuarios
const login = async (req, res) => {
  const { email, password } = req.body; // Extrae email y password del cuerpo de la solicitud
  const user = await User.findOne({ email }) // Busca el usuario por email

  // Revisar que el usuario existe
  if (!user) {
    const error = new Error('El usuario no existe')
    return res.status(401).json({ msg: error.message }) // Respuesta si el usuario no existe
  }
  
  // Revisar si el usuario confirmó su cuenta
  if (!user.verified) {
    const error = new Error('Tu cuenta no ha sido confirmada')
    return res.status(401).json({ msg: error.message }) // Respuesta si la cuenta no está confirmada
  }
  
  // Comprobar la contraseña
  if (await user.checkPassword(password)) {
    const token = generateJWT(user._id); // Genera el token
    res.json({
      token, // Incluye el token
      user: { // Incluye los datos básicos del usuario
        _id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
    });
  } else {
    const error = new Error('La contraseña es incorrecta');
    return res.status(401).json({ msg: error.message }); // Respuesta si la contraseña es incorrecta
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body

  if (!email) {
    const error = new Error("El correo es obligatorio")
    return res.status(400).json({ msg: error.message })
  }

  // Comprobar si existe el usuario
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error('El usuario no existe')
    return res.status(404).json({ msg: error.message })
  }

  try {
    user.token = uniqueId()
    const result = await user.save()

    
    await sendEmailPasswordReset(result.name, result.email, result.token)

    res.json({
      msg: 'Hemos enviado un email con las instrucciones'
    })
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error al confirmar el usuario' }) // Respuesta en caso de error
  }
}

const verifyPasswordResetToken = async (req, res) => {
  const { token } = req.params

  try {
    const isValidToken = await User.findOne({ token })

    if (!isValidToken) {
      const error = new Error('Hubo un error. Token no válido')
      return res.status(400).json({ msg: error.message }) 
    }

    res.json({ msg: 'Token válido' })
  } catch (error) {
      console.error(error); 
      res.status(500).json({ msg: 'Error del servidor' })
  }
}

const updatePassword = async (req, res) => {
  const { token } = req.params

  // Buscar usuario por token
  const user = await User.findOne({ token })
  if (!user) {
    const error = new Error('Hubo un error. Token no válido')
    return res.status(400).json({ msg: error.message })
  }

  const { password } = req.body

  if (!password || password.trim().length < 4) { // Antes era 8
    const error = new Error('El password debe tener al menos 4 caracteres');
    return res.status(400).json({ msg: error.message });
  }
  

  try {
    // Actualizar token y password
    user.token = ''
    user.password = password
    await user.save()

    res.json({
      msg: 'El password ha sido modificado correctamente',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Error del servidor' })
  }
}


const user = async (req, res) => {
  const { user } = req
  res.json(
    user
  )
}

const admin = async (req, res) => {
  const { user } = req
  
  if(!user.admin) {
    const error = new Error('Acción no válida')
    return res.status(403).json({msg: error.message})
  }

  res.json(
    user
  )
}

export {
  register,
  verifyAccount,
  login,
  forgotPassword,
  verifyPasswordResetToken,
  updatePassword,
  user,
  admin
}
