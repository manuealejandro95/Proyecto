Public Class _default
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    <System.Web.Services.WebMethod()>
    Public Shared Function Insertar(nombre As String, fecha As String, sexo As String)
        Dim cadena As String
        Dim dtinsert As New DataTable
        dtinsert.Rows.Clear()
        cadena = ""
        cadena = "EXECUTE CRUDPERSON '','" & nombre & "','" & fecha & "','" & sexo & "','INSERT'"

        Try
            dtinsert = consultaserver(dtinsert, cadena)
            Return 1
        Catch ex As Exception
            Return 0
        End Try
    End Function
End Class