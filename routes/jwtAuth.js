const router = require("express").Router();
const pool = require("../conn");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../models/jwtGenerator");

//registering
router.post("/register", async (req, res) => {
  try {
    //1. destructure the req.body (name, email, password, username)
    const { fullname, email, username, password } = req.body;

    //2. Check if user exists (if they do, throw an error)
    //Basing this off of the username since we applied a unique identifier in the database earlier
    const query = `SELECT * FROM users WHERE username = '${username}';`;
    const user = await pool.query(query);

    //Pool/PG gives you access to the 'rows' method - super helpful with login and register functions.
    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    } else {
      //3. Bcrypt user password (remember salting and hashing)

      const saltRounds = 10; //how encrypted it will be.
      const salt = await bcrypt.genSalt(saltRounds);

      const bcryptPassword = await bcrypt.hash(password, salt);

      //4.enter new user inside db

      const newUser =
        await pool.query(`INSERT INTO users (fullname, email, username, password)
        VALUES('${fullname}', '${email}', '${username}', '${bcryptPassword}')
        RETURNING *;`);

      //5. generate jwt token

      const token = jwtGenerator(newUser.rows[0].id);
      console.log("Token: ", token);
      res.json({ token });

    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
