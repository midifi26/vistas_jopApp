const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
app.use(express.static("public"));

// Middleware de sesiones
app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Configurar Pug y carpeta de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Ruta home (única, corregida)
app.get('/', (req, res) => {
  const ofertas = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend Jr.',
      descripcion: 'Se busca programador con conocimientos en HTML, CSS, JS.',
      pais: 'España',
      salario: '€22,000',
      enlace: 'https://ejemplo.com/anuncio1'
    },
    {
      id: 2,
      titulo: 'Proyecto freelance React',
      descripcion: 'Implementación de landing page para startup.',
      pais: 'Remoto',
      salario: '€1,200 por proyecto',
      enlace: 'https://ejemplo.com/anuncio2'
    }
  ];

  res.render('home', {
    results: ofertas,
    userIsLoggedIn: !!req.session.user,
    role: req.session.user?.role || null
  });
});

// Login como invitado
app.get('/invitado', (req, res) => {
  req.session.user = {
    role: 'guest',
    email: 'invitado@demo.com'
  };
  res.redirect('/');
});

// Login (GET)
app.get('/login', (req, res) => {
  res.render('login');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/');
  });
});

// Favoritos
app.get('/favorites', (req, res) => {
  const favoritos = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend Jr.',
      descripcion: 'Se busca programador con conocimientos en HTML, CSS, JS.',
      pais: 'España',
      salario: '€22,000'
    },
    {
      id: 2,
      titulo: 'Proyecto freelance React',
      descripcion: 'Implementación de landing page para startup.',
      pais: 'Remoto',
      salario: '€1,200 por proyecto'
    }
  ];

  res.render('favoritos', { favoritos });
});

// Dashboard admin
app.get('/dashboard', (req, res) => {
  const anuncios = [
    {
      _id: '1',
      titulo: 'Desarrollador Fullstack',
      descripcion: 'Proyecto freelance de 3 meses',
      pais: 'Remoto',
      salario: '3000€',
      enlace: 'https://ejemplo.com/anuncio'
    }
  ];

  res.render('dashboard', {
    anuncios,
    role: 'admin',
    user: { email: 'admin@admin.com' }
  });
});

app.get('/password', (req, res) => {
  res.render('password');
});

app.post('/password', (req, res) => {
  const { email } = req.body;
  console.log(`Solicitud de recuperación de contraseña para: ${email}`);
  // Aquí iría la lógica para enviar el correo de recuperación

  res.send('Se ha enviado un enlace de recuperación si el correo está registrado.');
});


// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});


// // BOTÓN DE FAVORITO SOLO PARA USUARIOS LOGUEADOS
// if userIsLoggedIn
// form(action="/favorites", method="POST")
//   input(type="hidden", name="itemId", value=item.id)
//   button(type="submit") Guardar en favoritos
// else