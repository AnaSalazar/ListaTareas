var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};
var $tasksList = $("#tasks-list");

var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
    tareas.forEach(crearTarea);
  });
}

var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  // creamos la fila
  var $tr = $("<tr />");
  // creamos la celda del nombre
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  // creamos la celda del estado
  var $estadoTd = $("<td />");
  $estadoTd.text(estado);
  // creamos las celda de las Acciones
  var $accionTd = $("<td />");
  // creamos los respectivos span con sus atributos,clases...
  var zoom = $("<span />");
  zoom.addClass("glyphicon glyphicon-zoom-in espacioIconos");
  var pencil = $("<span />");
  pencil.addClass("glyphicon glyphicon-pencil espacioIconos");
  var remove = $("<span />");
  remove.addClass("glyphicon glyphicon-remove-circle espacioIconos");
  remove.click(function(){
    $tr.css("display", "none");
  });
  // agregamos los span a la celda
  $accionTd.append(zoom);
  $accionTd.append(pencil);
  $accionTd.append(remove);
  // agregamos las celdas a la fila
  $tr.append($nombreTd);
  $tr.append($estadoTd);
  $tr.append($accionTd);
  // agregamos filas a la tabla
  $tasksList.append($tr);
};

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
  });
};

$(document).ready(cargarPagina);
