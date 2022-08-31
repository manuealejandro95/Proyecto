<%@ Page Language="vb" AutoEventWireup="false" CodeBehind="usuario.aspx.vb" Inherits="Proyecto._default" %>

<!DOCTYPE html>

<html>
<head runat="server">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta http-equiv="Expires" content="0" />
    <meta http-equiv="Last-Modified" content="0" />
    <meta http-equiv="Cache-Control" content="no-cache, mustrevalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <title>Prueba</title>

    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/crud.js"></script>
    <script src="js/sweetalert2.all.min.js"></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="consultas.aspx">Registros</a>
      </li>
    </ul>
  </div>
</nav>
<div class="container">
    <div class="row mt-4">
        <div class="col">
            <form method="POST" id="formu">
                <div class="row p-1">
                    <div class="col-12 text-center">
                        <h2>FORMULARIO DE REGISTRO DE USUARIO</h2>
                    </div>
                </div>               
                <div class="form-row justify-content-center">
                    <div class="form-group col-md-4">
                        <label for="inputEmail4">Nombres y apellidos</label>
                        <input type="text" class="form-control" name="name" id="name">
                    </div>
                    <div class="form-group col-md-6" id="nombres">
                        <label for="inputEmail4">Fecha Nacimiento</label>
                        <input type="date" class="form-control" name="fechnac" id="fechnac">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="sexo">Sexo</label>
                        <select id="sexo" name="sexo" class="form-control">
                            <option value="" selected>Seleccione el Sexo</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>                             
                </div>
                <div class="row justify-content-center mb-3">
                    <div class="col-6 col-sm-6 col-xl-6">
                        <button id="enviar" class="btn btn-lg btn-block btn-primary">Registrar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>
