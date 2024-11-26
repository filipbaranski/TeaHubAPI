const Users = require("./models/Users");
// const jwt = require('jsonwebtoken');
const jose = require("jose");

module.exports = () => {
  return async (req, res, next) => {
    //set header first to allow request or origin domain (value can be different)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, OPTIONS, DELETE"
    );

    //---- other code

    //Preflight CORS handler
    // if (req.method === "OPTIONS") {
    return res.status(200).json({
      body: "OK",
    });
    // }
    const token = req.headers["bearer"];
    const id = req.headers["id"];
    const user = await Users.findOne({ _id: id });
    const userTokenExists =
      user.token !== "" &&
      user.token !== null &&
      typeof user.token !== "undefined";
    const tokensMatch = user.token === token;
    if (!userTokenExists) {
      return res.status(401).send({ error: "User loged out" });
    }
    if (!tokensMatch) {
      return res.status(401).send({ error: "Token mismatch" });
    }
    if (!token || token === "null") {
      return res.status(401).send({ error: "No token in headers" });
    } else {
      const { payload } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      // console.log(payload);
      // jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (!payload) {
        return res.status(401).send({ error: "Invalid token" });
      }
      // });
      next();
    }
  };
};
