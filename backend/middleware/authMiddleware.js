import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authMiddleware = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      req.user = await User.findById(decoded.id).select("-password -verified -token -__v")

      next() // Permitir que la solicitud continúe
    } catch (error) {
      res.status(403).json({ msg: error.message || 'Token no válido' })
    }
  } else {
    const error = new Error('Token no válido o inexistente')
    res.status(403).json({ msg: error.message })
  }
}

export default authMiddleware
