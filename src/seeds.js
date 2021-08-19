exports.seeds = `
    "INSERT INTO company(name) VALUES("Sobeys")";
    "INSERT INTO company(name) VALUES("Walmart")";
    "INSERT INTO company(name) VALUES("Costco")";
    "INSERT INTO product(name, company_id) VALUES("Meat", 1)";
    "INSERT INTO product(name, company_id) VALUES("Lettuce", 1)";
    "INSERT INTO product(name, company_id) VALUES("Sandwich", 1)";
    "INSERT INTO product(name, company_id) VALUES("Pasta", 2)";
    "INSERT INTO product(name, company_id) VALUES("Fish", 2)";
    "INSERT INTO product(name, company_id) VALUES("Can", 2)";
    "INSERT INTO product(name, company_id) VALUES("Peach", 3)";
    "INSERT INTO product(name, company_id) VALUES("Pear", 3)";  
    "INSERT INTO user(name, password) VALUES("test", "test")";
    "INSERT INTO user(name, password) VALUES("masoud", "zare")";   
    "INSERT INTO user-company(user_id, company_id) VALUES(1, 1)";
    "INSERT INTO user-company(user_id, company_id) VALUES(1, 2)";
    "INSERT INTO user-company(user_id, company_id) VALUES(2, 3)";
    `;
