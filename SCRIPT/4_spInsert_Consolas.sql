IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spInsert_Consolas]') AND type in (N'P', N'PC'))
BEGIN
	EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[spInsert_Consolas] AS' 
END
GO

ALTER PROCEDURE spInsert_Consolas(
    @NOMBRE NVARCHAR(500)
)
AS 
BEGIN
    INSERT INTO Consolas
    VALUES(
        @NOMBRE
	)
END