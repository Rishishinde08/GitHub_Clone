// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../../authContext";

// import { PageHeader } from "@primer/react/drafts";
// import { Box, Button } from "@primer/react";
// import "./auth.css";

// import logo from "../../assets/github-mark-white.svg";
// import { Link } from "react-router-dom";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { setCurrentUser } = useAuth();

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:3002/signup", {
//         email: email,
//         password: password,
//         username: username,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userId", res.data.userId);

//       setCurrentUser(res.data.userId);
//       setLoading(false);

//       window.location.href = "/";
//     } catch (err) {
//       console.error(err);
//       alert("Signup Failed!");
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
//                 <PageHeader.Title>Sign Up</PageHeader.Title>
//               </PageHeader.TitleArea>
//             </PageHeader>
//           </Box>
//         </div>

//         <div className="login-box">
//           <div>
//             <label className="label">Username</label>
//             <input
//               autoComplete="off"
//               name="Username"
//               id="Username"
//               className="input"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

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
//             onClick={handleSignup}
//           >
//             {loading ? "Loading..." : "Signup"}
//           </Button>
//         </div>

//         <div className="pass-box">
//           <p>
//             Already have an account? <Link to="/auth">Login</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;


//---------------------------------------
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";
import logo from "../../assets/github-mark-white.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3002/signup", {
        email,
        password,
        username,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="github-signup-container">
      <div className="github-signup-header">
        <img src={logo} alt="GitHub Logo" className="github-logo" />
      </div>

      <div className="github-signup-box">
        <h1 className="github-signup-title">Create your account</h1>

        {error && (
          <div className="github-signup-error">
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

        <form onSubmit={handleSignup} className="github-signup-form">
          <div className="github-form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="github-form-control"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="github-form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              className="github-form-control"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="github-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="github-form-control"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="github-password-hint">
              Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.
            </p>
          </div>

          <button
            type="submit"
            className="github-signup-button"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="github-signup-footer">
          <p className="github-login-prompt">
            Already have an account?{" "}
            <Link to="/auth" className="github-login-link">
              Sign in
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

export default Signup;