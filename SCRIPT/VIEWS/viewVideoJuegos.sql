
IF EXISTS(select * FROM sys.views where name = 'viewVideoJuegos') 
BEGIN
	DROP VIEW [viewVideoJuegos]
END
GO


CREATE VIEW [dbo].[viewVideoJuegos]
AS
	SELECT 
        A.Id,
        A.titulo,
        A.descripcion,
        A.anio,
        A.calificacion,
        A.idConsola,
        A.idGenero,
        B.nombre AS nombreConsola,
        C.nombre AS nombreGenero
    FROM VideoJuegos A
    INNER JOIN Consolas B ON B.id = A.idConsola
    INNER JOIN Generos C ON C.id = A.idGenero

GO

