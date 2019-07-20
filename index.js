$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAr7N0qsyu86X0joYoVpLAH67e7pAnVxeg",
  authDomain: "pedas10.firebaseapp.com",
  projectId: "pedas10"
});

var db = firebase.firestore();

function guardar() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;

  db.collection("Firmes")
    .add({
      nombre: nombre,
      apellido: apellido
    })
    .then(function() {
      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      $("#confirmarModal").modal();
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

/*-----------LEER --------------*/
var tabla = document.getElementById("tabla");

db.collection("Firmes").onSnapshot(querySnapshot => {
  tabla.innerHTML = "";
  querySnapshot.forEach(doc => {
    tabla.innerHTML += `
      <tr>
      <td scope="row">${doc.data().nombre}</td>
      <td>${doc.data().apellido}</td>
      <td><button class="btn btn-danger" onClick="eliminar('${
        doc.id
      }')">Eliminar</button></td>
      <td><a class="btn btn-warning" onClick="editar('${doc.id}', '${
      doc.data().nombre
    }', '${doc.data().apellido}')">Editar</a></td>
    </tr>`;
  });
});
/*-----------LEER --------------*/

function eliminar(id) {
  db.collection("Firmes")
    .doc(id)
    .delete()
    .then(function() {})
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

function editar(id, nombre, apellido) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("apellido").value = apellido;
  var boton = document.getElementById("b-confirmar");
  boton.innerHTML = "Editar";

  var modal = $("#confirmarModal");
  modal.modal("hide"); //start hiding

  setTimeout(function() {
    location.href = "#confirmar";
  }, 500);

  boton.onclick = function() {
    var user = db.collection("Firmes").doc(id);

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;

    return user
      .update({
        nombre: nombre,
        apellido: apellido
      })
      .then(function() {
        boton.innerHTML = "Guardar";
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        $("#confirmarModal").modal();
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
  // Set the "capital" field of the city 'DC'
}
