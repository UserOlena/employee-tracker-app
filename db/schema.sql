DROP DATABASE IF EXISTS bootcamp_employees_db;
CREATE DATABASE bootcamp_employees_db;

USE bootcamp_employees_db;

CREATE TABLE department (
    id CHAR(36) NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id CHAR(36) NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id CHAR(36),
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id CHAR(36) NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id CHAR(36),
    manager_id CHAR(36),
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
);