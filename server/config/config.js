//==================================================
//PUERTO
//==================================================

process.env.PORT = process.env.PORT || 3000;


//==================================================
//ENTORNO
//==================================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//==================================================
//BASE DE DATOS
//==================================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/impresora'
} else {
    urlDB = 'mongodb+srv://impresora:IZHJooql1396@impresora.jagyy.mongodb.net/impresora'
}
process.env.URLDB = urlDB;