INSERT INTO department(id, name)
VALUES  (1, 'CEO'),
        (2, 'Education'),
        (3, 'Admission'),
        (4, 'Engineering'),
        (5, 'Accounting'),
        (6, 'Cleaning');



INSERT INTO role(id, title, salary, department_id)
VALUES  (1, 'CEO', 400000, 1),
        (2, 'Director of Education', 210000, 2),
        (3, 'Success Manager', 120000, 2),
        (4, 'Instructor', 120000, 2),
        (5, 'Teacher Assistant', 70000, 2),
        (6, 'Junior Teacher Assistant', 50000, 2),
        (7, 'Tutor', 60000, 2),
        (8, 'Junior Tutor', 50000, 2),
        (9, 'Admission Manager', 110000, 3),
        (10, 'Admission', 60000, 3),
        (11, 'Director of Engineering', 250000, 4),
        (12, 'Product Manager', 160000, 4),
        (13, 'Manager of Engineering', 200000, 4),
        (14, 'Engineer', 140000, 4),
        (15, 'Quality Assurance', 80000, 4),
        (16, 'Director of Accounting', 130000, 5),
        (17, 'Accounting', 70000, 5),
        (18, 'Cleaning Superviser', 45000, 1),
        (19, 'Floor Cleaner', 35000, 6),
        (20, 'Room Cleaner', 35000, 6);


INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES  (1, 'Bossy', 'Man', 1, null),
        (2, 'Jase', 'Adams', 2, 1),
        (3, 'Krishana', 'Anderson', 3, 2),
        (4, 'Emamnuel', 'Jucaban', 4, 3),
        (5, 'John', 'Doe', 5, 3),
        (6, 'Jane', 'Doe', 6, 3),
        (7, 'Brittany', 'Brown', 7, 3),
        (8, 'Eli', 'Brunell', 8, 3),
        (9, 'Rapunzel', 'Casing', 9, 1),
        (10, 'Ramon', 'Sanches', 10, 9),
        (11, 'Lev', 'Boyarskiy', 11, 1),
        (12, 'Ryan', 'McGale', 12, 11),
        (13, 'Alex', 'Chavez', 13, 12),
        (14, 'Daniel', 'Cooper', 14, 13),
        (15, 'Rocco', 'Daigle', 15, 13),
        (16, 'Bentley', 'Fox', 16, 1),
        (17, 'Patric', 'Logan', 17, 16),
        (18, 'Danny', 'Foss', 18, 1),
        (19, 'Michael', 'Ronald', 19, 18),
        (20, 'Maria', 'Hulio', 20, 18);