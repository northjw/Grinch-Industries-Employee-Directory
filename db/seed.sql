 USE employee_db;

INSERT INTO department 
(name)
VALUES
("Wardrobe"),
("Music"),
("Set"),
("Talent")
;

INSERT INTO role
(title, salary, department_id)
VALUES
("Supervisor", 100000, 1),
("Dresser", 85000, 1), 
("Conductor", 110000, 2), 
("Orchestra", 75000, 2), 
("Prop Master", 100000, 3),
("Grinch", 200000, 4),
("Cindy Lu Who", 180000, 4)
;

INSERT INTO employee 
(first_name, last_name, role_id, manager_id)
VALUES
("Josh", "North", 1, NULL),
("Derek", "Lockwood", 2, 1),
("Colin", "Castillo", 3, 1),
("Sarah", "Smith", 4, 1),
("Laura", "Rin", 5, NULL),
("Gavin", "Lee", 6, Null),
("Beatrix", "Bishop", 6, Null);