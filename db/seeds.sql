INSERT INTO departments (name)
VALUES
    ('Receiving'),
    ('Inventory'),
    ('Sales'),
    ('Management'),
    ('Human Resources'),
    ('Customer Service'),
    ('Security');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Associate', 23712.00, 3),
    ('Cashier', 24356.80, 3),
    ('Inventory Associate', 27996.80, 1),
    ('Customer Service Rep', 28558.40, 6),
    ('Warehouse Clerk', 29140.80, 1),
    ('Assistant Store Manager', 28285.00, 4),
    ('Inventory Control Specialist', 31969.60, 7),
    ('Floor Manager', 36928.00, 4),
    ('Department Manager', 49604.00, 4),
    ('Employee Services', 25683.00, 5);
