// Clase imatge
class imatge {
    constructor(ctx, figura, columna, fila) {
        this.ctx = ctx;
        this.figura = figura;
        this.columna = columna;
        this.fila = fila;
    }
    //setters
    set setCtx(ctx) {
        this.ctx = ctx;
    }
    set setFigura(figura) {
        this.figura = figura;
    }
    set setColumna(columna) {
        this.columna = columna;
    }
    set setFila(fila) {
        this.fila = fila;
    }
    //getters
    get getCtx() {
        return this.ctx;
    }
    get getFigura() {
        return this.figura;
    }
    get getColumna() {
        return this.columna;
    }
    get getFila() {
        return this.fila;
    }

}

function load() {
    let usuari = detectaUsuari();
    // Mostrar nom de l'usuari
    document.getElementById('nom').innerHTML = usuari;

    //detecta usuari
    function detectaUsuari() {
        let usuari = localStorage.getItem('nom');
        if (usuari == null) {
            // window.location.href = 'http://localhost:8888/';
        }
        else {
            return usuari;
        }
    }
    var global = 0;
    var imatge1 = new imatge();

    var dies = [];
    //DIBUIJAMOS CALENDARIO
    var canvas = document.getElementById('tauler');
    var ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //Crear header calendari
    ctx.fillStyle = "#3E3F41"; //4F3515
    ctx.fillRect(0, 0, 185, 50);
    ctx.fillRect(185, 0, 185, 50);
    ctx.fillRect(370, 0, 185, 50);
    ctx.fillRect(555, 0, 185, 50);
    ctx.fillRect(740, 0, 185, 50);
    ctx.fillRect(925, 0, 185, 50);
    ctx.fillRect(1110, 0, 185, 50);
    // Dies de la setmana
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Dilluns', 47, 30);
    ctx.fillText('Dimarts', 198, 30);
    ctx.fillText('Dimecres', 345, 30);
    ctx.fillText('Dijous', 505, 30);
    ctx.fillText('Divendres', 645, 30);
    ctx.fillText('Dissabte', 798, 30);
    ctx.fillText('Diumenge', 941, 30);
    ctx.font = '12px sans-serif';
    //dibujar lineas a los lun, mar, mier, jue, vie, sab, dom
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(1042, 0);
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(151, 50);
    ctx.lineTo(151, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(302, 50);
    ctx.lineTo(302, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(453, 50);
    ctx.lineTo(453, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(604, 50);
    ctx.lineTo(604, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(755, 50);
    ctx.lineTo(755, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(906, 50);
    ctx.lineTo(906, 0);
    ctx.stroke();
    //dibujar los cuadrados
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {

            //color de las lineas negras
            ctx.strokeStyle = 'black';
            if (i > 3 & j > 2) {
                ctx.fillStyle = "#BDA479";
                ctx.fillRect(0 + j * 151, 50 + i * 100, 151, 100);

            }
            else if (i > 4) {
                ctx.fillStyle = "#BDA479";
                ctx.fillRect(0 + j * 151, 50 + i * 100, 151, 100);
            }
            else {
                ctx.fillStyle = "#E9E9D2";
                ctx.fillRect(0 + j * 151, 50 + i * 100, 151, 100);
                path = new Path2D();
                path.rect(0 + j * 151, 50 + i * 100, 151, 100);
                dies.push(path);
            }
            ctx.strokeRect(0 + j * 151, 50 + i * 100, 151, 100);
        }
    }
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(1042, 0);
    ctx.lineTo(1042, 650);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 650);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 650);
    ctx.lineTo(1042, 650);
    ctx.stroke();
    ctx.lineWidth = 2;
    //dibujar los números hasta el 31 y continuar con el 1
    var dia = 1;
    ctx.fillStyle = "black";
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            ctx.fillText(dia, 10 + j * 151, 70 + i * 100);
            dia++;
            if (dia > 31) {
                dia = 1;
            }
        }
    }
    dibuixaClassesMongo();
    //DRAG AND DROP llamar a las funciones
    let amplada = 151;
    let alcada = 100;
    let MARGE = 52;

    //queryselector del canvas
    var drag = document.querySelector('canvas');
    drag.addEventListener('dragover', gestionarSobreDrag, false);

    let imatges = document.querySelectorAll('img');
    [].forEach.call(imatges, function (item) {
        item.addEventListener('dragstart', gestionarIniciDrag, false);
        item.addEventListener('dragend', gestionarDrop, false);
    });
    [].forEach.call(imatges, function (item) {
        item.addEventListener('dragstart', gestionarIniciDrag, false);
    });
    function gestionarSobreDrag(ev) {
        ev.preventDefault();
    }
    function gestionarIniciDrag(ev) {
        ev.dataTransfer.setData("imatge", ev.target.id);

    }
    canvas.addEventListener('click', function (ev) {
        console.log("click");
        console.log(drag);
        let rect = drag.getBoundingClientRect();
        var x = ev.clientX - rect.left + 80;
        var y = ev.clientY - rect.top;
        var canvas = document.getElementById("tauler");
        var ctx = canvas.getContext("2d");
        console.log("x: " + (Math.round(x / amplada) - 1) + " y: " + (Math.round(y / alcada) - 1));
        ClaseMongo(Math.round(x / amplada) - 1, Math.round(y / alcada) - 1);

    }
    );
    function ClaseMongo(xColumna, yFila) {
        let request = new XMLHttpRequest();
        request.open('GET', '/classes');
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            let classes = request.response;
            for (let i = 0; i < classes.length; i++) {
                let professor = classes[i].professor;
                let columna = classes[i].columna;
                let fila = classes[i].fila;

                let id = classes[i]._id;
                let categoria = classes[i].categoria;
                let descripcio = classes[i].descripcio;
                let hora = classes[i].hora;
                let duracio = classes[i].duracio;
                console.log("alumne:" + classes[i].alumnes);
                calculDia = (7 * parseInt(fila)) + parseInt(columna) + 1;
                if (columna == xColumna && fila == yFila) {
                    if ((classes[i].alumnes != undefined) && (professor != usuari) && (classes[i].alumnes != usuari)) {
                        // si la clase ja te un alumne
                        let divGestio = document.createElement("div");
                        divGestio.id = "divGestio";
                        let labDia = document.createElement('label');
                        labDia.innerHTML = "Dia " + calculDia;
                        labDia.className = "labDia";
                        let labProfessor = document.createElement('label');
                        labProfessor.innerHTML = "Professor → " + professor;

                        let labCategoria = document.createElement('label');
                        labCategoria.innerHTML = "Categoría → " + categoria;

                        let labDescripcio = document.createElement('label');
                        labDescripcio.innerHTML = "Descripció → " + descripcio;

                        let labHora = document.createElement('label');
                        labHora.innerHTML = "Hora → " + hora;

                        let labDuracio = document.createElement('label');
                        labDuracio.innerHTML = "Duració → " + duracio;

                        let br = document.createElement('br');
                        let br2 = document.createElement('br');
                        let br3 = document.createElement('br');
                        let br4 = document.createElement('br');
                        let br5 = document.createElement('br');
                        let br6 = document.createElement('br');
                        let br7 = document.createElement('br');
                        let labMissatge = document.createElement('label');
                        labMissatge.innerHTML = "Ho sentim! Aquesta classe ja te alumne. Prova de triar una altre.";
                        labMissatge.style = "color: red";
                        let br9 = document.createElement('br');

                        let butCancelar = document.createElement('button');
                        butCancelar.type = 'button';
                        butCancelar.innerHTML = 'Cancel·la';
                        butCancelar.className = "butCancelar";
                        butCancelar.addEventListener('click', function () {
                            document.getElementById('divGestio').remove();
                        });


                        divGestio.appendChild(labDia);

                        // divGestio.appendChild(br8);
                        divGestio.appendChild(labProfessor);
                        divGestio.appendChild(br3);
                        divGestio.appendChild(labCategoria);

                        divGestio.appendChild(br4);
                        divGestio.appendChild(labDescripcio);
                        divGestio.appendChild(br5);
                        divGestio.appendChild(labDuracio);
                        divGestio.appendChild(br6);
                        divGestio.appendChild(labHora);
                        divGestio.appendChild(br7);
                        divGestio.appendChild(br);
                        divGestio.appendChild(labMissatge);
                        divGestio.appendChild(br2);
                        divGestio.appendChild(br9);
                        divGestio.appendChild(butCancelar);
                        document.body.appendChild(divGestio);

                    }
                    else if ((classes[i].alumnes != undefined) && (classes[i].alumnes == usuari)) {
                        // si la clase ja te un alumne
                        let divGestio = document.createElement("div");
                        divGestio.id = "divGestio";
                        let labDia = document.createElement('label');

                        labDia.innerHTML = "Dia " + calculDia;
                        labDia.className = "labDia";
                        let labProfessor = document.createElement('label');
                        labProfessor.innerHTML = "Professor → " + professor;

                        let labCategoria = document.createElement('label');
                        labCategoria.innerHTML = "Categoría → " + categoria;

                        let labDescripcio = document.createElement('label');
                        labDescripcio.innerHTML = "Descripció → " + descripcio;

                        let labHora = document.createElement('label');
                        labHora.innerHTML = "Hora → " + hora;

                        let labDuracio = document.createElement('label');
                        labDuracio.innerHTML = "Duració → " + duracio;

                        let br = document.createElement('br');
                        let br2 = document.createElement('br');
                        let br3 = document.createElement('br');
                        let br4 = document.createElement('br');
                        let br5 = document.createElement('br');
                        let br6 = document.createElement('br');
                        let br7 = document.createElement('br');
                        let labMissatge = document.createElement('label');

                        labMissatge.innerHTML = "Ja estàs apuntat a aquesta classe!";
                        labMissatge.style = "color: green";
                        let br9 = document.createElement('br');

                        let butCancelar = document.createElement('button');
                        butCancelar.type = 'button';
                        butCancelar.innerHTML = 'Cancel·la';
                        butCancelar.className = "butCancelar";
                        butCancelar.addEventListener('click', function () {
                            document.getElementById('divGestio').remove();
                        });

                        divGestio.appendChild(labDia);
                        divGestio.appendChild(labProfessor);
                        divGestio.appendChild(br3);
                        divGestio.appendChild(labCategoria);

                        divGestio.appendChild(br4);
                        divGestio.appendChild(labDescripcio);
                        divGestio.appendChild(br5);
                        divGestio.appendChild(labDuracio);
                        divGestio.appendChild(br6);
                        divGestio.appendChild(labHora);
                        divGestio.appendChild(br7);
                        divGestio.appendChild(br);
                        divGestio.appendChild(labMissatge);
                        divGestio.appendChild(br9);
                        divGestio.appendChild(br2);
                        divGestio.appendChild(butCancelar);
                        document.body.appendChild(divGestio);
                    } else {
                        console.log(id);
                        if (columna == xColumna & fila == yFila) {
                            // variable para calcular el dia

                            // intentamos pasar una variable pero no nos va
                            global = calculDia;

                            console.log("dia: " + calculDia);
                            console.log("hay clase");
                            if (professor == usuari) {
                                console.log("eres el profe");
                                // CREAR FORMULARI PER ELIMINAR CLASE
                                //____________________________________________________________________________
                                let divGestio = document.createElement("div");
                                divGestio.id = "divGestio";
                                let formEliminar = document.createElement('form');
                                formEliminar.action = '/eliminarClasse';

                                if (document.getElementById('divGestio')) {
                                    document.getElementById('divGestio').remove();
                                }
                                // Parametre ocult
                                let inClaseID = document.createElement('input');
                                inClaseID.type = 'hidden';
                                inClaseID.name = 'id';
                                inClaseID.value = id;

                                // Parametres

                                let labDia = document.createElement('label');
                                labDia.innerHTML = "Dia " + calculDia;
                                labDia.className = "labDia";
                        
                                let labProfessor = document.createElement('label');
                                labProfessor.innerHTML = "Professor → " + professor;

                                let labCategoria = document.createElement('label');
                                labCategoria.innerHTML = "Categoría → " + categoria;

                                let labDescripcio = document.createElement('label');
                                labDescripcio.innerHTML = "Descripció → " + descripcio;

                                let labHora = document.createElement('label');
                                labHora.innerHTML = "Hora → " + hora;

                                let labDuracio = document.createElement('label');
                                labDuracio.innerHTML = "Duració → " + duracio;

                                let br3 = document.createElement('br');
                                let br4 = document.createElement('br');
                                let br5 = document.createElement('br');
                                let br6 = document.createElement('br');
                                let br7 = document.createElement('br');
                                let br15 = document.createElement('br');
                                let butCancelar = document.createElement('button');
                                butCancelar.type = 'button';
                                butCancelar.innerHTML = 'Cancel·la';
                                butCancelar.className = "butCancelar";
                                butCancelar.addEventListener('click', function () {
                                    document.getElementById('divGestio').remove();
                                });

                                let butEliminarClase = document.createElement('button');
                                butEliminarClase.type = 'submit';
                                butEliminarClase.innerHTML = 'Eliminar';
                                butEliminarClase.className = "butEliminar";

                                /**
                                 * 
                                 * FORMULARIO PARA MODIFICAR CLASE
                                 * 
                                 */
                                let formModificar = document.createElement('form');
                                formModificar.action = '/modificarClasse';

                                // Parametre ocult
                                let inClaseIDmod = document.createElement('input');
                                inClaseIDmod.type = 'hidden';
                                inClaseIDmod.name = 'id';
                                inClaseIDmod.value = id;
                                let labDescripcioMod = document.createElement('label');
                                labDescripcioMod.innerHTML = "Modificar classe";
                                labDescripcioMod.className = "labDescripcioMod";
                                let inpdescripcio = document.createElement('textarea');
                                inpdescripcio.type = 'text';
                                inpdescripcio.name = 'descripcio';
                                inpdescripcio.value = descripcio;
                                let inphora = document.createElement('input');
                                inphora.type = 'text';
                                inphora.name = 'hora';
                                inphora.value = hora;
                                let inpduracio = document.createElement('input');
                                inpduracio.type = 'text';
                                inpduracio.name = 'duracio';
                                inpduracio.value = duracio;

                                let butModificarClase = document.createElement('button');
                                butModificarClase.type = 'submit';
                                butModificarClase.innerHTML = 'Modificar';
                                butModificarClase.className = "butModificar";



                                divGestio.appendChild(formEliminar);
                                formEliminar.appendChild(inClaseID);
                                formEliminar.appendChild(labDia);

                                formEliminar.appendChild(labProfessor);
                                formEliminar.appendChild(br3);
                                formEliminar.appendChild(labCategoria);
                                formEliminar.appendChild(br4);
                                formEliminar.appendChild(labDescripcio);
                                formEliminar.appendChild(br5);
                                formEliminar.appendChild(labDuracio);
                                formEliminar.appendChild(br6);
                                formEliminar.appendChild(labHora);
                                formEliminar.appendChild(br7);
                                formEliminar.appendChild(br15);
                                formEliminar.appendChild(butCancelar);
                                formEliminar.appendChild(butEliminarClase);
                                document.body.appendChild(divGestio);
                                divGestio.appendChild(formModificar);
                                formModificar.appendChild(labDescripcioMod);
                                formModificar.appendChild(inpdescripcio);
                                formModificar.appendChild(inphora);
                                formModificar.appendChild(inpduracio);
                                formModificar.appendChild(butModificarClase);
                                formModificar.appendChild(inClaseIDmod);
                                document.body.appendChild(divGestio);


                                //____________________________________________________________________________
                                // return global;
                            }
                            else {
                                // request usuaris
                                let request = new XMLHttpRequest();
                                request.open('GET', '/usuaris');
                                request.responseType = 'json';
                                request.send();
                                request.onload = function () {
                                    let usuaris = request.response;
                                    for (let i = 0; i < usuaris.length; i++) {
                                        let usuariMongo = usuaris[i].nom;
                                        let tcoins = usuaris[i].tcoins;
                                        console.log(usuariMongo);
                                        console.log(usuari);
                                        if (usuariMongo == usuari) {
                                            console.log("tienes " + tcoins + " tcoins");
                                            //____________________________________________________________________________
                                            let divGestio = document.createElement("div");
                                            divGestio.id = "divGestio";
                                            /**
                                             * 
                                             * FORMULARIO PARA UNIRSE A UNA CLASE
                                             * 
                                             */
                                            let formUnirse = document.createElement('form');
                                            formUnirse.action = '/uneixClasse';

                                            if (document.getElementById('divGestio')) {
                                                document.getElementById('divGestio').remove();
                                            }
                                            // Parametre ocult
                                            let inClaseID = document.createElement('input');
                                            inClaseID.type = 'hidden';
                                            inClaseID.name = 'id';
                                            inClaseID.value = id;
                                            let inuser = document.createElement('input');
                                            inuser.type = 'hidden';
                                            inuser.name = 'nom';
                                            // let alumne = localStorage.getItem('nom')
                                            inuser.value = usuari;
                                            let incoins = document.createElement('input');
                                            incoins.type = 'hidden';
                                            incoins.name = 'tcoins';
                                            incoins.value = tcoins;
                                            //temporal

                                            // Parametres

                                            let labDia = document.createElement('label');
                                            labDia.innerHTML = "<b><u>Dia " + calculDia + "</u></b>";
                                            labDia.className = "labDia";
                                            let labProfessor = document.createElement('label');
                                            labProfessor.innerHTML = "<b>Professor → </b>" + professor;

                                            let labCategoria = document.createElement('label');
                                            labCategoria.innerHTML = "<b>Categoría → </b>" + categoria;

                                            let labDescripcio = document.createElement('label');
                                            labDescripcio.innerHTML = "<b>Descripció → </b>" + descripcio;

                                            let labHora = document.createElement('label');
                                            labHora.innerHTML = "<b>Hora → </b>" + hora;

                                            let labDuracio = document.createElement('label');
                                            labDuracio.innerHTML = "<b>Duració → </b>" + duracio;

                                            let labMissatge = document.createElement('label');
                                            labMissatge.innerHTML = "(Unirse a la classe consumirà un tcoin)";
                                            labMissatge.style = "color: red";

                                            let labTcoins = document.createElement('label');
                                            labTcoins.innerHTML = "Tcoins: " + tcoins;

                                            let br3 = document.createElement('br');
                                            let br4 = document.createElement('br');
                                            let br5 = document.createElement('br');
                                            let br6 = document.createElement('br');
                                            let br7 = document.createElement('br');
                                            let br9 = document.createElement('br');
                                            let br10 = document.createElement('br');
                                            let br11 = document.createElement('br');

                                            let butCancelar = document.createElement('button');
                                            butCancelar.type = 'button';
                                            butCancelar.innerHTML = 'Cancel·la';
                                            butCancelar.className = "butCancelar";
                                            butCancelar.addEventListener('click', function () {
                                                document.getElementById('divGestio').remove();
                                            });

                                            let butUnirseClase = document.createElement('button');
                                            butUnirseClase.type = 'submit';
                                            butUnirseClase.innerHTML = 'Unirse a la classe';
                                            butUnirseClase.className = "butUnirseClase";

                                            divGestio.appendChild(formUnirse);

                                            formUnirse.appendChild(inClaseID);
                                            formUnirse.appendChild(inuser);
                                            formUnirse.appendChild(incoins);
                                            formUnirse.appendChild(labDia);
                                            formUnirse.appendChild(labProfessor);
                                            formUnirse.appendChild(br3);
                                            formUnirse.appendChild(labCategoria);
                                            formUnirse.appendChild(br4);
                                            formUnirse.appendChild(labDescripcio);
                                            formUnirse.appendChild(br5);
                                            formUnirse.appendChild(labDuracio);
                                            formUnirse.appendChild(br6);
                                            formUnirse.appendChild(labHora);
                                            formUnirse.appendChild(br7);
                                            formUnirse.appendChild(br9);
                                            formUnirse.appendChild(labMissatge);
                                            formUnirse.appendChild(br10);
                                            formUnirse.appendChild(labTcoins);
                                            formUnirse.appendChild(br11);
                                            formUnirse.appendChild(butCancelar);
                                            formUnirse.appendChild(butUnirseClase);
                                            document.body.appendChild(divGestio);

                                            //____________________________________________________________________________
                                        }

                                    }

                                }

                            }

                        }

                        else if (i == classes.length - 1) {
                            console.log("no hay clase");
                        }
                    }
                }
            }
        }
    }
    //DIBUIJAR FIGURA EN EL CANVAS
    function dibuixarFigura(ctx, figura, fila, columna) {
        let img = new Image();
        img.src = figura;
        img.onload = function () {
            ctx.drawImage(img, MARGE + fila * amplada - 50, MARGE + columna * alcada + 35, 30, 30);
        }
    }
    //FUNCION AL DROPEAR IMAGEN
    let contador = 0;
    function gestionarDrop(ev) {
        let rect = drag.getBoundingClientRect();
        let x = ev.clientX - rect.left + 80;
        let y = ev.clientY - rect.top;

        var canvas = document.getElementById("tauler");
        var ctx = canvas.getContext("2d");
        canvas.addEventListener("drop", canvasDropped);
        console.log("contador=" + contador);
        if (contador == 0) {
            ev.preventDefault();
            // var x = ev.clientX - 500;
            // var y = ev.clientY - 240;

            console.log("columna i fila2");
            console.log(Math.round(x / amplada) - 1, Math.round(y / alcada) - 1);
            console.log("true si no deberia entrar false si si entraria");
            console.log(!((Math.round((ev.clientY - drag.getBoundingClientRect().top) / alcada) - 1) > 3 && (Math.round((ev.clientX - drag.getBoundingClientRect().left + 80) / amplada) - 1) > 2) || !((Math.round((ev.clientY - drag.getBoundingClientRect().top) / alcada) - 1) > 4));

            //Atributos de la clase Imatge
            imatge1.setCtx = ctx;
            imatge1.setFigura = ev.target.src;
            imatge1.setFila = Math.round(y / alcada) - 1;
            imatge1.setColumna = Math.round(x / amplada) - 1;
            // dibuixarFigura(ctx, ev.target.src, Math.round(x / amplada) - 1, Math.round(y / alcada) - 1);

            contador = 1;
            console.log("contador=" + contador);
            console.log(imatge1);

            //_______________________________________________________________
        }
        // dibuixarFigura(imatge1.ctx, imatge1.figura, imatge1.columna, imatge1.fila);
        function canvasDropped(ev) {
            console.log("canvasDropped");
            let categoria = document.getElementsByClassName('categories');
            [].forEach.call(categoria, function (item) {
                item.draggable = false;
            });
            console.log("figurafora");
            console.log(imatge1.getFigura);
            let dia;
            for (var a = 0; a < dies.length; a++) {

                dia = dies[a];

                /**
                 * 
                 * FORMULARIO PARA CREAR CLASE
                 * 
                 */

                let divForm = document.createElement('div');
                divForm.id = 'divGestio';

                if (document.getElementById('divGestio')) {
                    document.getElementById('divGestio').remove();
                }

                // Creamos el formulario
                let form = document.createElement('form');
                form.action = '/crearClasse';
                
                // Mostramos el dia de la clase
                let label = document.createElement('label');
                label.innerHTML = 'Dia ' + (a + 1);
                label.className = "labDia";
                form.appendChild(label);

                // Parametres ocults
                let usuari = localStorage.getItem('nom');
                let inProfessor = document.createElement('input');
                inProfessor.type = 'hidden';
                inProfessor.name = 'professor';
                inProfessor.value = usuari;

                let br = document.createElement('br');
                let br2 = document.createElement('br');
                let br3 = document.createElement('br');
                let br4 = document.createElement('br');
                let br5 = document.createElement('br');
                let br6 = document.createElement('br');

                let inColumna = document.createElement('input');
                inColumna.type = 'hidden';
                inColumna.name = 'columna';
                inColumna.value = imatge1.getColumna;
                let inFila = document.createElement('input');
                inFila.type = 'hidden';
                inFila.name = 'fila';
                inFila.value = imatge1.getFila;
                let inSrc = document.createElement('input');
                inSrc.type = 'hidden';
                inSrc.name = 'src';
                inSrc.value = imatge1.getFigura;
                let categorialabel;
                if (imatge1.getFigura == 'https://localhost/imatges/encarrec.png') {
                    categorialabel = "Encàrrec";
                } else if (imatge1.getFigura == 'https://localhost/imatges/esports.png') {
                    categorialabel = "Esports";
                } else if (imatge1.getFigura == 'https://localhost/imatges/idiomes.png') {
                    categorialabel = "Idiomes";
                } else if (imatge1.getFigura == 'https://localhost/imatges/musica.png') {
                    categorialabel = "Música";
                }
                let inCategoria = document.createElement('input');
                inCategoria.type = 'hidden';
                inCategoria.name = 'categoria';
                inCategoria.value = categorialabel;
                // Creamos los atributos de las clases
                let labCategoria = document.createElement('label');
                labCategoria.innerHTML = categorialabel;
                let inDescripcio = document.createElement('input');
                inDescripcio.type = 'text';
                inDescripcio.name = 'descripcio';
                inDescripcio.placeholder = 'Descripció';
                let inHorari = document.createElement('input');
                inHorari.type = 'text';
                inHorari.name = 'hora';
                inHorari.placeholder = 'Hora inici (hh:mm)';
                let inDuracio = document.createElement('input');
                inDuracio.type = 'text';
                inDuracio.name = 'duracio';
                inDuracio.placeholder = 'Duració';

                // Creamos los botones de cancelar
                let butCancelar = document.createElement('button');
                butCancelar.type = 'button';
                butCancelar.innerHTML = 'Cancel·la';
                butCancelar.className = "butCancelar";
                butCancelar.addEventListener('click', function () {
                    document.getElementById('divGestio').remove();
                    [].forEach.call(categoria, function (item) {
                        item.draggable = true;
                    });
                    contador = 0;
                });

                // Creamos el boton de crear clase
                let butCrearClase = document.createElement('button');
                butCrearClase.type = 'submit';
                butCrearClase.innerHTML = 'Crear classe';
                butCrearClase.className = "butUnirseClase";

                divForm.appendChild(form);

                form.appendChild(inProfessor);
                form.appendChild(br2);
                form.appendChild(labCategoria);
                form.appendChild(br);
                form.appendChild(inCategoria);
                form.appendChild(br3);
                form.appendChild(inDescripcio);
                form.appendChild(br4);
                form.appendChild(inHorari);
                form.appendChild(br5);
                form.appendChild(inDuracio);
                form.appendChild(br6);
                form.appendChild(butCancelar);
                form.appendChild(butCrearClase);
                form.appendChild(inColumna);
                form.appendChild(inFila);
                form.appendChild(inSrc);
                document.body.appendChild(divForm);
                if (ctx.isPointInPath(dia, ev.offsetX, ev.offsetY)) {
                    console.log("dia " + (a + 1));
                    break;
                }
            }
        }
    }
    // PARANORMAL ACIVITY

    function dibuixaClassesMongo() {
        console.log("usuari: " + usuari);
        let request = new XMLHttpRequest();
        request.open('GET', '/classes');
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            let classes = request.response;
            console.log(classes);
            let ctx = document.getElementById("tauler").getContext("2d");
            for (let i = 0; i < classes.length; i++) {
                let columna = classes[i].columna;
                let fila = classes[i].fila;
                let src = classes[i].src;
                dibuixarFigura(ctx, src, columna, fila);
            }
        }
    }

}
window.addEventListener("load", load, false);