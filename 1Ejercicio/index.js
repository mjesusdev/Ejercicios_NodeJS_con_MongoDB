var mongo = require('mongodb');
var fs = require('fs');
var MongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db){
    if (err) throw err;
    var dbo = db.db("miBdMongo");
    // Leer fichero, también se puede hacer por require
    fs.readFile('alumnos.json', (err, data) => {
        if (err) throw err;
        var contenido = JSON.parse(data);
        console.log(contenido);
        dbo.collection("clientes").insertMany(contenido, function (err,res) {
            if (err) throw err;
            console.log("Se han insertado " + res.insertedCount + " documentos");
            db.close();
        })
    });
})