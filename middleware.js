const Users = require('./models/Users');
const jwt = require('jsonwebtoken');

module.exports = () => {
  return async (req, res, next) => {
    const token = req.headers['bearer'];
    const id = req.headers['id'];
    const user = await Users.findOne({ _id: id });
    const userTokenExists = user.token !== "" && user.token !== null && typeof user.token !== "undefined";
    const tokensMatch = user.token === token;
    if (!userTokenExists) {
      return res.status(401).send({error: 'User loged out'});
    }
    if (!tokensMatch) {
      return res.status(401).send({error: 'Token mismatch'});
    }
    if (!token || token === 'null') {
      return res.status(401).send({error: 'No token in headers'});
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          return res.status(401).send({error: 'Invalid token'});
        }
      });
      next();
    }
  }
}
