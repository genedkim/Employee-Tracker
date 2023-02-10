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
        queries.addDepartment(department.name).then(() => console.log(`Added ${department.name} department to the database.`))
    })
}

const addRole = () => {
    // queries.fetchDepartment()
    // .then((res) => console.log(res));
    
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the role?'
        }, {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        }
    ]).then((role) => {
        const roleDetails = [role.name, role.salary];
        queries.fetchDepartment().then(([departments]) => {
            console.log(departments);
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'choice',
                    message: 'What department does the role belong to?',
                    choices: departments
                }
            ]).then((department) => {
                roleDetails.push(department.choice);

                console.log(roleDetails);
            })
        })
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name"
        }, {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        }
    ]).then((name) => {
        
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: employeeRoles
            }
        ]).then((role) => {
            
        })
    })
}