//copied from: https://github.com/ousecTic/pern-jwt-tutorial/blob/master/server/middleware/validInfo.js
//basically the following just tests if name, passwords, and emails are typed correctly. 

module.exports = function(req, res, next) {
    const { email, fullname, username, password } = req.body;
  
    function validEmail(userEmail) {
        //uses regex to see if the email is valid
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }

    if (req.path === "/register") {
      console.log(!email.length);
      if (![email, fullname, username, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }

    } else if (req.path === "/login") {
      if (![username, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      }
    }
  
    next(); //once everything is complete it will continue on with the route.
  };