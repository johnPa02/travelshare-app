import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const sub = req.headers.authorization.split(" ")[2];
    const isCustomAuth = token.length > 200;

    let decodeData;

    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, "test");
      req.userId = decodeData?.id;
    } else {
      decodeData = jwt.decode(token);
      req.userId = sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
export default auth;
