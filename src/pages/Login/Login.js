import React, { useEffect, useState } from "react";
// Import Logo
import Logo from "../../assets/img/logo-white.png";
// Import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { useHistory, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ACCOUNT_TYPES from "../../config/accountTypes";
import { Footer } from "../../_components/footer/Footer";
import { Button } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (isLoggedIn && !location.state.from === "logout") {
      history.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const HandleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then((d) => {
        console.log("USEEEEER", d.data?.data?.user?.accountType);
        console.log("USEEEEER", d.data?.user?.accountType);
        console.log(ACCOUNT_TYPES.STUDENT === d.data?.user?.accountType);
        history.push("/dashboard");
      })
      .catch((e) => {
        console.log(e);
        toast.error("There is an error. Please re-enter your information");
      });
  };

  return (
    <div className="main-wrapper login-body">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox">
            <div className="login-left">
              <img className="img-fluid" src={Logo} alt="Logo" />
            </div>

            <div className="login-right">
              <div className="login-right-wrap">
                <h1>Login</h1>
                <p className="account-subtitle">Access to our dashboard</p>

                <form>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-block"
                      type="button"
                      style={{ width: "100%" }}
                      onClick={HandleLogin}
                    >
                      Login
                    </button>
                  </div>
                </form>

                <div className="text-center forgotpass">
                  {" "}
                  <button
                    onClick={() => history.push("/forgot-password")}
                    style={{ outline: "none", border: "none" }}
                  >
                    {" "}
                    Forgot Password?{" "}
                  </button>{" "}
                </div>
                {/* <div className="login-or">
                  <span className="or-line"></span>
                  <span className="span-or">or</span>
                </div>

                <div className="social-login">
                  <span>Login with</span>
                  <a href="#" className="facebook">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  <a href="#" className="google">
                    <FontAwesomeIcon icon={faGoogle} />
                  </a>
                </div> */}

                <div className="text-center dont-have">
                  Don’t have an account? <a href="/register">Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Login;
