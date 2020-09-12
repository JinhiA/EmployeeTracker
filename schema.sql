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
  deapartment_id INT AUTO_INCREMENT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL, 
  first_name VARCHAR(30), 
  last_name VARCHAR(30), 
  role_id INT AUTO_INCREMENT NOT NULL, 
  manager_id INT AUTO_INCREMENT NULL, 
);