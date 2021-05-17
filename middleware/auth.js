import jwt from "jsonwebtoken";

const JWT_KEY = "secret";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, JWT_KEY);

    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
