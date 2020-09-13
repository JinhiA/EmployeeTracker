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
  // run the start function after the connection is made to prompt the user
  start();
});

//function to prompt user on what they would like to do
function start() {
  inquirer.prompt({
    type: "list",
    name: "choice",
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
      "Update Employee Managers",
      "Delete Departments",
      "Delete Roles",
      "Delete Employees",
      "View Budget by Department",
      "Exit"
    ]
  })
    .then(function (answer) {
      console.log(answer.action);
      switch (answer.action) {
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
          viewDept();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "View Employees by Managers":
          viewByManagers();
          break;
        case "Update Employee Roles":
          updateRole();
          break;
        case "Update Employee Managers":
          updateManager();
          break;
        case "Delete Departments":
          deleteDept();
          break;
        case "Delete Roles":
          deleteRoles();
          break;
        case "Delete Employees":
          deleteEmployees();
          break;
        case "View Budget by Department":
          viewBudgetByDept();
          break;
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
    type: "input",
    message: "What department would you like to add?"
  }).then((answer) => {
    connection.query("INSERT INTO department SET ?", { name: answer.addDepartment}, (err, res) => {
      if (err) return err;
      console.log("\n DEPARTMENT ADDED...\n ");
      console.table(answer); 
      start();
    });
  });
}

//function to add role
function addRole() {
    inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "What role would you like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?"
      },
      {
        name: "department",
        type: "input",
        message: "What is the department name for this role?"
      }
    ]).then((answer) => {
    connection.query("INSERT INTO role SET ?", { title: answer.add, salary: answer.addsalary, department_id: answer.addDeptId}, (err, res) => {
      if (err) return err;
      console.log("\n DEPARTMENT ADDED...\n ");
      console.table(answer); 
      start();
    });
  });
}

//function to add employee 

//function to view all departments 

//function to view all roles

//function to view all employees

//function to view all employees by managers

//function to update employee roles

//function to update employee managers

//function to delete departments

//function to delete roles

//function to delete employees

//function to view budget by departments