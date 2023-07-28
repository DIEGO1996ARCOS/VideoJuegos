IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spUpdate_VideoJuegos]') AND type in (N'P', N'PC'))
BEGIN
	EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[spUpdate_VideoJuegos] AS' 
END
GO

ALTER PROCEDURE spUpdate_VideoJuegos(
	@id int,
    @titulo NVARCHAR(500),
    @descripcion NVARCHAR(MAX),
    @anio INT,
    @calificacion INT,
    @idConsola INT,
    @idGenero INT
)
AS 
BEGIN
    UPDATE 
		VideoJuegos
	SET titulo = @titulo,
		descripcion = @descripcion,
		anio = @anio,
		calificacion = @calificacion,
		IdConsola = @idConsola,
		IdGenero = @idGenero
	WHERE
		Id = @id
END
GO