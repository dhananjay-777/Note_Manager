const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const data = [
  {
    name: "dhananjay",
    email: "dsaf",
    password: "adsf",
  },
];

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;
  const isValid = data.findIndex((user) => {
    user.email = email;
  });
  if (isValid != -1) {
    res.status(400).json({
      error: "User already exits, You have to Sign in",
    });
  } else {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({
          error: "Internal Server Error",
        });
      } else {
        const token = jwt.sign(
          {
            email: email,
          },
          process.env.SECRET_KEY
        );
        //add  user to database
        res.status(200).json({
          message: "User added to db successfully",
          token,
        });
      }
    });
  }
};

exports.signIn = (req, res) => {};
