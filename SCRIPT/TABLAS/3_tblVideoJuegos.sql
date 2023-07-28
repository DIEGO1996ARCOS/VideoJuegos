

CREATE TABLE [dbo].[VideoJuegos](
	[Id] [int] PRIMARY KEY IDENTITY(1,1) NOT NULL,
	[titulo] [nvarchar](200) NOT NULL,
	[descripcion] [nvarchar](max) NOT NULL,
	[anio] [int] NOT NULL,
	[calificacion] [int] NOT NULL,
	[IdConsola] [int] NULL,
	[IdGenero] [int] NULL,
	FOREIGN KEY(IdConsola) REFERENCES Consolas(Id),
	FOREIGN KEY(IdGenero) REFERENCES Generos(Id)
)

