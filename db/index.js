const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // Find all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }

  findAllEmployeeInfo() {
    return this.connection.query(
      "SELECT emp.employee_id, emp.first_name, emp.last_name, title, department, salary, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager FROM employees emp LEFT JOIN roles USING(role_id) LEFT JOIN departments USING(dept_id) LEFT JOIN employees mgr ON mgr.employee_id = emp.manager_id ORDER BY emp.employee_id;"
    );
  }

  findAllEmployees() {
    return this.connection.query("SELECT * FROM employees;");
  }

  findAllRoles() {
    return this.connection.query("SELECT * FROM roles;");
  }

  findAllDepartments() {
    return this.connection.query("SELECT * FROM departments;");
  }

  createEmployee(answers, newRoleId, newManagerId) {
    return this.connection.query("INSERT INTO employees SET ?", {
      first_name: answers.firstName,
      last_name: answers.lastName,
      role_id: newRoleId,
      manager_id: newManagerId,
    });
  }

  createRole(answers, newDeptId) {
    return this.connection.query("INSERT INTO roles SET ?", {
      title: answers.title,
      salary: answers.salary,
      dept_id: newDeptId,
    });
  }

  createDepartment(answers) {
    return this.connection.query("INSERT INTO departments SET ?", {
      department: answers.dept,
    });
  }

  updateEmployee(empId, newRoleId, newManagerId) {
    return this.connection.query("UPDATE employees SET ? WHERE ?", [
      {
        role_id: newRoleId,
        manager_id: newManagerId,
      },
      {
        employee_id: empId,
      },
    ]);
  }
}

module.exports = new DB(connection);


