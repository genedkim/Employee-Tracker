const inquirer = require('inquirer');
const cTable = require('console.table');
const queries = require('./db/queries');

const chooseAction = () => {
    inquirer.prompt([
        {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all employees',
            'Add employee',
            'Update employee role',
            'View all roles',
            'Add role',
            'View all departments',
            'Add department',
            'Quit'
        ]
        }
    ]).then((response) => {
        switch (response.action) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee role':

                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add role':
                addRole();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Quit':

                break;
        }
    })
}

chooseAction();

const viewDepartments = () => {
    console.table('Showing all departments: \n');
    queries.fetchDepartment().then(([rows]) => {
        console.log(rows);
        chooseAction();
    });
    
}

const viewRoles = () => {
    console.log('Showing all roles: \n');
    queries.fetchRole().then(([rows]) => {
        console.table(rows);
        chooseAction();
    });
}

const viewEmployees = () => {
    console.log('Showing all employees: \n');
    queries.fetchEmployee().then(([rows]) => {
        console.table(rows);
        chooseAction();
    });
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ]).then((department) => {
        queries.addDepartment(department.name).then(() => console.log('Added deparment successfully!'))
    })
}

const addRole = () => {
    queries.fetchDepartment().then(([departments]) => {   
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the role?'
            }, {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            }, {
                type: 'list',
                name: 'department',
                message: 'What department does the role belong to?',
                choices: departments.map(department => {
                    return department.department
                })
            }
        ]).then((role) => {
            const roleDetails = [role.name, role.salary, role.department];
            // console.log(roleDetails);
            queries.addRole(roleDetails[0], roleDetails[1], roleDetails[2]).then(() => console.log('Added role successfully!'));
        })
    })
}

const addEmployee = () => {
    queries.fetchRole().then(([roles]) => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What is the employee's first name"
            }, {
                type: 'input',
                name: 'lastName',
                message: "What is the employee's last name?"
            },  {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roles.map(role => {
                    return role.title 
                })
            }
        ]).then((employee) => {
            const employeeDetails = [employee.firstName, employee.lastName, employee.role];
            
        })
    })
}