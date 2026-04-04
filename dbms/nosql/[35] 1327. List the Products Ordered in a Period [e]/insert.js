// Insert into Products Collections
    db.Products.insertMany([
        { product_id: 1, product_name: "Leetcode Solutions", product_category: "Book" },
        { product_id: 2, product_name: "Jewels of Stringology", product_category: "Book" },
        { product_id: 3, product_name: "HP", product_category: "Laptop" },
        { product_id: 4, product_name: "Lenovo", product_category: "Laptop" },
        { product_id: 5, product_name: "Leetcode Kit", product_category: "T-shirt" }
        ]);

    // Insert into Orders Collections
    db.Orders.insertMany([
        { product_id: 1, order_date: new Date("2020-02-05"), unit: 60 },
        { product_id: 1, order_date: new Date("2020-02-10"), unit: 70 },
        { product_id: 2, order_date: new Date("2020-01-18"), unit: 30 },
        { product_id: 2, order_date: new Date("2020-02-11"), unit: 80 },
        { product_id: 3, order_date: new Date("2020-02-17"), unit: 2 },
        { product_id: 3, order_date: new Date("2020-02-24"), unit: 3 },
        { product_id: 4, order_date: new Date("2020-03-01"), unit: 20 },
        { product_id: 5, order_date: new Date("2020-02-25"), unit: 50 },
        { product_id: 5, order_date: new Date("2020-02-27"), unit: 50 }
        ]);