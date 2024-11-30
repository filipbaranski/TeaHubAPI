const Users = require("../models/Users");
// const jwt = require('jsonwebtoken');
const jose = require("jose");

const signIn = async (req, res) => {
  try {
    const user = await Users.findOne({
      name: req.body.username,
      password: req.body.password,
    });
    if (user === null) res.status(403).send();
    if (user !== null) {
      let token;
      if (user.token !== null && user.token !== "") {
        token = user.token;
      } else {
        // token = jwt.sign(
        //   { userId: user._id },
        //   process.env.JWT_SECRET,
        // );
        const alg = "HS256";

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        token = await new jose.SignJWT({ "urn:example:claim": true })
          .setProtectedHeader({ alg })
          .setIssuedAt()
          .setIssuer("urn:example:issuer")
          .setAudience("urn:example:audience")
          .sign(secret);
      }
      await Users.findByIdAndUpdate(user._id, { token });
      res.json({ id: user._id, token });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const signOut = async (req, res) => {
  try {
    await Users.findByIdAndUpdate(req.params.id, { token: "" });
    res.res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  signIn,
  signOut,
};
