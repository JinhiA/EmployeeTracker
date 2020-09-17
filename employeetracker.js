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
  startApp();
});

//function to prompt user on what they would like to do
function startApp() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcome to the employee database! What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add an employee",
        "Add department",
        "Add a role",
        "EXIT"
      ]
    }).then(answer => {
      switch (answer.action) {
        case "View all employees":
          viewEmployees();
          break;
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "EXIT":
          endApp();
          break;
        default:
          break;
      }
    })
}

//function to view all employees
function viewEmployees() {
  const query = "SELECT * FROM employees";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table('All Employees:', res);
    startApp();
  })
}

//function to view all departments
function viewDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table('All Departments:', res);
    startApp();
  })
}

function viewRoles() {
  const query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table('All roles:', res);
    startApp();
  })
}

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Employee's fist name: ",
        },
        {
          name: "last_name",
          type: "input",
          message: "Employee's last name: "
        },
        {
          name: "role",
          type: "list",
          choices: function () {
            const roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is this employee's role? "
        }
      ]).then(answer => {
        let roleID;
        for (let j = 0; j < res.length; j++) {
          if (res[j].title == answer.role) {
            roleID = res[j].id;
            console.log(roleID)
          }
        }
        connection.query("INSERT INTO employees SET ?", { first_name: answer.first_name, last_name: answer.last_name, role_id: roleID, },
          function (err) {
            if (err) throw err;
            console.log("Your employee has been added!");
            startApp();
          }
        )
      })
  })
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "new_dept",
        type: "input",
        message: "What is the new department you would like to add?"
      }
    ]).then(answer => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.new_dept
        }
      );
      const query = "SELECT * FROM department";
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Departments:', res);
        startApp();
      })
    })
}

function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "role",
          type: "input",
          message: "What is the Title of the new role?"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this position? (Enter a number?)"
        },
        {
          name: "deptId",
          type: "rawlist",
          choices: function () {
            const deptArry = [];
            for (let i = 0; i < res.length; i++) {
              deptArry.push(res[i].name);
            }
            return deptArry;
          },
        }
      ]).then(answer => {
        let deptID;
        for (let j = 0; j < res.length; j++) {
          if (res[j].name == answer.deptChoice) {
            deptID = res[j].id;
          }
        }

        connection.query("INSERT INTO role SET ?", { title: answer.role, salary: answer.salary, department_id: deptId },
          function (err, res) {
            if (err) throw err;
            console.log("Your new role has been added!");
            startApp();
          }
        )
      })
  })

}

function endApp() {
  connection.end();
}