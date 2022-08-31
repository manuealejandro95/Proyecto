Public Class consultas
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub
    <System.Web.Services.WebMethod()>
    Public Shared Function Read()
        Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
        serializer.MaxJsonLength = Integer.MaxValue
        Dim rows As New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object) = Nothing

        Dim cadena As String
        Dim dtread As New DataTable
        cadena = ""
        cadena = "EXECUTE CRUDPERSON '','','','',''"

        dtread.Rows.Clear()
        dtread = consultaserver(dtread, cadena)
        If dtread.Rows.Count > 0 Then
            For Each dr As DataRow In dtread.Rows
                row = New Dictionary(Of String, Object)()
                For Each dc As DataColumn In dtread.Columns
                    row.Add(dc.ColumnName.Trim(), dr(dc))
                Next
                rows.Add(row)
            Next
            Return serializer.Serialize(rows)
        End If

    End Function

    <System.Web.Services.WebMethod()>
    Public Shared Function Search(Nombre As String)
        Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
        serializer.MaxJsonLength = Integer.MaxValue
        Dim rows As New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object) = Nothing

        Dim cadena As String
        Dim dtread As New DataTable
        cadena = ""
        cadena = "EXECUTE CRUDPERSON '','" & Nombre & "','','','SEARCH'"

        dtread.Rows.Clear()
        dtread = consultaserver(dtread, cadena)
        If dtread.Rows.Count > 0 Then
            For Each dr As DataRow In dtread.Rows
                row = New Dictionary(Of String, Object)()
                For Each dc As DataColumn In dtread.Columns
                    row.Add(dc.ColumnName.Trim(), dr(dc))
                Next
                rows.Add(row)
            Next
            Return serializer.Serialize(rows)
        End If

    End Function

    <System.Web.Services.WebMethod()>
    Public Shared Function SearchID(id As String)
        Dim serializer As New System.Web.Script.Serialization.JavaScriptSerializer()
        serializer.MaxJsonLength = Integer.MaxValue
        Dim rows As New List(Of Dictionary(Of String, Object))()
        Dim row As Dictionary(Of String, Object) = Nothing

        Dim cadena As String
        Dim dtread As New DataTable
        cadena = ""
        cadena = "EXECUTE CRUDPERSON '" & id & "','','','','SEARCHID'"

        dtread.Rows.Clear()
        dtread = consultaserver(dtread, cadena)
        If dtread.Rows.Count > 0 Then
            For Each dr As DataRow In dtread.Rows
                row = New Dictionary(Of String, Object)()
                For Each dc As DataColumn In dtread.Columns
                    row.Add(dc.ColumnName.Trim(), dr(dc))
                Next
                rows.Add(row)
            Next
            Return serializer.Serialize(rows)
        End If

    End Function

    <System.Web.Services.WebMethod()>
    Public Shared Function Update(id As String, nombre As String, fecha As String, sexo As String)
        Dim cadena As String
        Dim dtinsert As New DataTable
        dtinsert.Rows.Clear()
        cadena = ""
        cadena = "EXECUTE CRUDPERSON '" & id & "','" & nombre & "','" & fecha & "','" & sexo & "','UPDATE'"

        Try
            dtinsert = consultaserver(dtinsert, cadena)
            Return 1
        Catch ex As Exception
            Return 0
        End Try
    End Function

    <System.Web.Services.WebMethod()>
    Public Shared Function Delete(id As String)
        Dim cadena As String
        Dim dtinsert As New DataTable
        dtinsert.Rows.Clear()
        cadena = ""
        cadena = "EXECUTE CRUDPERSON '" & id & "','','','','DELETE'"

        Try
            dtinsert = consultaserver(dtinsert, cadena)
            Return 1
        Catch ex As Exception
            Return 0
        End Try
    End Function

End Class