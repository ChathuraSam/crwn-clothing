import { useState } from "react";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPasword: ""
}

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(
    defaultFormFields
  );
  const { displayName, email, password, conformPassword } =
    formFields;

  console.log(formFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div>
      <h1>Signup with your email and password</h1>
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input
          required
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />

        <label>Email</label>
        <input
          required
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <label>Password</label>
        <input
          required
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <label>Confirm Password</label>
        <input
          required
          type="passwpord"
          name="confirmPassword"
          onChange={handleChange}
          value={conformPassword}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
