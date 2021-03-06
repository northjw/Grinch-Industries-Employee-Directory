const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.query(
      "SELECT emp.employee_id, emp.first_name, emp.last_name, title, department, salary, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager FROM employee emp LEFT JOIN role USING(role_id) LEFT JOIN department USING(department_id) LEFT JOIN employee mgr ON mgr.employee_id = emp.manager_id ORDER BY emp.employee_id;"
    );
  }

  findAllManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  addNewEmployee(
    employeeFirstName,
    employeeLastName,
    employeeId,
    employeeManagerId
  ) {
    return this.connection.query(
      "INSERT INTO employee (first_name,last_name, role_id, manager_id ) VALUES (?, ?, ?, ?);",
      [employeeFirstName, employeeLastName, employeeId, employeeManagerId]
    );
  }

  viewDepartments() {
    return this.connection.query("SELECT * FROM department");
  }

  viewRoles() {
    return this.connection.query("SELECT * FROM role");
  }

  addNewDepartment(department) {
    return this.connection.query(
      "INSERT INTO department (department) VALUES (?)",
      department
    );
  }

  updateEmployeeRole(employee_id, role_id) {
    return this.connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?", [role_id, employee_id]);
        
}


  addEmployeeRole(NewRoleName, NewRoleSalary, NewRoleDepartmentId) {
    return this.connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
      [NewRoleName, NewRoleSalary, NewRoleDepartmentId]
    );
  }

  createRole(answers, NewRoleDeptId) {
    return this.connection.query("INSERT INTO roles SET ?"), {
      title: answers.title,
      salary: answers.salary,
      dept_id: NewRoleDeptId,
    };
  }

  createDepartment(answers) {
    return this.connection.query("INSERT INTO departments SET ?", {
      department: answers.dept,
    });
  }

  
  }


module.exports = new DB(connection);
