-- ENUM for user roles
CREATE TYPE user_role AS ENUM ('Admin', 'Librarian', 'Borrower');

-- ENUM for borrow status
CREATE TYPE borrow_status AS ENUM ('Borrowed', 'Returned', 'Overdue');

-- Table for user roles
CREATE TABLE USER_ROLES (
    role_id SERIAL PRIMARY KEY,
    role_name user_role NOT NULL UNIQUE
);

-- Table for users
CREATE TABLE USERS (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES USER_ROLES(role_id) ON DELETE CASCADE
);

-- Table for books
CREATE TABLE BOOKS (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    year INT CHECK (year BETWEEN 1000 AND EXTRACT(YEAR FROM CURRENT_DATE)), -- Ensures valid year
    pages INT CHECK (pages > 0),
    publisher VARCHAR(100),
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10,2) CHECK (price >= 0),
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES USERS(user_id) ON DELETE SET NULL
);

-- Create trigger to auto-update 'updated_at' column
CREATE FUNCTION update_updated_at_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_book
BEFORE UPDATE ON BOOKS
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Table for borrow transactions
CREATE TABLE BORROWERS (
    borrower_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL, -- Borrower
    book_id INT NOT NULL,
    librarian_id INT NOT NULL, -- Librarian who authorized
    borrow_date DATE DEFAULT CURRENT_DATE NOT NULL,
    return_date DATE,
    status borrow_status NOT NULL DEFAULT 'Borrowed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(user_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES BOOKS(book_id) ON DELETE CASCADE,
    FOREIGN KEY (librarian_id) REFERENCES USERS(user_id) ON DELETE SET NULL
);