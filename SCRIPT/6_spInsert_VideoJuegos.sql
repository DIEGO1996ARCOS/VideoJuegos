IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spInsert_VideoJuegos]') AND type in (N'P', N'PC'))
BEGIN
	EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[spInsert_VideoJuegos] AS' 
END
GO

ALTER PROCEDURE spInsert_VideoJuegos(
    @titulo NVARCHAR(500),
    @descripcion NVARCHAR(MAX),
    @anio INT,
    @calificacion INT,
    @idConsola INT,
    @idGenero INT
)
AS 
BEGIN
    INSERT INTO VideoJuegos
	VALUES(
		@titulo,
		@descripcion,
		@anio,
		@calificacion,
		@idConsola,
		@idGenero
	)
END
GO