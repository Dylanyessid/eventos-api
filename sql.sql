-- Create roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    deleted_at TIMESTAMP DEFAULT NULL  -- Soft delete timestamp
);



-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL  -- Soft delete timestamp
);

CREATE TABLE user_roles (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Create events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    location VARCHAR(200),
    capacity INT,
    deleted_at TIMESTAMP DEFAULT NULL  -- Soft delete timestamp
);

-- Create junction table for the many-to-many relationship between users and events (Enroll)
CREATE TABLE enroll (
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Create comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    valuation INT CHECK (valuation >= 1 AND valuation <= 5),  -- Example: rating between 1 and 5
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,  -- Soft delete timestamp
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);



INSERT INTO roles (name) VALUES ('admin');
INSERT INTO roles (name) VALUES ('organizer');
INSERT INTO roles (name) VALUES ('user');