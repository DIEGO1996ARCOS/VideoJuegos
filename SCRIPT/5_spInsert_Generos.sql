IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spInsert_Generos]') AND type in (N'P', N'PC'))
BEGIN
	EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[spInsert_Generos] AS' 
END
GO

ALTER PROCEDURE spInsert_Generos(
    @NOMBRE NVARCHAR(500)
)
AS 
BEGIN
    INSERT INTO Generos
    VALUES(
        @NOMBRE
	)
END
GO