var tabla;

function init(){
    $("#producto_form").on("submit", function(e){
        guardaryeditar(e);
    });

};

$(document).ready(function(){ 

    tabla=$('#producto_data').dataTable({
		"aProcessing": true,//Activamos el procesamiento del datatables
	    "aServerSide": true,//Paginación y filtrado realizados por el servidor
	    dom: 'Bfrtip',//Definimos los elementos del control de tabla
	    buttons: [
		            'copyHtml5',
		            'excelHtml5',
		            'csvHtml5',
		            'pdf'
		        ],
        "ajax":{
            url: '../../controller/productocontrolador.php?op=listar',
            type : "get",
            dataType : "json",
            error: function(e){
                console.log(e.responseText);	
            }
        },
		"bDestroy": true,
		"responsive": true,
		"bInfo":true,
		"iDisplayLength": 5,//Por cada 10 registros hace una paginación
	    "order": [[ 0, "asc" ]],//Ordenar (columna,orden)
	    "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar MENU registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando un total de TOTAL registros",
            "sInfoEmpty":      "Mostrando un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de MAX registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
		}
	}).DataTable();
});

function guardaryeditar(e) {
    e.preventDefault();
    var formData = new FormData($("#producto_form")[0]);
    $.ajax({
        url: "../../controller/productocontrolador.php?op=guardaryeditar",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos){
            console.log(datos);
            $('#producto_form')[0].reset();
            $('#modalmantenimiento').modal('hide');
            $('#producto_data').DataTable().ajax.reload();

            swal.fire(
                'Registrado!',
                'Se Registro Correctamen.',
              'success'
            );
        }
    });
}

//se edita si hay nuebo campo
function editar(prod_id){
    $('#mdltitulo').html('Editar Registro');

    $.post("../../controller/productocontrolador.php?op=mostrar",{prod_id:prod_id}, function(data){
        data = JSON.parse(data);
        $('#prod_id').val(data.prod_id);
        $('#prod_nom').val(data.prod_nom);
        $('#prod_desc').val(data.prod_desc);
    });

    $('#modalmantenimiento').modal('show');
    //console.log(prod_id);
}

function ver(prod_id) {
    $('#mdltitulo').html('Ver Registro');

    $.post("../../controller/productocontrolador.php?op=mostrar",{prod_id:prod_id}, function(data){
        data = JSON.parse(data);
        $('#prod_id').val(data.prod_id);
        $('#prod_nom').val(data.prod_nom);
        $('#prod_desc').val(data.prod_desc);
    });

    $('#modalmantenimiento').modal('show');
    ocultarcampos();
}

function ocultarcampos(){
    $('#prod_id').attr("readonly","readonly");
    $('#prod_nom').attr("readonly","readonly");
    $('#prod_desc').attr("readonly","readonly");
}

function eliminar(prod_id){
    swal.fire({
        title: 'CRUD',
        text: "Desea Eliminar el Registro?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result)=>{
        if(result.isConfirmed){
            $.post("../../controller/productocontrolador.php?op=eliminar",{prod_id:prod_id}, function(data){

            });

            $('#producto_data').DataTable().ajax.reload();  

            swal.fire(
                'Eliminado!',
                'El registro ha sido eliminado.',
              'success'
            )
        }
    })
}

$(document).on("click", "#btnnuevo", function(){
    $('#mdltitulo').html('Nuevo registro');
    $('#producto_form')[0].reset();
    $('#prod_id').val('');
    $('#modalmantenimiento').modal('show');
});

init();