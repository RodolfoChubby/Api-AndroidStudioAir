const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((error) => console.error('Error al conectar a la base de datos:', error));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conexión a la base de datos abierta'));

// Middleware
app.use(bodyParser.json());

// Rutas
const usersRouter = require('./routes/users');
const propertiesRouter = require('./routes/properties');
const reservationsRouter = require('./routes/reservations');

app.use('/users', usersRouter);
app.use('/properties', propertiesRouter);
app.use('/reservations', reservationsRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));
