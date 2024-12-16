const tmi = require('tmi.js');
const dotenv = require('dotenv');
const timezones = require('./timezones.json');
const moment = require('moment-timezone');

dotenv.config(); // Cargar archivo .env

// Opciones para conectar con Twitch
const options = {
  identity: {
    username: 'vanderfondi',
    password: process.env.TWITCH_OAUTH_TOKEN,
  },
  channels: ['vanderfondi'],
};

const client = new tmi.Client(options);

// Eventos de conexión y mensajes
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Función para enviar mensajes en la hora correspondiente
function checkAndSendMessage() {
  const now = moment.tz('America/Santiago').format('HH:mm');
  console.log(`Hora actual: ${now}`); // Log para verificar la hora actual

  // Buscar la información de la hora actual en el JSON
  const timezoneInfo = timezones.find((tz) => tz.hora === now);

  console.log(timezoneInfo);
  if (timezoneInfo) {
    const { hora, lugares } = timezoneInfo;
    if (lugares && lugares.length > 0) {
      let mensaje = `¡FELIZ AÑO NUEVO! A las ${hora}, es Año Nuevo en: `;
      lugares.forEach((lugar) => {
        mensaje += `${lugar.countries} (${lugar.cities}), `;
      });
      client.say('vanderfondi', mensaje.slice(0, -2)); // Remueve la última coma y espacio
    }
  } else {
    console.log(
      `No es hora de enviar mensaje para la hora actual: ${now}`
    );
  }
}

// Ejecutar `checkAndSendMessage` cada minuto
setInterval(checkAndSendMessage, 10000);

// Conectar cliente a Twitch
client.connect();

// Manejo de mensajes en el chat
function onMessageHandler(target, context, msg, self) {
  if (self) return; // Ignorar mensajes propios del bot

  // Comando para consultar información sobre una hora específica (!HH:MM)
  const horaRegex = /^!(\d{2}:\d{2})$/;
  const match = msg.match(horaRegex);

  if (match) {
    const hora = match[1];
    const timezoneInfo = timezones.find((tz) => tz.hora === hora);

    if (timezoneInfo && timezoneInfo.lugares.length > 0) {
      let mensaje = `A las ${hora} es Año Nuevo en: `;
      timezoneInfo.lugares.forEach((lugar) => {
        mensaje += `${lugar.countries} (${lugar.cities}), `;
      });
      client.say(target, mensaje.slice(0, -2)); // Remueve la última coma y espacio
    } else {
      client.say(
        target,
        `Lo siento, no tengo información para la hora ${hora}.`
      );
    }
  }
}

// Evento cuando el cliente se conecta
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
