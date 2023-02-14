const connection = require('./connection');

class Queries {
    constructor(connection) {
        this.connection = connection;
    }
    fetchDepartment() {
        return this.connection.promise().query(`SELECT department.id AS id, department.name AS department FROM department;`);
    }
    fetchRole() {
        return this.connection.promise().query(`SELECT role.id, role.title, department.name AS department FROM role 
        INNER JOIN department ON role.department_id = department.id;`);
    }
    fetchEmployee() {
        return this.connection.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department_name, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee 
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id;`);
    }
    addDepartment(department) {
        return this.connection.promise().query(`INSERT INTO department SET ${department};`);
    }
    addRole(name, id, department) {
        return this.connection.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${name}', ${id}, ${department});`);
    }
    addEmployee(firstName, lastName, roleId, managerId) {
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId});`);
    }
    updateEmployee(employeeId, roleId) {
        return this.connection.promise().query(`UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId};`);
    }
}

module.exports = new Queries(connection);