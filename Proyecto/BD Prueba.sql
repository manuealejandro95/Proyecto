IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'PRUEBA')
BEGIN
	CREATE DATABASE PRUEBA;
END
USE [PRUEBA]
GO
/****** Object:  Table [dbo].[Person]    Script Date: 31/08/2022 15:40:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Person](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NULL,
	[FechaNac] [date] NULL,
	[Sexo] [char](1) NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Person] ON 

INSERT [dbo].[Person] ([Id], [Nombre], [FechaNac], [Sexo]) VALUES (5, N'Manuel Alejandro Pacheco Zapata', CAST(N'1995-04-22' AS Date), N'M')
INSERT [dbo].[Person] ([Id], [Nombre], [FechaNac], [Sexo]) VALUES (6, N'Manuel Alejandro Pacheco Zapata', CAST(N'1995-04-22' AS Date), N'M')
INSERT [dbo].[Person] ([Id], [Nombre], [FechaNac], [Sexo]) VALUES (9, N'Pepito Perez', CAST(N'1998-04-22' AS Date), N'M')
SET IDENTITY_INSERT [dbo].[Person] OFF
GO
/****** Object:  StoredProcedure [dbo].[CRUDPERSON]    Script Date: 31/08/2022 15:40:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<MANUEL PACHECO>
-- Create date: <30/08/2022>
-- Description:	<CRUD TABLE PERSON>
-- =============================================
CREATE PROCEDURE [dbo].[CRUDPERSON]
	@Id INT,
	@NOMBRE VARCHAR(100),
	@FECHANAC DATE,
	@SEXO VARCHAR(1),
	@ACCION VARCHAR(20)
AS
BEGIN
	IF(@ACCION = 'INSERT')
		BEGIN
			INSERT INTO Person(Nombre,FechaNac,Sexo) VALUES(@NOMBRE,@FECHANAC,@SEXO)
		END
	ELSE IF(@ACCION = 'SEARCH')
		BEGIN
			SELECT Id,Nombre, FORMAT(FechaNac,'dd/MM/yyyy') AS FechaNac, Sexo
			FROM Person
			WHERE Nombre LIKE ''+ @NOMBRE + '%'
			ORDER BY Nombre;
		END
	ELSE IF(@ACCION = 'SEARCHID')
		BEGIN
			SELECT Id, Nombre, FORMAT(FechaNac,'yyyy-MM-dd') AS FechaNac, Sexo
			FROM Person
			WHERE Id=@Id;
		END
	ELSE IF(@ACCION = 'UPDATE')
		BEGIN
			UPDATE Person SET Nombre = @NOMBRE, FechaNac = @FECHANAC, Sexo = @SEXO
			WHERE Id = @Id;
		END
	ELSE IF(@ACCION = 'DELETE')
		BEGIN
			DELETE
			FROM Person
			WHERE Id = @Id;
		END
	ELSE
		BEGIN
			SELECT TOP(10) Id,Nombre, FORMAT(FechaNac,'dd/MM/yyyy') AS FechaNac, Sexo
			FROM Person;
		END
END
GO
