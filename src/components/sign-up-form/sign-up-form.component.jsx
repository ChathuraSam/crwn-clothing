import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button-component";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebaseAuth";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebaseFirestore";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  console.log(formFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetForm = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // confirm password match wth confirm password
    if (password !== confirmPassword) {
      alert("Pasword and COnfirm password not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);

      await createUserDocumentFromAuth(user, { displayName });
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account ?</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          lable="Display Name"
          required
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />

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

        <FormInput
          lable="Confirm Password"
          required
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit" buttonType="inverted">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
