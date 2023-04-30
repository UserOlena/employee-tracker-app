INSERT INTO department(id, name)
VALUES  (1, 'director'),
        (2, 'success manager'),
        (3, 'instructor'),
        (4, 'teacher assistant'),
        (5, 'tutor'),
        (6, 'admission');


INSERT INTO role(id, title, salary, department_id)
VALUES  (1, 'director', 250000, 1),
        (2, 'success manager', 120000, 2),
        (3, 'instructor', 120000, 3),
        (4, 'teacher assistant', 70000, 4),
        (5, 'junior teacher assistant', 50000, 4),
        (6, 'tutor', 60000, 5),
        (7, 'admission manager', 110000, 6),
        (8, 'admission', 60000, 6);


INSERT INTO employee(id, first_name, last_name, role_id)
VALUES  (1, 'Bossy', 'Man', 1),
        (2, 'Krishana', 'Anderson', 2),
        (3, 'Emamnuel', 'Jucaban', 3),
        (4, 'John', 'Doe', 4),
        (5, 'Jane', 'Doe', 5),
        (6, 'Rapunzel', 'Casing', 7),
        (7, 'Ramon', 'Sanches', 4),
        (8, 'Ryan', 'McGale', 8);
