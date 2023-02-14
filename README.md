# Employee-Tracker
Repository for UWCB week 12 challenge - Employee Tracker

## Description
For the week 12 challenge I created an Employee Tracker app that will allow employees to track their employees, departments and roles as well as add new employees, departments and roles. They will also be able to update the role of existing employees. 

## Installation
To run this program first clone this repository. Open the root directory in the terminal and run
```bash
npm i
```
to install the necessary dependencies (console.table, inquirer, and mysql2) to run the program. Then navigate to ./db/connection.js and within the mysql.createConnection() make sure the user and password values are set correctly for the user.

Finally open mysql in the terminal and source ./db/schema.sql to create the database then source ./db/seeds.sql to populate it with the seed data.

## Usage
The following link is a video that shows an example of how to use the Employee Tracker:

[How to Use Employee Tracker](https://drive.google.com/file/d/11mazj2rkMaMo4znBjD16f0zOaY1tHNYA/view)

Once everything is properly installed and the database is set up, in order to run the Employee Tracker the user must run
```bash
node server.js
```
on their command line. The user will then be given a list of actions to choose from. 

All of the 'View all' options will display the respective table from the database. 

'Add department' will prompt the user to input a new department name and save that new department to the database.

'Add role' will prompt the user to input a new role name then ask which department that role belongs to and then save the new role to the database.

'Add employee' will prompt the user to input the first and last name of the new employee, ask what their role is, who their manager is and then take all that information and save it as a new employee in the database.

'Update employee role' will ask the user to select an existing employee then select their new role and save that change to the database.

## Credits
Application created by Gene Kim
Email: [genedanielkim@gmail.com](mailto:genedanielkim@gmail.com)

## License
N/A

