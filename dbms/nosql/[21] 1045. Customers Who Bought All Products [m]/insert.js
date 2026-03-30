// Product Collection
    db.product.insertMany([
        { product_key: 5 },
        { product_key: 6 }
        ])

    // Customer Collection
    db.customer.insertMany([
        { customer_id: 1, product_key: 5 },
        { customer_id: 2, product_key: 6 },
        { customer_id: 3, product_key: 5 },
        { customer_id: 3, product_key: 6 },
        { customer_id: 1, product_key: 6 }
        ])