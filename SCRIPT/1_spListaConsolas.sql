IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spListaConsolas]') AND type in (N'P', N'PC'))
BEGIN
	EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[spListaConsolas] AS' 
END
GO

ALTER PROCEDURE spListaConsolas
AS
BEGIN
    SELECT 
		* 
	FROM 
		Consolas
	order by id DESC
END
GO

