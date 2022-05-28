const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;

  client
    .query(`select * from users where email='${email}';`)
    .then((data) => {
      const isValid = data.rows;
      if (isValid != 0) {
        // console.log(data);
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
            client
              .query(
                `insert into users (name, email, password) values('${name}','${email}','${hash}');`
              )
              .then(() => {
                res.status(200).json({
                  message: "User added to db successfully",
                  token,
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: "Internal Server Error",
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  client
    .query(`select * from users where email='${email}';`)
    .then((data) => {
      const isValid = data.rows;
      if (isValid == 0) {
        // console.log(data);
        res.status(400).json({
          error: "User does not exits, You have to Sign up",
        });
      } else {
        //console.log(data.rows[0].password);
        const hashPassword = data.rows[0].password;
        bcrypt.compare(password, hashPassword, function (err, result) {
          if (err) {
            res.status(500).json({
              error: "Internal Server Error",
            });
          } else if (result) {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({
              message: "Sign in successful",
              token,
            });
          } else {
            res.status(400).json({
              error: "Wrong Credentials",
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};
