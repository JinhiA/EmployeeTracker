const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "employee_trackerDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId); 
  // run the start function after the connection is made to prompt the user
  start();
});

//function to prompt user on what they would like to do
  function start() {
  inquirer.prompt({
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: [
      "Add Department",
      "Add Role",
      "Add Employee",
      "View Departments",
      "View Roles",
      "View Employees",
      "View Employees by Managers",
      "Update Employee Roles",
      "Delete Departments",
      "Delete Roles",
      "Delete Employees",
      "Exit"
    ]
  })
    .then(function(answer) {
      console.log(answer.options)
      switch (answer.options) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "View Departments":
          viewDepartments();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Update Employee Roles":
          updateRole();
          break;
        // case "Delete Department":
        //   deleteDept();
        //   break;
        // case "Delete Role":
        //   deleteRoles();
        //   break;
        // case "Delete Employee":
        //   deleteEmployees();
        //   break;
        case "Exit":
          connection.end();
          break;
      }
    })
}


//function to add dept
function addDepartment() {
  inquirer.prompt({
      name: "addDepartment",
      type: "list",
      message: "What department would you like to add?",
      choices: [
        "Sales", 
        "Engineering", 
        "Finance", 
        "Legal", 
      ]
    }).then(function(answer) {
    connection.query("INSERT INTO department SET ?", { name: answer.addDepartment}, 
      function (err, answer) {
        if (err) {
          throw err;
        } 
        console.log("Department Added!");
        start();
      });
  });
}

//function to add role
function addRole() {
  inquirer.prompt([
    {
      name: "addTitle",
      type: "list",
      message: "What is the title of the employee you want to add?", 
      choices: [
        "Salesperson",
        "Sales Lead",
        "Software Engineer",
        "Lead Engineer",
        "Account Manager",
        "Accountant",
        "Legal Team Lead"
      ]
    },
    {
      name: "addSalary",
      type: "input",
      message: "What is the salary for this role?"
    },
    {
      name: "addDeptId",
      type: "input",
      message: "What is the department id for this role?"
    }
  ]).then(function(answer) {
    connection.query("INSERT INTO role SET ?", { title: answer.addTitle, salary: answer.addSalary, department_id: answer.addDeptId },
      function (err, answer) {
        if (err) {
          throw err;
        }
        console.log("Role Added!");
        start();
      });
  });
}

//function to add employee 
function addEmployee() {
  inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "Enter employee first name"
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter employee last name"
    }
  ]).then(function (answer) {
      connection.query("INSERT INTO employee SET ?", { first_name: answer.firstName, last_name: answer.lastName, role_id: null, manager_id: null },
        function (err, answer) {
          if (err) {
            throw err;
          }
          console.log("Employee Added!");
          start();
        });
    });
}

//function to view all departments 
function viewDepartments() {
  connection.query("SELECT name FROM department", function (err, answer) {
    for( let i = 0; i < result.length; i++); 
    if (err) {
      throw err;
    } else {
    console.log(result); 
    console.table(answer);
    start();
    }
  });
}

//function to view all roles 
function viewRoles() {
  connection.query("SELECT title FROM role", function (err, result) {
    for( let i = 0; i < result.length; i++); 
    if (err) {
      throw err;
    } else {
    console.log(result); 
    console.table(answer);
    start();
    }
  });
}

//function to view all employees
function viewEmployees() {
  connection.query("SELECT first_name FROM employee", function (err, result) {
    for( let i = 0; i < result.length; i++); 
    if (err) {
      throw err;
    } else {
    console.log(result); 
    console.table(answer);
    start();
    }
  });
}

//function to view all employees by managers

//function to update employee roles

//function to update employee managers

//function to delete departments

//function to delete roles

//function to delete employees

