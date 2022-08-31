Imports System.Data.SqlClient
Module Conexion
    Public Function consultaserver(dt As DataTable, cadena As String)
        Dim conexion As New SqlConnection(My.Settings.conexion)
        Dim comand As New SqlCommand(cadena, conexion)
        Dim execute As New SqlDataAdapter(comand)
        Try
            execute.Fill(dt)
            Return dt
        Catch ex As Exception
            MsgBox(ex.ToString)
            Return dt
        End Try
        conexion.Close()
    End Function
End Module
