const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.query(
            // "SELECT first_name, last_name FROM employee"
            "SELECT * FROM employee"

            // "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFTT JOIN department on role.department_id"
        )
    }

    findAllManagers(employeeId) {
        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?", employeeId
        );
    }

    addNewEmployee(employeeFirstName, employeeLastName, employeeId, employeeManagerId) {
        return this.connection.query(
            "INSERT INTO employee (first_name,last_name, role_id, manager_id ) VALUES (?, ?, ?, ?);", [employeeFirstName, employeeLastName, employeeId, employeeManagerId]
        );
    }

    viewDepartments() {
        return this.connection.query(
            "SELECT name FROM department"
        );
    }

    viewRoles() {
        return this.connection.query(
            "SELECT title FROM role"
        );
    }

    addNewDepartment(department) {
        return this.connection.query(
            "INSERT INTO department (name) VALUES (?)", department);
    }

    addEmployeeRole(roleTitle, roleSalary, roleDeptId) {
        return this.connection.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [roleTitle, roleSalary, roleDeptId]);
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }

}

module.exports = new DB(connection)