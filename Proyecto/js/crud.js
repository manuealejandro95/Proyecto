$(document).ready(function () {
    $('#formu').submit(function (e) {
        e.preventDefault();
        validaciones(1);
    });

    $('#formuproducto').submit(function (e) {
        e.preventDefault();
        validaciones(2);
    });

    read();

    $("#search").keyup(function () {
        let datos = { Nombre: $('#search').val() }
        Search(datos);
    });
});
function validaciones(accion) {
    switch (true) {
        case $("#name").val().length === 0:
            Swal.fire({
                title: '<strong>Error</strong>',
                icon: 'error',
                html: '<p class="text-danger font-weight-bold">Campo Nombre vacio.</p>',
                showConfirmButton: false,
                timer: 5500,
                returnFocus: false
            });
            $("#name").focus();
            break;
        case $("#fechnac").val().length === 0:
            Swal.fire({
                title: '<strong>Error</strong>',
                icon: 'error',
                html: '<p class="text-danger font-weight-bold">Debe escribir una fecha de nacimiento.</p>',
                showConfirmButton: false,
                timer: 5500,
                returnFocus: false
            });
            $('#fechnac').focus();
            break;
        case $("#sexo").val().length === 0:
            Swal.fire({
                title: '<strong>Error</strong>',
                icon: 'error',
                html: '<p class="text-danger font-weight-bold">Debe seleccionar un sexo.</p>',
                showConfirmButton: false,
                timer: 5500,
                returnFocus: false
            });
            $('#sexo').focus();
            break;
        default:           

            if (accion == 2) {
                let datos = { id: $('#id').val(), nombre: $('#name').val(), fecha: $('#fechnac').val(), sexo: $('#sexo').val() };
                Update(datos);
            } else {
                let datos = { nombre: $('#name').val(), fecha: $('#fechnac').val(), sexo: $('#sexo').val() };
                inserta(datos);
            }           
    }
}

function Search(datos) {
    $.ajax({
        url: "consultas.aspx/Search",
        method: "POST",
        data: JSON.stringify(datos),
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (resultado) {
            let template = ``;
            let datos = JSON.parse(resultado.d);
            if (resultado.d != null) {
                datos.forEach(dato => {
                    template += `                                
                                    <tr>
                                        <td>${dato.Nombre}</td>
                                        <td>${dato.FechaNac}</td>
                                        <td>${dato.Sexo}</td>
                                        <td><p><a class="btn btn-danger text-white" onclick="Delete(${dato.Id});" role="button">Eliminar</a> <a class="btn btn-info text-white" onclick="findeditar(${dato.Id});" role="button">Editar</a></p></td>
                                    </tr>                        
                        `
                });
            } else {
                read();
            }
            $('#listado').html(template);
        }
    });
}


function inserta(datos) {
    $.ajax({
        url: "usuario.aspx/Insertar",
        method: "POST",
        data: JSON.stringify(datos),
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (respuesta) {
            console.log(respuesta.d);
            switch (respuesta.d) {
                case 1:
                    Swal.fire({
                        title: '<strong>Registro Exitoso</strong>',
                        icon: 'success',
                        html: '<p class="text-success font-weight-bold">Registro Exitoso.</p>',
                        showConfirmButton: false,
                        timer: 5000,
                        returnFocus: false
                    });
                    document.getElementById("formu").reset();
                    window.setTimeout(function () {
                        window.location.href = "/usuario.aspx";
                    }, 6000)
                    break;
                case 0:
                    Swal.fire({
                        title: '<strong>Información</strong>',
                        icon: 'info',
                        html: '<p class="text-danger font-weight-bold">Error al guardar. </p>',
                        showConfirmButton: false,
                        timer: 7000,
                        returnFocus: false
                    });
                    document.getElementById("formu").reset();
                    window.setTimeout(function () {
                        window.location.href = "/usuario.aspx";
                    }, 8000)
                    break;
            }
        }
    });
}

function read() {
    $.ajax({
        url: "consultas.aspx/Read",
        method: "POST",
        data: null,
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (resultado) {
            let template = ``;
            let datos = JSON.parse(resultado.d);
            if (resultado.d != null) {
                datos.forEach(dato => {
                    template += `                                
                                    <tr>
                                        <td>${dato.Nombre}</td>
                                        <td>${dato.FechaNac}</td>
                                        <td>${dato.Sexo}</td>
                                        <td><p><a class="btn btn-danger text-white" onclick="Delete(${dato.Id});" role="button">Eliminar</a> <a class="btn btn-info text-white" onclick="findeditar(${dato.Id});" role="button">Editar</a></p></td>
                                    </tr>                        
                        `
                });
            }
            $('#listado').html(template);
        }
    });
}

function findeditar(dato) {
    document.getElementById("formuproducto").reset();
    $('#exampleModalScrollable').modal('show');
    let datos = { id: dato };
    $.ajax({
        url: "consultas.aspx/SearchID",
        method: "POST",
        data: JSON.stringify(datos),
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (respuesta) {
            let datos = JSON.parse(respuesta.d);
            if (respuesta.d == null) {
            } else {
                datos.forEach(dato => {
                    //console.log(dato.FechaNac)
                    $('#id').val(dato.Id);
                    $('#name').val(dato.Nombre);
                    $('#fechnac').val(dato.FechaNac);
                    $('#sexo').val(dato.Sexo);
                });
            }
        }
    });
}

function Update(datos) {
    $.ajax({
        url: "consultas.aspx/Update",
        method: "POST",
        data: JSON.stringify(datos),
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: true,
        success: function (respuesta) {
            console.log(respuesta.d);
            switch (respuesta.d) {
                case 1:
                    Swal.fire({
                        title: '<strong>Actualizacion Exitoso</strong>',
                        icon: 'success',
                        html: '<p class="text-success font-weight-bold">Registro Exitoso.</p>',
                        showConfirmButton: false,
                        timer: 5000,
                        returnFocus: false
                    });
                    document.getElementById("formuproducto").reset();
                    window.setTimeout(function () {
                        window.location.href = "/consultas.aspx";
                    }, 6000)
                    break;
                case 0:
                    Swal.fire({
                        title: '<strong>Información</strong>',
                        icon: 'info',
                        html: '<p class="text-danger font-weight-bold">Error al guardar. </p>',
                        showConfirmButton: false,
                        timer: 7000,
                        returnFocus: false
                    });
                    document.getElementById("formuproducto").reset();
                    window.setTimeout(function () {
                        window.location.href = "/consultas.aspx";
                    }, 8000)
                    break;
            }
        }
    });
}

function Delete(dato) {
    Swal.fire({
        title: 'Esta seguro?',
        text: "Desea eliminar este producto! " + dato,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            let datos = { id: dato }
            $.ajax({
                url: "consultas.aspx/Delete",
                method: "POST",
                data: JSON.stringify(datos),
                cache: false,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: true,
                success: function (respuesta) {
                    console.log(respuesta);
                    switch (respuesta.d) {
                        case 1:
                            Swal.fire({
                                title: '<strong>Registro Exitoso</strong>',
                                icon: 'success',
                                html: '<p class="text-success font-weight-bold">El registro ha sido eliminado.</p>',
                                showConfirmButton: false,
                                timer: 5000,
                                returnFocus: false
                            });
                            read();
                            window.setTimeout(function () {
                                window.location.href = "/consultas.aspx";
                            }, 6000)
                            break;
                        default:
                            Swal.fire({
                                title: '<strong>Error</strong>',
                                icon: 'error',
                                html: '<p class="text-danger font-weight-bold">No se pudo eliminar el registro.</p>',
                                showConfirmButton: false,
                                timer: 7000,
                                returnFocus: false
                            });
                    }
                }
            });
        }
    })
}