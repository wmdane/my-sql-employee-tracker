INSERT INTO department (name)
VALUES  ('Legal'), ('Sales'), ('Finance'), ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 140000.00, 1),
 ('Sales Lead', 76000.00, 2),
 ('Salesperson', 66000.00, 3),
 ('Engineer', 85000.00, 4),
 ('Accountant', 92000.00, 5),
 ('Legal Team Lead', 138000.00, 6),
 ('Lawyer', 125000.00, 7);

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES ('Will', 'Dane', 1, null),
 ('Jon', 'Smith', 2, 1),
 ('Sarah', 'Marshall', 3, 2),
 ('Carmen', 'San Diego', 4, null),
 ('Lara', 'Croft', 5, 1),
 ('John', 'Wick', 6, null),
 ('Alfred', 'Hitchcock', 7, 6);
