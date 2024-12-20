import { createTransport } from "nodemailer"

export async function sendEmailVerification(name, email, token) {
  // Crear el transportador
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  // Enviar el email
  const info = await transporter.sendMail({
    from: '"Barbershop" <no-reply@barbershop.com>',
    to: email, 
    subject: 'Barbershop - Confirma tu cuenta', 
    text: "Barbershop - Confirma tu cuenta", 
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333;">
          <h1 style="text-align: center; color: #123e65;">¡Bienvenido a Barbershop!</h1>
          <p>Hola, ${name}</p>
          <p>Estamos emocionados de tenerte en nuestra comunidad. Solo falta un pequeño paso para completar tu registro. Por favor, confirma tu cuenta haciendo clic en el siguiente botón:</p>
          
          <p style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}" style="background-color: #123e65; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: block; font-family: Arial, Helvetica, sans-serif;">Confirmar tu cuenta</a>
          </p>

          <p style="word-break: break-all;">
            Si tienes problemas para acceder al enlace, copia y pega la siguiente URL en tu navegador:
          </p>
          <p style="word-break: break-all;">
            http://localhost:4000/api/auth/verify/${token}
          </p>

          <p>Si no has solicitado este correo, simplemente ignóralo.</p>
          <p>¡Esperamos verte pronto en Barbershop!</p>
      </div>
    `
  })
}

export async function sendEmailPasswordReset(name, email, token) {
  // Crear el transportador
  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  // Enviar el email
  const info = await transporter.sendMail({
    from: '"Barbershop" <no-reply@barbershop.com>',
    to: email, 
    subject: 'Barbershop - Restablece tu password', 
    text: "Barbershop - Restablece tu password", 
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333;">
          <h1 style="text-align: center; color: #123e65;">¡Bienvenido a Barbershop!</h1>
          <p>Hola, ${name}</p>
          <p>Has solicitado restablecer tu password. Por favor, sigue el enlace haciendo clic en el siguiente botón para genererar un nuevo password:</p>
          
          <p style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}" style="background-color: #123e65; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: block; font-family: Arial, Helvetica, sans-serif;">Restablecer Password</a>
          </p>

          <p>Si no has solicitado este correo, simplemente ignóralo.</p>
          <p>¡Esperamos verte pronto en Barbershop!</p>
      </div>
    `
  })
}



