DROP DATABASE IF EXISTS employee_trackerDB; 

CREATE DATABASE employee_trackerDB; 

USE employee_trackerDB; 

CREATE TABLE departments (
  id INT AUTO_INCREMENT NOT NULL, 
  name VARCHAR(30) NULL, 
  PRIMARY KEY (id)
); 

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL, 
  title VARCHAR(30) NULL, 
  salary DECIMAL(10,4) NULL, 
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENENCES department_id ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL, 
  first_name VARCHAR(30), 
  last_name VARCHAR(30), 
  role_id INT NOT NULL, 
  manager_id INT NULL, 
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENENCES role_id ON DELETE CASCADE, 
  FOREIGN KEY (manager_id) REFERENENCES manager_id ON DELETE CASCADE
);