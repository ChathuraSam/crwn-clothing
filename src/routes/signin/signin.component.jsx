import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils"; 
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const Signin = () => {
  
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const { user } = response;
    createUserDocumentFromAuth(user);
  }


  return(
    <div>
      <h1>Signin Page</h1>
      <button onClick={logGoogleUser}>sign in with google</button>
      <SignUpForm/>
    </div>
  )
};

export default Signin;
