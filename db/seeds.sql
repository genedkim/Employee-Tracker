INSERT INTO department (name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2), 
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3), 
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Gene', 'Kim', 3, 1),
('Austin', 'Fisher', 4, null),
('Michael', 'London', 1, 3),
('Michelle', 'Michaels', 2, null),
('Jenny', 'Nguyen', 5, 5),
('Casey', 'Hess', 6, null),
('Madeline', 'Kacatin', 7, 7),
('Owen', 'Barnes', 8, null);

