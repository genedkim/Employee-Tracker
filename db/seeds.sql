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
('Michael', 'London', 1, null),
('Michelle', 'Michaels', 2, 1),
('Gene', 'Kim', 3, null),
('Austin', 'Fisher', 4, 3),
('Jenny', 'Nguyen', 5, null),
('Casey', 'Hess', 6, 5),
('Madeline', 'Kacatin', 7, null),
('Owen', 'Barnes', 8, 7);

