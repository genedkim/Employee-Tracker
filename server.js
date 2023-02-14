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
                updateEmployee();
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
                process.exit();
                break;
        }
    })
};

const init = () => {
    console.log('   ______________________ ');
    console.log('  |                      |');
    console.log('  |   EMPLOYEE MANAGER   |');
    console.log('  |______________________|');
    console.log('                          ');
    chooseAction();
};

const viewDepartments = () => {
    console.log('Showing all departments: \n');
    queries.fetchDepartment().then(([rows]) => {
        console.table(rows);
        chooseAction();
    });
};

const viewRoles = () => {
    console.log('Showing all roles: \n');
    queries.fetchRole().then(([rows]) => {
        console.table(rows);
        chooseAction();
    });
};

const viewEmployees = () => {
    console.log('Showing all employees: \n');
    queries.fetchEmployee().then(([rows]) => {
        console.table(rows);
        chooseAction();
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ]).then((department) => {
        queries.addDepartment(department.name)
        .then(() => {
            console.log('Added deparment successfully!\n');
            chooseAction();
        });
    });
};

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
                    return {name: department.department, value: department.id}
                })
            }
        ]).then((role) => {
            const roleDetails = [role.name, role.salary, role.department];
            // console.log(roleDetails);
            queries.addRole(roleDetails[0], roleDetails[1], roleDetails[2])
            .then(() => {
                console.log('Added role successfully!\n')
                chooseAction();
            });
        });
    });
};

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
                    return {name: role.title, value: role.id}
                })
            }
        ]).then((employee) => {
            const employeeDetails = [employee.firstName, employee.lastName, employee.role];
            // console.log(employeeDetails);
            queries.fetchEmployee().then(([employees]) => {
                const employeeList = employees.map(employee => {
                    return  {name: employee.first_name + " " + employee.last_name, value: employee.id}
                });
                employeeList.push({name: 'None', value: null});
                // console.log(employeeList);
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'managerId',
                        message: "Who is the employee's manager?",
                        choices: employeeList
                    }
                ]).then((response) => {
                    employeeDetails.push(response.managerId);
                    queries.addEmployee(employeeDetails[0], employeeDetails[1], employeeDetails[2], employeeDetails[3])
                    .then(() => {
                        console.log('Added employee successfully!\n')
                        chooseAction();
                    });
                });
            });
        });
    });
};

const updateEmployee = () => {
    queries.fetchEmployee().then(([employees]) => {
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Which employee's role do you want to update?",
                choices: employees.map(employee => {
                    return  {name: employee.first_name + " " + employee.last_name, value: employee.id}
                })
            }
        ]).then((response) => {
            const employeeId = response.employee;
            queries.fetchRole().then(([roles]) => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "Which role do you want to assign the selected employee?",
                        choices: roles.map(role => {
                            return {name: role.title, value: role.id}
                        })
                    }
                ]).then((newRole) => {
                    const newRoleId = newRole.role;
                    queries.updateEmployee(employeeId, newRoleId)
                    .then(() => {
                        console.log('Updated employee role successfully!\n')
                        chooseAction();
                    });
                })
            })

        })
    })
};

init();