var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View department",
        "View role",
        "View employee",
        "Update employee roll",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View department":
          viewDepartment();
          break;
        case "View role":
          viewRole();
          break;
        case "View employee":
          viewEmployee();
          break;
        case "Update employee roll":
          updateEmployee();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the department?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.name,
        },
        function (err) {
          if (err) throw err;
          console.log("Department added!");
          runSearch();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role you wish to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the role?",
      },
      {
        name: "deptId",
        type: "input",
        message: "What is department ID for this role?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.deptId,
        },
        function (err) {
          if (err) throw err;
          console.log("Role added!");
          runSearch();
        }
      );
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "roleId",
        type: "input",
        message: "What is the employee's role ID?",
      },
      {
        name: "managerId",
        type: "input",
        message: "What is the ID of this employee's manager?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err) {
          if (err) throw err;
          console.log("Department added!");
          runSearch();
        }
      );
    });
}
function viewDepartment() {
  connection.query("SELECT * FROM department", function (err, response) {
    if (err) throw err;
    console.table(response);
    runSearch();
  });
}
function viewRole() {
  connection.query("SELECT * FROM role", function (err, response) {
    if (err) throw err;
    console.table(response);
    runSearch();
  });
}
function viewEmployee() {
  connection.query("SELECT * FROM employee", function (err, response) {
    if (err) throw err;
    console.table(response);
    runSearch();
  });
}
