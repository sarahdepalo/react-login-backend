const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(express.json()); //allows access to req.body
app.use(cors());

//Routes:
//Register and login routes
app.use('/auth', require('./routes/jwtAuth'));

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
