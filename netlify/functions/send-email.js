const nodemailer = require('nodemailer');
const twilio = require('twilio');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Metodo no permitido' })
    };
  }

  try {
    const { tipo, guestEmail, mensaje, evento } = JSON.parse(event.body);

    const TU_EMAIL = 'maycoljhordan07@gmail.com';
    const TU_NUMERO = '+51932387692';
    const CORREO_MABEL = 'mabelmiraval2019@gmail.com'; // Cambiar por el de Mabel después
    const NUMERO_MABEL = '+51999234643'; // Cambiar por el de Mabel después

    // Configurar Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Configurar Twilio
    const twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    if (tipo === 'aceptar') {
      
      // ========== CORREO 1: PARA MABEL (Romántico y especial) ==========
      const emailParaMabel = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Georgia, serif; background: linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 100%); margin: 0; padding: 30px 20px; }
            .container { max-width: 540px; margin: 0 auto; background: linear-gradient(180deg, #FDF8E8 0%, #f9f0d9 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(99,13,22,0.4), 0 0 40px rgba(197,160,89,0.3); border: 4px solid #c5a059; }
            .header { background: linear-gradient(135deg, #630d16 0%, #8b1a2b 50%, #630d16 100%); padding: 45px 30px; text-align: center; border-bottom: 4px solid #c5a059; position: relative; }
            .header::before { content: "✨"; position: absolute; top: 15px; left: 20px; font-size: 20px; }
            .header::after { content: "✨"; position: absolute; top: 15px; right: 20px; font-size: 20px; }
            .header h1 { color: #c5a059; font-family: Georgia, serif; margin: 0; font-size: 36px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); letter-spacing: 2px; }
            .header .subtitle { color: #f4e4bc; margin: 15px 0 0; font-style: italic; font-size: 18px; letter-spacing: 1px; }
            .hearts-row { text-align: center; padding: 20px 0 5px; font-size: 28px; letter-spacing: 15px; }
            .content { padding: 40px 35px; text-align: center; }
            .greeting { font-size: 26px; color: #630d16; margin-bottom: 25px; font-style: italic; }
            .message { font-size: 17px; color: #444; line-height: 2; margin-bottom: 30px; text-align: justify; }
            .highlight { background: linear-gradient(135deg, #630d16, #8b1a2b); color: white; padding: 20px 25px; border-radius: 15px; margin: 25px 0; font-size: 16px; line-height: 1.8; box-shadow: 0 8px 25px rgba(99,13,22,0.3); }
            .info-box { background: white; border: 3px solid #c5a059; border-radius: 15px; padding: 30px; margin: 30px 0; text-align: left; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
            .info-box h3 { color: #630d16; margin: 0 0 20px; font-size: 20px; text-align: center; border-bottom: 2px solid #c5a059; padding-bottom: 15px; }
            .info-item { display: flex; align-items: center; margin: 15px 0; padding: 10px 0; border-bottom: 1px dashed #e0d5c0; }
            .info-item:last-child { border-bottom: none; }
            .info-icon { font-size: 24px; margin-right: 15px; }
            .info-text { color: #444; font-size: 16px; }
            .info-text strong { color: #630d16; }
            .romantic-quote { background: #f9f0d9; border-left: 4px solid #c5a059; padding: 20px; margin: 30px 0; font-style: italic; color: #630d16; font-size: 15px; line-height: 1.8; border-radius: 0 10px 10px 0; }
            .signature { margin-top: 35px; padding-top: 25px; border-top: 2px dashed #c5a059; }
            .signature p { color: #630d16; font-size: 18px; margin: 5px 0; }
            .signature .name { font-size: 28px; color: #630d16; margin-top: 15px; font-style: italic; }
            .signature .heart-sig { font-size: 24px; margin: 10px 0; }
            .footer { background: linear-gradient(135deg, #630d16, #4d0a11); color: #f4e4bc; padding: 25px; text-align: center; font-size: 14px; line-height: 1.8; }
            .footer .emoji { font-size: 20px; margin: 0 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>💕 Reserva Confirmada 💕</h1>
              <p class="subtitle">Una cita muy especial te espera</p>
            </div>
            
            <div class="hearts-row">💖💝💖</div>
            
            <div class="content">
              <p class="greeting">Mi hermosa Mabel...</p>
              
              <p class="message">
                ¡Tu reserva ha sido confirmada exitosamente! No sabes lo feliz que me hace saber que aceptaste. 
                He preparado con mucho cariño cada detalle de este día especial que compartiremos juntos.
              </p>
              
              <div class="highlight">
                🌟 Te espera un día lleno de sorpresas, risas y momentos inolvidables. 
                Visitaremos lugares increíbles donde la ciencia y el arte cobran vida. 
                ¡Prepárate para una aventura mágica! 🌟
              </div>
              
              <div class="info-box">
                <h3>✨ Detalles de Nuestra Cita ✨</h3>
                <div class="info-item">
                  <span class="info-icon">📅</span>
                  <span class="info-text"><strong>Fecha:</strong> Viernes, 2 de Enero 2026</span>
                </div>
                <div class="info-item">
                  <span class="info-icon">🕐</span>
                  <span class="info-text"><strong>Hora:</strong> 10:00 AM - 4:00 PM</span>
                </div>
                <div class="info-item">
                  <span class="info-icon">🎭</span>
                  <span class="info-text"><strong>Actividades:</strong> Almuerzo romántico, museo y aventura científica</span>
                </div>
                <div class="info-item">
                  <span class="info-icon">👗</span>
                  <span class="info-text"><strong>Dress code:</strong> Cómoda y hermosa (como siempre)</span>
                </div>
              </div>
              
              <div class="romantic-quote">
                "Cada momento contigo es un regalo que guardo en mi corazón. 
                Este viernes será el inicio de muchos recuerdos hermosos juntos..."
              </div>
              
              <div class="signature">
                <p>Con todo mi cariño y emoción,</p>
                <p>esperando ansioso verte...</p>
                <p class="heart-sig">💕</p>
                <p class="name">Maycol</p>
              </div>
            </div>
            
            <div class="footer">
              <span class="emoji">💌</span> Este mensaje fue enviado con mucho amor <span class="emoji">💌</span><br>
              Nos vemos el viernes, mi bobita hermosa 🥰
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"Maycol - Invitacion Especial" <' + process.env.EMAIL_USER + '>',
        to: CORREO_MABEL,
        subject: 'Tu Reserva esta Confirmada - Viernes 2 de Enero 2026',
        html: emailParaMabel
      });

      // ========== CORREO 2: PARA TI MAYCOL (Notificacion con su respuesta) ==========
      const emailParaMaycol = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Georgia, serif; background: #FDF8E8; margin: 0; padding: 20px; }
            .container { max-width: 500px; margin: 0 auto; background: #FDF8E8; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.2); border: 3px solid #c5a059; }
            .header { background: linear-gradient(135deg, #2d7a2d, #1e5a1e); padding: 30px; text-align: center; }
            .header h1 { color: white; font-family: Georgia, serif; margin: 0; font-size: 26px; }
            .badge { background: #ffd700; color: #333; padding: 8px 20px; border-radius: 20px; display: inline-block; font-weight: bold; margin-top: 10px; }
            .content { padding: 30px; }
            .info-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #ddd; }
            .info-row:last-child { border-bottom: none; }
            .label { color: #666; font-size: 14px; }
            .value { color: #333; font-weight: bold; font-size: 14px; }
            .message-box { background: white; border-left: 4px solid #630d16; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .message-box h4 { color: #630d16; margin: 0 0 10px; }
            .message-box p { color: #444; margin: 0; font-style: italic; line-height: 1.6; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MABEL HA ACEPTADO</h1>
              <div class="badge">CONFIRMADO</div>
            </div>
            <div class="content">
              <div class="info-row">
                <span class="label">Fecha</span>
                <span class="value">Viernes, 2 de Enero 2026</span>
              </div>
              <div class="info-row">
                <span class="label">Hora</span>
                <span class="value">10:00 AM - 4:00 PM</span>
              </div>
              <div class="info-row">
                <span class="label">Correo de Mabel</span>
                <span class="value">${CORREO_MABEL}</span>
              </div>
              
              <div class="message-box">
                <h4>Mensaje de Mabel para ti:</h4>
                <p>"${mensaje || 'No dejo mensaje, pero ACEPTO!'}"</p>
              </div>
              
              <p style="text-align: center; color: #2d7a2d; font-size: 18px; margin-top: 20px;">
                <strong>Prepara todo para la cita!</strong>
              </p>
            </div>
            <div class="footer">
              Notificacion automatica - ${new Date().toLocaleString('es-PE')}
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"Sistema de Invitacion" <' + process.env.EMAIL_USER + '>',
        to: TU_EMAIL,
        subject: 'MABEL HA ACEPTADO - Viernes 2 de Enero 2026',
        html: emailParaMaycol
      });

      // ========== SMS PARA TI ==========
      await twilioClient.messages.create({
        body: '💕 ¡MABEL HA ACEPTADO! La cita del Viernes 2 de Enero (10AM-4PM) está confirmada. ' + (mensaje ? 'Su mensaje: "' + mensaje + '"' : '¡Sin mensaje pero dijo SÍ!') + ' 🎉',
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });

      // ========== SMS PARA MABEL ==========
      await twilioClient.messages.create({
        body: '💕 ¡Hola mi princesa hermosa! Tu reserva para el Viernes 2 de Enero está confirmada. Te espero con muchas ganas para vivir un día increíble juntos. ¡Nos vemos! Con todo mi cariño, Maycol 💖',
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: NUMERO_MABEL
      });

    } else {
      // ========== DECLINAR: CORREO PARA TI ==========
      const emailDecline = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Georgia, serif; background: #f5f5f5; margin: 0; padding: 20px; }
            .container { max-width: 500px; margin: 0 auto; background: #FDF8E8; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 2px solid #888; }
            .header { background: linear-gradient(135deg, #666, #444); padding: 30px; text-align: center; }
            .header h1 { color: #ddd; font-family: Georgia, serif; margin: 0; font-size: 24px; }
            .content { padding: 30px; text-align: center; }
            .message-box { background: white; border-left: 4px solid #888; padding: 20px; margin: 20px 0; text-align: left; border-radius: 0 8px 8px 0; }
            .footer { background: #444; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Mabel ha Declinado</h1>
            </div>
            <div class="content">
              <p>La invitacion para el Viernes 2 de Enero 2026 ha sido declinada.</p>
              
              ${mensaje ? `
              <div class="message-box">
                <h4 style="color: #666; margin: 0 0 10px;">Su mensaje:</h4>
                <p style="color: #444; margin: 0; font-style: italic;">"${mensaje}"</p>
              </div>
              ` : '<p style="color: #888;">No dejo ningun mensaje.</p>'}
              
              <p style="color: #666; margin-top: 25px;">Animo, habra mas oportunidades...</p>
            </div>
            <div class="footer">
              ${new Date().toLocaleString('es-PE')}
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: '"Sistema de Invitacion" <' + process.env.EMAIL_USER + '>',
        to: TU_EMAIL,
        subject: 'Mabel ha declinado la invitacion - 2 de Enero',
        html: emailDecline
      });

      // SMS para ti
      await twilioClient.messages.create({
        body: 'Mabel ha declinado la invitacion del Viernes 2 de Enero. ' + (mensaje ? 'Mensaje: "' + mensaje + '"' : 'Sin mensaje.'),
        messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
        to: TU_NUMERO
      });
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, mensaje: 'Correos y SMS enviados' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
