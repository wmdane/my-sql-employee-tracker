var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

//ask what the user would like to do
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
    //switch cases for each inquirer answer
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

//Define the functions listed out above
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
        name: "first_name",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the employee's last name?",
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the employee's role ID?",
      },
      {
        name: "manager_id",
        type: "input",
        message: "What is the ID of this employee's manager?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Employee added!");
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

//BROKEN DO NOT USE
function updateEmployee() {
  connection.query("SELECT * FROM employee", function (err, response) {
    if (err) throw err;
    console.table(response);
    inquirer.prompt([
      {
        name: "whichEmp",
        type: "input",
        message: "Please enter the ID of the employee who's role you'd like to change.",
      },
    ]);
  });
  connection
    .query("SELECT id FROM employee WHERE ?", { whichEmp: answer.whichEmp }, function (err) {
      if (err) throw err;
      inquirer.prompt([
        {
          name: "newRole",
          type: "input",
          message: "What role ID would you like to give this employee",
        },
      ]);
    })
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: answer.role_id,
          },
        ],
        function (err) {
          if (err) throw err;
          console.table(answer);
          runSearch();
        }
      );
    });
}
