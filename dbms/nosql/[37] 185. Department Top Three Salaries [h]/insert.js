// Department Collection
    db.Department.insertMany([
        { id: 1, name: "IT" },
        { id: 2, name: "Sales" }
        ]);

    // Employee Collection
    db.Employee.insertMany([
        { id: 1, name: "Joe", salary: 85000, departmentId: 1 },
        { id: 2, name: "Henry", salary: 80000, departmentId: 2 },
        { id: 3, name: "Sam", salary: 60000, departmentId: 2 },
        { id: 4, name: "Max", salary: 90000, departmentId: 1 },
        { id: 5, name: "Janet", salary: 69000, departmentId: 1 },
        { id: 6, name: "Randy", salary: 85000, departmentId: 1 },
        { id: 7, name: "Will", salary: 70000, departmentId: 1 }
        ]);