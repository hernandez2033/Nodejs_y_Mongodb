const express = require('express');
const path = require('path');//para user su metodo path.join para unir direcctorios
const exphbs = require('express-handlebars');//importamos el modulo
const methodOverride = require('method-override');
const session = require('express-session');

//Initiliazations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));//declaramos la constante __dirname que me devuelve la ruta
app.engine('.hbs', exphbs({
//creamos un objeto
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views', 'layouts')),//indicamos la ruta de la carpeta layouts
    partialsDir: path.join(app.get('views', 'partials')),//indicamos la ruta de la carpeta partials
    extname: '.hbs' //todos los archivos teminan con hbs    
}));//hbs es el nombre con el que llamaremos el archivo de nuestras vistas
app.set('view engine', '.hbs');//para indicarle el motor de plantilla en este caso .hbs

//Middlewares
app.use(express.urlencoded({extended: false}));//pata poder resibir los datos desde un formulario y lo pueda entender el servidor, extendeds: false para indicar que no requiero resivir imagens
app.use(methodOverride('_method'));//para que el formulario pueda enviar otros tipos de metodos delete o put
app.use(session({
    //creo un objeto con las siguientes propiedades
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
//Global variables

//Routes
app.use(require('./routes/index'));//definimos las rutas de mi servidor
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//Static Files

//Server is lestenning
app.listen(app.get('port'), () => {
    console.log('server on port ',app.get('port'));
});