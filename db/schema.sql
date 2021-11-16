DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2),
    department_id INTEGER,
    CONSTRAINT fk_department 
        FOREIGN KEY (department_id) 
        REFERENCES departments(id) 
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
/* CONSTRAINT provides that no id can be inserted into roles table if it doesn't exist in departments first */
/* BE AWARE of order, roles table cannot exist without departments, so it comes after. SAME with DROPS, roles drops first */

-- Referencing (https://dev.mysql.com/doc/refman/5.6/en/create-table-foreign-keys.html#foreign-key-referential-actions)

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_manager
        FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- ALTER TABLE employee DROP FOREIGN KEY manager_ibfk_1;
