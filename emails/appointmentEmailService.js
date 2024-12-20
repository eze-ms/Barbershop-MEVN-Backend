import { createTransport } from "nodemailer"

export async function sendEmailNewAppointment({date, time, email}) {

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
    subject: 'Barbershop - Nueva Cita', 
    text: "Barbershop - Nueva Cita", 
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
          <h1 style="text-align: center; color: #123e65;">¡Nueva Cita Programada!</h1>
          <p style="font-size: 16px; color: #555;">
              Hola, <strong>Admin</strong>:
          </p>
          <p style="font-size: 16px; color: #555;">
              ¡Tienes una nueva cita programada en <strong>Barbershop</strong>! Aquí tienes los detalles:
          </p>
          <ul style="list-style: none; padding: 0; font-size: 16px;">
              <li><strong>📅 Fecha:</strong> ${date}</li>
              <li><strong>⏰ Hora:</strong> ${time} horas</li>
          </ul>
          <p style="font-size: 16px; color: #555;">
              Asegúrate de revisar tu agenda para preparar todo lo necesario.
          </p>
          <p style="text-align: center; margin-top: 20px;">
              <a href="https://barbershop.com/admin" style="text-decoration: none; color: #fff; background-color: #123e65; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Revisar Citas</a>
          </p>
          <p style="font-size: 14px; color: #999; margin-top: 20px; text-align: center;">
              Este es un mensaje automatizado de Barbershop. Por favor, no respondas directamente a este correo.
          </p>
      </div>
    `

  });

}

export async function sendEmailUpdateAppointment({date, time, email}) {

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
    subject: 'Barbershop - Cita Actualizada', 
    text: "Barbershop - Cita Actualizada", 
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
          <h1 style="text-align: center; color: #123e65;">¡Cita modificada!</h1>
          <p style="font-size: 16px; color: #555;">
              Hola, <strong>Admin</strong>:
          </p>
          <p style="font-size: 16px; color: #555;">
              ¡Uno usuario a modificado su cita en <strong>Barbershop</strong>! Aquí tienes los detalles:
          </p>
          <ul style="list-style: none; padding: 0; font-size: 16px;">
              <li><strong>📅 Fecha:</strong> ${date}</li>
              <li><strong>⏰ Hora:</strong> ${time} horas</li>
          </ul>
          <p style="font-size: 16px; color: #555;">
              Asegúrate de revisar tu agenda para preparar todo lo necesario.
          </p>
          <p style="text-align: center; margin-top: 20px;">
              <a href="https://barbershop.com/admin" style="text-decoration: none; color: #fff; background-color: #123e65; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Revisar Citas</a>
          </p>
          <p style="font-size: 14px; color: #999; margin-top: 20px; text-align: center;">
              Este es un mensaje automatizado de Barbershop. Por favor, no respondas directamente a este correo.
          </p>
      </div>
    `

  })
}

export async function sendEmailCancelAppointment({date, time, email}) {

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
    subject: 'Barbershop - Cita Cancelada', 
    text: "Barbershop - Cita Cancelada", 
    html: `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
          <h1 style="text-align: center; color: #123e65;">¡Cita cancelada!</h1>
          <p style="font-size: 16px; color: #555;">
              Hola, <strong>Admin</strong>:
          </p>
          <p style="font-size: 16px; color: #555;">
              ¡Uno usuario a cancelado su cita en <strong>Barbershop</strong>! La cita estaba programada para:
          </p>
          <ul style="list-style: none; padding: 0; font-size: 16px;">
              <li><strong>📅 Fecha:</strong> ${date}</li>
              <li><strong>⏰ Hora:</strong> ${time} horas</li>
          </ul>
          <p style="font-size: 16px; color: #555;">
              Asegúrate de revisar tu agenda para cancelar la cita.
          </p>
          <p style="text-align: center; margin-top: 20px;">
              <a href="https://barbershop.com/admin" style="text-decoration: none; color: #fff; background-color: #123e65; padding: 10px 20px; border-radius: 5px; font-size: 16px;">Revisar Citas</a>
          </p>
          <p style="font-size: 14px; color: #999; margin-top: 20px; text-align: center;">
              Este es un mensaje automatizado de Barbershop. Por favor, no respondas directamente a este correo.
          </p>
      </div>
    `

  })
}