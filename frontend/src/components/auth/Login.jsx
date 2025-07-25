// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../../authContext";

// import { PageHeader } from "@primer/react/drafts";
// import { Box, Button } from "@primer/react";
// import "./auth.css";

// import logo from "../../assets/github-mark-white.svg";
// import { Link } from "react-router-dom";

// const Login = () => {
//   // useEffect(() => {
//   //   localStorage.removeItem("token");
//   //   localStorage.removeItem("userId");
//   //   setCurrentUser(null);
//   // });

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { setCurrentUser } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:3002/login", {
//         email: email,
//         password: password,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userId", res.data.userId);

//       setCurrentUser(res.data.userId);
//       setLoading(false);

//       window.location.href = "/";
//     } catch (err) {
//       console.error(err);
//       alert("Login Failed!");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-logo-container">
//         <img className="logo-login" src={logo} alt="Logo" />
//       </div>

//       <div className="login-box-wrapper">
//         <div className="login-heading">
//           <Box sx={{ padding: 1 }}>
//             <PageHeader>
//               <PageHeader.TitleArea variant="large">
//                 <PageHeader.Title>Sign In</PageHeader.Title>
//               </PageHeader.TitleArea>
//             </PageHeader>
//           </Box>
//         </div>
//         <div className="login-box">
//           <div>
//             <label className="label">Email address</label>
//             <input
//               autoComplete="off"
//               name="Email"
//               id="Email"
//               className="input"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="div">
//             <label className="label">Password</label>
//             <input
//               autoComplete="off"
//               name="Password"
//               id="Password"
//               className="input"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <Button
//             variant="primary"
//             className="login-btn"
//             disabled={loading}
//             onClick={handleLogin}
//           >
//             {loading ? "Loading..." : "Login"}
//           </Button>
//         </div>
//         <div className="pass-box">
//           <p>
//             New to GitHub? <Link to="/signup">Create an account</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;





// ------------------------------------------------------------

import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";
import logo from "../../assets/github-mark-white.svg";
import "./auth.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-login-container">
      <div className="github-login-header">
        <img src={logo} alt="GitHub Logo" className="github-logo" />
      </div>

      <div className="github-login-box">
        <h1 className="github-login-title">Sign in to GitHub</h1>

        {error && (
          <div className="github-login-error">
            <svg
              className="octicon octicon-alert"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="#f85149"
            >
              <path
                fillRule="evenodd"
                d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="github-login-form">
          <div className="github-form-group">
            <label htmlFor="email">Username or email address</label>
            <input
              id="email"
              type="text"
              className="github-form-control"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="github-form-group">
            <div className="github-password-header">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="github-forgot-password">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              className="github-form-control"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="github-login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="github-login-footer">
          <p className="github-create-account">
            New to GitHub?{" "}
            <Link to="/signup" className="github-signup-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div className="github-footer-links">
        <ul>
          <li><Link to="/terms">Terms</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
          <li><Link to="/security">Security</Link></li>
          <li><Link to="/contact">Contact GitHub</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
