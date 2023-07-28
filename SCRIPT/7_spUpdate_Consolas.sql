IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spUpdate_Consolas]') AND type in (N'P', N'PC'))
BEGIN
	EXEC dbo.sp_executesql @statement = N'CREATE PROCEDURE [dbo].[spUpdate_Consolas] AS' 
END
GO

ALTER PROCEDURE spUpdate_Consolas(
	@ID INT,
    @NOMBRE NVARCHAR(500)
)
AS 
BEGIN
    UPDATE 
		Consolas 
	SET nombre = @NOMBRE
	WHERE
		Id = @ID
END