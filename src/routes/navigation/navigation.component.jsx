import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navigation.styles.css";
import { signOutUser } from "../../utils/firebase/firebaseAuth";

import { UserContext } from "../../context/user.context";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <div>
            <CrownLogo className="logo" />
          </div>
        </Link>
        <Link className="logo-container" to="shop">
          <div>
            <h2>SHOP</h2>
          </div>
        </Link>
        <div className="nav-links-container">
          {currentUser ? (
            <span>Welcome {currentUser?.email}</span>
          ) : (
            <span>Hi Guest user</span>
          )}

          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN-OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN-IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
