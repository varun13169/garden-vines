import axios from "axios";

const signupHandler = async (signupDetails) => {
  try {
    const response = await axios.post(`/api/auth/signup`, signupDetails);
    // saving the encodedToken in the localStorage
    console.log(response.data.encodedToken);
    localStorage.setItem("token", response.data.encodedToken);
  } catch (error) {
    console.log(error);
  }
};

const signupReducer = (signupState, signupAction) => {
  switch (signupAction.type) {
    case "EMAIL_CHANGE":
      return { ...signupState, email: signupAction.data.email };
    case "PASSWORD_CHANGE":
      return { ...signupState, password: signupAction.data.password };
    case "CONFIRM_PASSWORD_CHANGE":
      return {
        ...signupState,
        confirmPassword: signupAction.data.confirmPassword,
      };
    case "FIRST_NAME_CHANGE":
      return { ...signupState, firstName: signupAction.data.firstName };
    case "LAST_NAME_CHANGE":
      return { ...signupState, lastName: signupAction.data.lastName };
    case "RESET_SIGNUP_FORM":
      return {
        ...signupState,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    default:
      console.log("Error: Check Action Type");
  }
};

const signinHandler = async (loginDetails) => {
  try {
    const response = await axios.post(`/api/auth/login`, loginDetails);
    // saving the encodedToken in the localStorage
    console.log(response.data.encodedToken);
    localStorage.setItem("token", response.data.encodedToken);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signinReducer = (loginState, loginAction) => {
  switch (loginAction.type) {
    case "EMAIL_CHANGE":
      return { ...loginState, email: loginAction.data.email };
    case "PASSWORD_CHANGE":
      return { ...loginState, password: loginAction.data.password };
    case "RESET_LOGIN_FORM":
      return { ...loginState, email: "", password: "" };
    default:
      console.log("Error: Check Action Type");
  }
};

const isPassAndConfirmPassMatch = ({ password, confirmPassword }) => {
  if (password === "" || confirmPassword === "") {
    return true;
  }

  if (password === confirmPassword) {
    return true;
  }
  return false;
};

export {
  signupHandler,
  signupReducer,
  signinHandler,
  signinReducer,
  isPassAndConfirmPassMatch,
};
