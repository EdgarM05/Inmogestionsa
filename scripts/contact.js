
const persona = {
    id: 0,
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    pais: '',
    ciudad: ''
}

function contactForm(e) {
    persona.nombres = document.forms["fcontact"]["fnombres"].value;
    persona.apellidos = document.forms["fcontact"]["fapellidos"].value;
    persona.telefono = document.forms["fcontact"]["fnumero"].value;
    persona.email = document.forms["fcontact"]["fcorreo"].value;
    persona.pais = document.forms["fcontact"]["fpais"].value;
    persona.ciudad = document.forms["fcontact"]["fciudad"].value;
    
    if (persona.id <= 0){
        persona.id = new Date().valueOf();
    }

    let personaJson = JSON.stringify(persona);
    localStorage.setItem(persona.id, personaJson);

    e.preventDefault();
    alert("Datos guardados con éxito");
    listarContactos();
    resetForm();
}

function resetForm() {
    document.forms["fcontact"].reset();
    persona.id = 0;
}

function listarContactos() {

    let dinamicTable = "";

    dinamicTable += "<table class='table'>";
    dinamicTable += "<tr>";
    dinamicTable += "<th>ID</th>";
    dinamicTable += "<th>Nombre(s)</th>";
    dinamicTable += "<th>Apellidos</th>";
    dinamicTable += "<th>No. Telefónico</th>";
    dinamicTable += "<th>Correo</th>";
    dinamicTable += "<th>Acción</th>";
    dinamicTable += "</tr>";

    let personasGuardadas = [];
    personasGuardadas = allStorage();

    for (let i = 0; i < personasGuardadas.length; i++) {
        dinamicTable += "<tr>";
        let personaObjeto = JSON.parse(personasGuardadas[i]);

        dinamicTable += "<td>";
        dinamicTable += personaObjeto.id;
        dinamicTable += "</td>";
        dinamicTable += "<td>";
        dinamicTable += personaObjeto.nombres;
        dinamicTable += "</td>";
        dinamicTable += "<td>";
        dinamicTable += personaObjeto.apellidos;
        dinamicTable += "</td>";
        dinamicTable += "<td>"; 
        dinamicTable += personaObjeto.telefono;
        dinamicTable += "</td>";
        dinamicTable += "<td>"; 
        dinamicTable += personaObjeto.email;
        dinamicTable += "</td>";
        dinamicTable += "<td>";
        dinamicTable += '<a href="detalles.html?id=' + personaObjeto.id + '">Ver</a>';
        dinamicTable += "</td>";
        dinamicTable += "<td>";
        dinamicTable += '<a href="javascript:editarContacto(' + personaObjeto.id + ');">Editar</a>';
        dinamicTable += "</td>";
        dinamicTable += "<td>";
        dinamicTable += '<a href="javascript:eliminarContacto(' + personaObjeto.id + ');">Eliminar</a>';
        dinamicTable += "</td>";
        dinamicTable += "</tr>";
    }

    dinamicTable += "</table>";

    document.getElementById("tableContact").innerHTML = dinamicTable;
}

function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }
    return values;
}

function verDetalles() {
    let contactoId = obtenerParametroUrl();
    let contacto = localStorage.getItem(contactoId);
    if (contacto.length > 0) {
        let personaObjeto = JSON.parse(contacto);
        document.getElementById('onames').innerText = personaObjeto.nombres;
        document.getElementById('osurnames').innerText = personaObjeto.apellidos;
        document.getElementById('ophone').innerText = personaObjeto.telefono;
        document.getElementById('oemail').innerText = personaObjeto.email;
        document.getElementById('ocountry').innerText = personaObjeto.pais;
        document.getElementById('ocity').innerText = personaObjeto.ciudad;
    }
}

function editarContacto(id) {
    let contacto = localStorage.getItem(id);
    if (contacto.length > 0) {
        let personaObjeto = JSON.parse(contacto);
        document.getElementById('fnombres').value = personaObjeto.nombres;
        document.getElementById('fapellidos').value = personaObjeto.apellidos;
        document.getElementById('fnumero').value = personaObjeto.telefono;
        document.getElementById('fcorreo').value = personaObjeto.email;
        document.getElementById('fpais').value = personaObjeto.pais;
        document.getElementById('fciudad').value = personaObjeto.ciudad;
        persona.id = id;
    }
    listarContactos();
}

function eliminarContacto(id) {
    let contacto = localStorage.getItem(id);
    if (contacto.length > 0) {
        localStorage.removeItem(id);
        alert('Contacto eliminado con éxito');
    }
    listarContactos();
}

function obtenerParametroUrl() {
    let url = window.location.href,
        paramString = url.split('?')[1],
        queryString = new URLSearchParams(paramString),
        parameterID = 0;

    for (let pair of queryString.entries()) {
        console.log('Key is: ' + pair[0]);
        console.log('Value is: ' + pair[1]);
        parameterID = Number(pair[1]);
    }
    return parameterID;
}