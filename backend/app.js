const express = require('express');
const app = express();
const product = require("./routes/productRoute");
const user = require('./routes/userRoute')
const errorMiddleware = require('./middlewae/error'); 
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const order = require('./routes/orderRoute');



app.use(
    cors({
      origin: "http://localhost:5173", // Update with your frontend URL
      credentials: true, // ✅ Allows cookies to be sent and stored
    })
  );
  
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true
}));



app.use("/api/v1", product);
app.use('/api/v1', user);
app.use('/api/v1', order);


app.use(errorMiddleware); 

module.exports = app;
