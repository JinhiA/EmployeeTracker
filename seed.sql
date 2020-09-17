Use employee_trackerDB; 

//Department seeds
INSERT INTO department (name)
VALUES ("Sales"); 

INSERT INTO department (name)
VALUES ("Engineering"); 

INSERT INTO department (name)
VALUES ("Finance"); 

INSERT INTO department (name)
VALUES ("Legal");

//Employee role seeds

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 10000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 12000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 140000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 160000, 2); 

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 180000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 200000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 240000, 4);

//Employee seeds
INSERT INTO employee (first_name, last_name, role_id)
