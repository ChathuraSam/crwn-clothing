import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button-component";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebaseAuth";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebaseFirestore";

import { UserContext } from "../../context/user.context";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log({ "**user": user });
      setCurrentUser(user);
      resetForm();
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-credential") {
        alert("Wrong username or password");
        resetForm();
      }
    }
  };

  const signinWithGoogle = async () => {
    const response = await signInWithGooglePopup();
    const { user } = response;
    setCurrentUser(user);
    createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account ?</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          lable="Email"
          required
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          lable="Password"
          required
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <div className="button-container">
          <Button type="submit" buttonType="inverted">
            SignIn
          </Button>
        </div>
        <button type="button" onClick={signinWithGoogle}>
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
