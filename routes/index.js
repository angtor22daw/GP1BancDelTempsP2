const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bancDelTemps');
}

const Schema = mongoose.Schema;

const schemaClasses = new Schema({
  professor: String,
  categoria: String,
  descripcio: String,
  hora: String,
  duracio: String,
  columna: String,
  fila: String,
  src: String
});

const schemaUsuaris = new Schema({
  nom: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tcoins: Number,
  admin: Boolean
});

const Usuari = mongoose.model('usuaris', schemaUsuaris);
const Classe = mongoose.model('classes', schemaClasses);

exports.autenticarUsuari = function (req, res) {
  const baseURL = req.protocol + '://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);

  Usuari.find({ nom: reqUrl.searchParams.get("nom"), password: reqUrl.searchParams.get("password") })
    .then(result => {
      if (result != "") {
        console.log("Usuari correcte");
        res.redirect('/calendari');
      } else {
        console.log("Usuari incorrecte");
        res.send("Usuari o contrasenya incorrectes." + "<br>" + "<a href='/login'>Torna a la pàgina d'inici</a>");
      }
    })
    .catch(err => {
      console.log(err);
      res.send("Error al buscar usuari." + "<br>" + "<a href='/login'>Torna a la pàgina d'inici</a>");
    });
};

exports.desarUsuari = function (req, res) {
  const baseURL = req.protocol + '://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);

  Usuari.find({ nom: reqUrl.searchParams.get("nom") })
    .then(result => {
      if (result != "") {
        console.log("Usuari ja existent");
        res.send("Ja existeix un usuari amb aquest nom." + "<br>" + "<a href='/login'>Torna a la pàgina d'inici</a>");
      } else {
        console.log("Usuari no existent");
        const nouUsuari = new Usuari({
          nom: reqUrl.searchParams.get("nom"),
          password: reqUrl.searchParams.get("password"),
          tcoins: 3,
          admin: false
        });
        nouUsuari.save()
          .then(() => {
            console.log("Usuari " + reqUrl.searchParams.get("nom") + " creat");
          })
          .catch(err => {
            console.log(err);
          });
        res.redirect('/login');
      }
    })
    .catch(err => {
      console.log(err);
      res.send("Error al buscar usuari." + "<br>" + "<a href='/login'>Torna a la pàgina d'inici</a>");
    });
};

exports.verificarSiExisteixAdmin = function (req, res) {
  Usuari.find({ admin: true })
    .then(result => {
      if (result != "") {
        console.log("Ja existeix un administrador");
      } else {
        console.log("No existeix cap administrador");
        const nouUsuari = new Usuari({
          nom: "admin",
          password: "admin",
          tcoins: 3,
          admin: true
        });
        nouUsuari.save()
          .then(() => {
            console.log("Usuari admin creat");
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

// routes = require('express').Router();

// module.exports = routes;
