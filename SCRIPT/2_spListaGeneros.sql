IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spListaGeneros]') AND type in (N'P', N'PC'))
BEGIN
	EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[spListaGeneros] AS' 
END
GO

ALTER PROCEDURE spListaGeneros
AS
BEGIN
    SELECT * FROM Generos order by id DESC
END
GO