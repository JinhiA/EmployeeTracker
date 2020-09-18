const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

//create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "employee_trackerDB"
});

//connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // run the start function after the connection is made to prompt the user
  startApp();
});

//function to begin app and allow user to choose what they would like to do 
function startApp() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "option"
    })
    .then(function (result) {
      console.log("You entered: " + result.option);

      switch (result.option) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        default:
          quit();
      }
    });
}

//function to add department
function addDepartment() {
  inquirer.prompt([
    {
      type: "list",
      message: "What is the name of the department?",
      name: "deptName",
      choices: [
        "Sales",
        "Engineering",
        "Finance",
        "Legal",
      ]
    }
  ]).then(function (answer) {
    connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName], function (err, res) {
      if (err) throw err;
      console.table(res)
      startApp()
    })
  })
}

//function to add role
function addRole() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What's the title of the role?",
        name: "roleTitle",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead"
        ]
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID"
      }
    ])
    .then(function (answer) {
      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleTitle, answer.salaryTotal, answer.deptID], function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
      });
    });
}

//function to add employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "lastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleId"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerId"
      }
    ])
    .then(function (answer) {
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleId, answer.managerId], function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
      });
    });
}

//function to view all departments
function viewDepartment() {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

//function to view all roles
function viewRoles() {
  // select from the db
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

//function to view all employees
function viewEmployees() {
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

//function to update employee role
function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "updateEmployee"
      },
      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ])
    .then(function (answer) {
      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?', [answer.updateRole, answer.updateEmployee], function (err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
      });
    });
}

//function to end choices and exit app
function quit() {
  connection.end();
  process.exit();
}