import jwt from "jsonwebtoken";

const JWT_KEY = "secret";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (isCustomAuth) {
      decodedData = jwt.verify(token, JWT_KEY);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.user_id;
    }

    next();
  } catch (error) {
    console.log("middleware_error => ", error);
  }
};

export default auth;
