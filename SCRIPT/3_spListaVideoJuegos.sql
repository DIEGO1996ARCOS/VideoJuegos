IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spListaVideoJuegos]') AND type in (N'P', N'PC'))
BEGIN
	EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[spListaVideoJuegos] AS' 
END
GO

ALTER PROCEDURE spListaVideoJuegos
AS 
BEGIN
	select * from viewVideoJuegos
END
GO

