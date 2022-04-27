const jwt = require("jsonwebtoken");
const jwt_sc = "Avnskihbsdkjdmmnm";
const fetchuser = (req, res, next) => {
    //!get the user from jwt token and return and id object;
    const token = req.header("Auth-Token");
    if (!token) {
        res.status(401).send({ error: "please authenticate" });
    }
    try {
        const data = jwt.verify(token, jwt_sc);
        req.user = data.user;
    } catch (error) {
        res.status(401).send({ error: "please authenticate" });
    }
    next();
};

module.exports = fetchuser;
