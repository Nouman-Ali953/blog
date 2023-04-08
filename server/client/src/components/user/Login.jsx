import React from "react";
import { useState, useContext } from "react";
import { API } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, styled } from "@mui/material";
import { DataContext } from "../context/DataProvider";
import "../../scss/login.scss";
import "../../scss/media.scss";
import signupImage from "../../images/signup.jpg";
import loginImage from "../../images/login.jpg";
import { toast } from "react-toastify";
import Toaster from "../toaster/Toaster";
import "react-toastify/dist/ReactToastify.css";

// styling of material ui
const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const Media = styled(Box)(({ theme }) => ({
  display:'none',
  [theme.breakpoints.down('md')]: {
      display:'block',
      color:'orange',
      letterSpacing:'1px'
  },
}));
const Component = styled(Box)`
  width: 400px;
  marign: auto;
  min-height: 56%;
`;
const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};
const loginInitialValues = {
  username: "",
  password: "",
};

const requiredFields = ["name", "username", "password"];

const Login = ({ isUserAuthenticated }) => {
  const [account, toggleAccount] = useState("signup");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, showError] = useState("");
  const navigate = useNavigate();

  const { setAccount } = useContext(DataContext);

  const changeState = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const logoImg =

    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const signupUser = async (e) => {
    const emptyFields = Object.keys(signup).filter(
      (key) => requiredFields.includes(key) && !signup[key]
    );
    const anyInvalidField = emptyFields.length > 0 ? true : false;
    if (anyInvalidField) toast.error(`${emptyFields[0]} is required`);

    let response = await API.userSignUp(signup);
    if (response.data.status === 200) {
      showError("");
      setSignup(signupInitialValues);
      setTimeout(() => {
        toggleAccount("login");
      }, 2000);
      toast.success("User Created Successfully!", response.data.msg);
    } else if (response.data.status === 422){
      setTimeout(() => {
        toggleAccount("signup");
      }, 2000);
      showError("Something went wrong! please try again later");
      toast.error(response.data.msg);
    }
    else {
      showError("Something went wrong! please try again later");
    }
  };
  const loginUser = async (e) => {
    const emptyFields = Object.keys(login).filter(
      (key) => requiredFields.includes(key) && !login[key]
    );
    const anyInvalidField = emptyFields.length > 0 ? true : false;
    if (anyInvalidField) toast.error(`${emptyFields[0]} is required`);

    const response = await API.userLogin(login);
    if (response.data.status === 200) {
      setLogin(loginInitialValues);
      toast.success("Login Successfully!");
      isUserAuthenticated(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
    } else if (response.data.status === 400) {
      toast.error(response.data.msg);
    } else {
      toast.error("Invalid Credientials");
      showError("Something went wrong! please try again later");
    }
  };
  return (
    <>
      <div className="main-login">
        {account === "login" ? (
          <div className="main">
            <div className="image-main">
              <img src={loginImage} alt="signup" />
            </div>
            <Component className="component-login" id="login-set">
              <img src={logoImg} alt="login" />
              <TextField
                id="standard-basic"
                label="User Name"
                variant="standard"
                name="username"
                value={login.username}
                onChange={(e) => onValueChange(e)}
              />
              <TextField
                id="standard-basic"
                label="Password"
                variant="standard"
                name="password"
                type="password"
                onChange={(e) => onValueChange(e)}
                value={login.password}
              />
              {error && <Error>{error}</Error>}
              <Button
                variant="contained"
                id="first"
                onClick={(e) => loginUser(e)}
                className="button-color"
              >
                Login
              </Button>
              <h3>OR</h3>
              <Button variant="text" onClick={changeState}>
                Create an account
              </Button>
              <Media> Login to access amazing blogs</Media>
            </Component>
          </div>
        ) : (
          <div className="main">
            <div className="image-main">
              <img src={signupImage} alt="signup" />
            </div>
            <Component className="component-login">
              <img src={logoImg} alt="login" />
              <TextField
                id="standard-basic"
                label="Enter Name"
                onChange={(e) => onInputChange(e)}
                name="name"
                variant="standard"
              />
              <TextField
                id="standard-basic"
                label="Enter User Name"
                onChange={(e) => onInputChange(e)}
                name="username"
                variant="standard"
              />
              <TextField
                id="standard-basic"
                label="Enter Password"
                onChange={(e) => onInputChange(e)}
                type="password"
                name="password"
                variant="standard"
              />
               {error && <Error>{error}</Error>}
              <Button
                onClick={(e) => signupUser(e)}
                variant="contained"
                id="first"
                className="button-color"
              >
                Sign up
              </Button>
              <h3>OR</h3>
              <Button variant="text" onClick={changeState}>
                Already have an account
              </Button>
            </Component>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Login;
