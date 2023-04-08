import User from "../models/user.js";
import Token from "../models/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signupUser = async (req, res) => {
  try {
    const check = await User.findOne({ username: req.body.username });
    if (check) {
      return res.json({ msg: "user already exist...", status: 422});
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = {
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
      };
      const newUser = new User(user);
      await newUser.save();
      return res
        .json({ username: user.username, msg: "user created successfully" ,status: 200});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error while signup" });
  }
};

export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.json({ msg: "Username does not match",status: 400 });
  }

  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      response.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
        status: 200
      });
    } else {
      response.json({ msg: "Password does not match", status: 400 });
    }
  } catch (error) {
    response.status(500).json({ msg: "error while login the user" });
  }
};
