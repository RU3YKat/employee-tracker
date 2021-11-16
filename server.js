// const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
// const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3009;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
// app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
// app.use((req, res) => {
//     res.status(404).end();
// });

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    // console.log('Database connected.');
    // app.listen(PORT, () => {
    //     console.log(`Server running on port ${PORT}`);
    // });
    startPrompt();
});

async function startPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'Please choose from the following:\n',
                name: 'actions',
                choices: [
                    'View all Departments',
                    'Add a Department',
                    'View all Roles',
                    'Add a Role',
                    'View all Employees',
                    'Add an Employee',
                    'Update an Employee Role',
                    'End'
                ],
            },
        ])
    .then(answer => {
        switch (answer.actions) {
            case 'View all Departments':
                viewDepartments();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'View all Roles':
                viewRoles();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'View all Employees':
                viewEmployees();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateRole();
                break;
            case 'End':
                end();
                break;
            default:
                break;
        }
    })
}

const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.log('\n===========================\n');
        console.table(rows);

        return startPrompt();
    });
};

const addDepartment = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'deptName',
                message: 'Please enter the department name to add: ',
                validate: deptNameInput => {
                    if(deptNameInput) {
                        return true;
                    }
                    console.log('\nEnter the new department name');
                    return false;
                }
            }
        ])
        .then(answer => {
            const sql = `INSERT INTO departments SET ?`;
            const params = answer.deptName;
        
            db.query(sql, { name: params }, (err) => {
                if (err) throw err;

                console.log('\nNew department added\n');
                return viewDepartments();
            });
        });
};

const viewRoles = () => {
    const sql = `SELECT roles.*, departments.name
        AS department_name
        FROM roles
        LEFT JOIN departments
        ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.log('\n===========================\n');
        console.table(rows);

        return startPrompt();
    });
};

const addRole = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Please enter the role title to add: ',
                validate: roleTitleInput => {
                    if(roleTitleInput) {
                        return true;
                    }
                    console.log('\nEnter the new role title');
                    return false;
                }
            },
            {
                type: 'number',
                name: 'roleSalary',
                message: 'Please enter the role salary to add: ',
                validate: roleSalaryNumber => {
                    if (roleSalaryNumber !== isNaN) {
                        return true;
                    }
                    console.log('\nEnter the new role salary amount');
                    return false;
                }
            }
        ])
        .then(answer => {
        const params = [answer.roleTitle, answer.roleSalary];
        // call mysql to db query for select from departments
        const sql = `SELECT * FROM departments`;

        db.query(sql, (err, rows) => {
            if (err) throw err;

            const chooseDepartments = rows.map (
                ({ id, name }) => ({ value: id, name: name })
            );
            return inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'roleDeptName',
                        message: 'Please choose the deparment for the new role: ',
                        choices: chooseDepartments
                    }
                ])
                .then( answer => {
                    const department =  answer.roleDeptName;
                    // push deparment name to params for query
                    params.push(department);

                    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
                    
                    db.query(sql, params, (err) => {
                        if (err) throw err;
        
                        console.log('\nNew role added');
                        return viewRoles();
                    });
                });
        });
    });
};

const viewEmployees = () => {
    const sql = `SELECT * FROM employee ORDER BY last_name`;

    db.query(sql, (err, rows) => {
        if (err) throw err;

        console.log('\n===========================\n');
        console.table(rows);

        return startPrompt();
    });
};

const addEmployee = () => {
    const sql = `INSERT INTO employee (first_name, last_name) 
    VALUES (?,?)`;
    const params = [body.first_name, body.last_name];

    db.query(sql, params, (err, result) => {
        if (err) throw err;

        console.log('\n===========================\n');
        console.table(result);

        return startPrompt();
    });
};

const updateRole = () => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) throw err;
        console.log('\n===========================\n');
        console.table(result);

        return startPrompt();
    });
};

const end = () => {
    db.end();
};