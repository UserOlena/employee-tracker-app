INSERT INTO department(id, name)
VALUES  (uuid(), 'director'),
        (uuid(), 'success manager'),
        (uuid(), 'instructor'),
        (uuid(), 'teacher assistant'),
        (uuid(), 'tutor'),
        (uuid(), 'admission');


INSERT INTO role(id, title, salary)
VALUES  (uuid(), 'director', 250000),
        (uuid(), 'success manager', 120000),
        (uuid(), 'instructor', 120000),
        (uuid(), 'teacher assistant', 70000),
        (uuid(), 'junior teacher assistant', 50000),
        (uuid(), 'tutor', 60000),
        (uuid(), 'admission', 60000);


INSERT INTO employee(id, first_name, last_name)
VALUES  (uuid(), 'Bossy', 'Man'),
        (uuid(), 'Krishana', 'Anderson'),
        (uuid(), 'Emamnuel', 'Jucaban'),
        (uuid(), 'John', 'Doe'),
        (uuid(), 'Jane', 'Doe'),
        (uuid(), 'Rapunzel', 'Casing'),
        (uuid(), 'Ramon', 'Sanches'),
        (uuid(), 'Ryan', 'McGale');
