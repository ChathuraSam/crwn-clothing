import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils"; 

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
    </div>
  )
};

export default Signin;
