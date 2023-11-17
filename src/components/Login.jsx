import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users"));
    const user = users?.filter(
      (user) => user.email === email && user.pwd === pwd
    );
    if (user.length > 0) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate(`/dashboard`);
    } else {
      setErrMsg("Invalid Credentials");
    }
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <form
        noValidate
        className="w-25 border border-2 p-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <h1 className="mb-3 text-center">Login</h1>

          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <p className="fw-bold" style={{ color: "red" }}>
          {errMsg ? errMsg : null}
        </p>
        <button type="submit" className="btn btn-primary mb-3">
          Login
        </button>
        <p className="d-flex">
          Not registered?
          <br />
          <span className="line ms-2">
            <Link to="/">Register</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
