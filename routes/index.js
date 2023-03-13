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
  src: String,
  alumnes: String
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


exports.login = function (req, res) {
  res.render('login');
};

exports.registrarse = function (req, res) {
  res.render('registrarse');
};

exports.calendari = function (req, res) {
  res.render('calendari');
};

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

exports.retornaClasses = function (req, res) {
  Classe.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.retornaUsuaris = function (req, res) {
  Usuari.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.crearClasse = function (req, res) {
  const baseURL = req.protocol + '://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);
  const novaClasse = new Classe({
    professor: reqUrl.searchParams.get("professor"),
    categoria: reqUrl.searchParams.get("categoria"),
    descripcio: reqUrl.searchParams.get("descripcio"),
    hora: reqUrl.searchParams.get("hora"),
    duracio: reqUrl.searchParams.get("duracio"),
    columna: reqUrl.searchParams.get("columna"),
    fila: reqUrl.searchParams.get("fila"),
    src: reqUrl.searchParams.get("src")
  });
  novaClasse.save()
    .then(() => {
      console.log("Classe creada");
      Usuari.findOneAndUpdate(
        { nom: reqUrl.searchParams.get("professor") },
        { $inc: { tcoins: +2 } },
        { new: true }
      )
        .then((usuariActualitzat) => {
          console.log("Usuari actualitzat:", usuariActualitzat);
        })
        .catch(err => {
          console.log(err);
        }
        );
    })
    .catch(err => {
      console.log(err);
    });
  res.redirect('/calendari');
};

exports.modificarClasse = function (req, res) {
  const baseURL = req.protocol + '://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);
  const id = reqUrl.searchParams.get("id");

  idClasse = new mongoose.Types.ObjectId(id);

  Classe.findOneAndUpdate(
    { _id: idClasse },
    { 
      descripcio: reqUrl.searchParams.get("descripcio"),
      hora: reqUrl.searchParams.get("hora"),
      duracio: reqUrl.searchParams.get("duracio")
    }, 
    { new: true }
  )
    .then((classeActualizada) => {
      console.log("Classe actualizada:", classeActualizada);
    })
    .catch(err => {
      console.log(err);
    });

  res.redirect('/calendari');
};

exports.eliminarClasse = function (req, res) {
  const baseURL = req.protocol + '://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);
  const id = reqUrl.searchParams.get("id");

  idClasse = new mongoose.Types.ObjectId(id);

  Classe.deleteOne({ _id: idClasse })
    .then(() => {
      console.log("Classe eliminada");
    })
    .catch(err => {
      console.log(err);
    });

  res.redirect('/calendari');
};

exports.uneixClasse = function (req, res) {
  const baseURL = req.protocol + '://' + req.headers.host + '/';
  const reqUrl = new URL(req.url, baseURL);
  const id = reqUrl.searchParams.get("id");

  const idClasse = new mongoose.Types.ObjectId(id);

  Usuari.findOneAndUpdate(
    { nom: reqUrl.searchParams.get("nom"), tcoins: { $gte: 1 } },
    { $inc: { tcoins: -1 } },
    { new: true }
  )
    .then((usuariActualitzat) => {
      console.log("Usuari actualitzat:", usuariActualitzat);
      // if (tcoins <= 0) {
      //   res.send("No tens prou tcoins per apuntar-te a aquesta classe." + "<br>" + "<a href='/calendari'>Torna al calendari</a>");
      // }else{
      Classe.findOneAndUpdate(
        { _id: idClasse },
        { alumnes: reqUrl.searchParams.get("nom") },
        { new: true }
      )
        .then((classeActualizada) => {
          console.log("Classe actualizada:", classeActualizada);
          res.redirect('/calendari');
        })
        .catch(err => {
          console.log(err);
          res.send("No tens prou tcoins per apuntar-te a aquesta classe." + "<br>" + "<a href='/calendari'>Torna al calendari</a>");
        });
      // }
    })
    .catch(err => {
      console.log(err);
      res.redirect('/calendari');
    });
};
