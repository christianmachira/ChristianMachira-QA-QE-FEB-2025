DELIMITER $$

-- Create stored procedure for inserting a new user
CREATE PROCEDURE CreateUser(
	--input parameters for respective user fields
	IN userName VARCHAR(255),     
	IN userEmail VARCHAR(255),    
	IN userPassword VARCHAR(255)  
)
BEGIN
	-- Insert a new user into the users table
	INSERT INTO users (name, email, password)
	VALUES (userName, userEmail, userPassword);  
END $$

-- Get stored procedure for retrieving a user by their ID
CREATE PROCEDURE GetUser(
	-- Input parameter for the user's ID
	IN userId INT  
)
BEGIN
	-- Select and return details of user with the given ID
	SELECT * FROM users WHERE id = userId;  
END $$

-- Update stored procedure for updating a user's information
CREATE PROCEDURE UpdateUser(
	--Input parameters
	IN userId INT,                 
	IN newName VARCHAR(255),        
	IN newEmail VARCHAR(255),        
	IN newPassword VARCHAR(255)
)      
BEGIN
	-- Update the user based on the provided userId
	UPDATE users
	SET name = newName,             
	email = newEmail,           
	password = newPassword      
	WHERE id = userId;             
END $$

-- Delete stored procedure for deleting a user by their ID
CREATE PROCEDURE DeleteUser(
	--input parameter    
	IN userId INT 
)
BEGIN
    -- Delete the user with the specified ID from users table
    DELETE FROM users WHERE id = userId; 
END $$

-- Combined stored procedure for creating a user and then retrieving that user
CREATE PROCEDURE CreateUserAndGet(
	--input parameters
	IN userName VARCHAR(255),      
	IN userEmail VARCHAR(255),     
	IN userPassword VARCHAR(255)   
)
BEGIN
	-- Insert a new user into the 'users' table
	INSERT INTO users (name, email, password)
	VALUES (userName, userEmail, userPassword);  

	-- Retrieve and return the user just created by their email
	SELECT * FROM users WHERE email = userEmail;  
END $$

DELIMITER ;
