import mongoose from 'mongoose'
import colors from 'colors'

export const db = async () => {
  try {
    const mongoUri = process.env.MONGO_URI; // Obtener la URI de la base de datos de las variables de entorno
    const db = await mongoose.connect(mongoUri);
    const url = `${db.connection.host}:${db.connection.port}`

    console.log(colors.cyan(`MongoDB se conectó correctamente a: ${url}`))
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}
