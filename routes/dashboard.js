const router = require("express").Router();
const pool = require("../conn");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
    try {
        //req.user has the payload now
        // res.json(req.user) -> will print the id number of the user that corresponds with the current token from the header

        //can select any info you want from the users table now!
        const user = await pool.query(
        `SELECT username FROM users WHERE id = ${req.user};`
        );

        res.json(user.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
