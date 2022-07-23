const express          = require('express');
const env              = require('dotenv');
const path             = require('path');


// /* Relative imports */
const user_router       = require('./routes/user');
// const admin_router      = require('./routes/admin/admin_routes');
// const initial_data_router      = require('./routes/admin/initialData');
// const order_routes_router     = require('./routes/admin/order.routes.js');
// const category_router   = require('./routes/category');
// const product_router    = require('./routes/product');
// const address_router    = require('./routes/address');
// const cart_controller   = require('./routes/cart');
// const order_controller  = require('./routes/order');


/* setup express */
const app = express();
env.config();



// import db
require("./db/mongoose");



/* setup middlewares */


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use('/uploads', express.static(__dirname));


// /** Routes */
app.use('/api/users', user_router);
// app.use('/api/admin', admin_router);
// app.use('/api/category',category_router);
// app.use('/api/products',product_router);
// app.use('/api/user',address_router);
// app.use('/api/user/cart',cart_controller);
// app.use('/api/user/orders',order_controller);
// app.use('/api/admin',    initial_data_router);
// app.use('/api/admin',    order_routes_router);

app.use((req, res) => {
    return res.status(404).json({ error: 'Not found' });
  });
  
app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ error: 'Internal error' });
  });




module.exports = app


