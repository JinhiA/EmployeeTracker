Use employee_trackerDB; 

//Department seeds
INSERT INTO department (name)
VALUE ("Sales"), ("Engineering"), ("Finance"), ("Legal");

//Employee role seeds
INSERT INTO role (title, salary, department_id)
("Software Engineer", 120000, 1), ("Lead Engineer", 150000, 1), ("Sales Person", 80000, 2), ("Sales Lead", 100000, 2),("Accountant", 125000, 3), ("Lawyer", 190000, 4), ("Legal Team Lead", 250000, 4);

//Employee seeds
INSERT INTO employee (first_name, last_name, role_id, manager_id)

//Selectors 
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;