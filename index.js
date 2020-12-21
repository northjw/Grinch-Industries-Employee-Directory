const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");
init();
// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: "Employee Manager" }).render();
  console.log(logoText);
  loadMainPrompts();
}
//Displays the prompts and allows user to make a selection of what to do
async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
       
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View All Roles",
          value: "VIEW_ALL_ROLES",
        },
        {
          name: "View All Departments",
          value: "VIEW_ALL_DEPARTMENTS",
        },
        {
          name: "Add A New Employee",
          value: "NEW_EMPLOYEE",
        },
        {
          name: "Update An Employees' Role",
          value: "UPDATE_ROLE",
        },

        {
          name: "Add A New Role",
          value: "ADD_ROLE",
        },
    
        {
          name: "Add A New Department",
          value: "ADD_DEPT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);

  switch (choice) {
    
    case "VIEW_EMPLOYEES":
      return findAllEmployees();
    case "VIEW_ALL_ROLES":
      return viewRoles();
    case "VIEW_ALL_DEPARTMENTS":
      return viewDepartments();
    case "NEW_EMPLOYEE":
      return addNewEmployee();
    case "UPDATE_ROLE":
      return updateEmployeeRole();
    case "ADD_ROLE":
      return addEmployeeRole();
    case "ADD_DEPT":
      return addNewDepartment();
      
    case "QUIT":
      return quit();
      
      

    default:
      return quit();
    
  }
}



async function findAllEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function viewDepartments() {
  const departments = await db.viewDepartments();

  console.log("\n");
  console.table(departments);

  loadMainPrompts();
}

async function viewRoles() {
  const roles = await db.viewRoles();

  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}

async function addNewEmployee() {
  await prompt([
    {
      type: "input",
      name: "NewEmployeeFirstName",
      message: "What is the new employee's first name?",
    },
    {
      type: "input",
      name: "NewEmployeeLastName",
      message: "What is the new employee's last name?",
    },
    {
      type: "input",
      name: "NewEmployeeRoleId",
      message: "What is the new employee's role id?",
    },

    {
      type: "input",
      name: "NewEmployeeManagerId",
      message: "What is the new employee's manager's id?",
    },
  ]).then(function (data) {
    db.addNewEmployee(
      data.NewEmployeeFirstName,
      data.NewEmployeeLastName,
      data.NewEmployeeRoleId,
      data.NewEmployeeManagerId
    );
    console.log("\n");
    console.log("Successfully Added");

    loadMainPrompts();
  });
}



async function updateEmployeeRole() {
  await prompt([
    {
      type: "input",
      name: "employeeId",
      message:
        "What is the id of the employee who's role you would like to update?",
    },
    {
      type: "input",
      name: "roleId",
      message: "What is the role id number for the employee's new role?",
    }
  ]).then(function (data) {
    db.updateEmployeeRole(data.employeeId, data.roleId);
    console.log("\n");
    console.log("Successfully Added");

    loadMainPrompts();
  });
}

async function addEmployeeRole() {
  await prompt([
    {
      type: "input",
      name: "NewRoleName",
      message: "What is the new role?",
    },
    {
      type: "input",
      name: "NewRoleSalary",
      message: "What is the new role salary?",
    },
    {
      type: "input",
      name: "NewRoleDepartmentId",
      message: "What is the new role's department's id?",
    },
  ]).then(function (data) {
    db.addEmployeeRole(
      data.NewRoleName,
      data.NewRoleSalary,
      data.NewRoleDepartmentId
    );
    console.log("\n");
    console.log("Successfully Added");

    loadMainPrompts();
  });
}
async function addNewDepartment() {
    await prompt([
      {
        type: "input",
        name: "NewDepartment",
        message: "What is the new department?",
      },
    ]).then(function (data) {
      db.addNewDepartment(data.NewDepartment);
      console.log("\n");
      console.log("Successfully Added");
  
      loadMainPrompts();
    });
  }

async function quit() {
  return console.log("Thanks for using the automated employee manager!");
}
