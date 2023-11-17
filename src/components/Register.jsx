import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

function Register() {
  const firstNameRef = useRef();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastname] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [role, setRole] = useState("Admin");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    setValidFirstName(firstName.length >= 3);
  }, [firstName]);

  useEffect(() => {
    setValidLastName(lastName.length >= 3);
  }, [lastName]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = (e) => {
    console.log("running");
    e.preventDefault();
    setErrMsg("");
    const existingUser = JSON.parse(localStorage.getItem("users"))?.find(
      (user) => user.email === email
    );
    if (existingUser) {
      setErrMsg("Email already exists!");
      return;
    }
    const details = {
      firstName,
      lastName,
      email,
      role,
      pwd,
    };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem("users", JSON.stringify([...users, details]));
    navigate("/login");
    setFirstName("");
    setLastname("");
    setEmail("");
    setPwd("");
    setMatchPwd("");
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <form
        noValidate
        className="w-25 border border-2 p-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <h1 className="mb-3 text-center">Registration</h1>
          <label htmlFor="firstname" className="form-label">
            First name{" "}
            <FontAwesomeIcon
              icon={faCheck}
              className={validFirstName ? "valid" : "d-none"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validFirstName || !firstName ? "d-none" : "invalid"}
            />
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="firstname"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            aria-describedby="firstNameNote"
            ref={firstNameRef}
            onFocus={() => setFirstNameFocus(true)}
            onBlur={() => setFirstNameFocus(false)}
          />
          <p
            id="firstNameNote"
            className={
              firstNameFocus && firstName && !validFirstName
                ? "bg-black text-white p-3 mt-3 mb-3"
                : "d-none"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
            First name should be more than 3 letters!
          </p>
          <label htmlFor="lastname" className="form-label">
            Last name
            <FontAwesomeIcon
              icon={faCheck}
              className={validLastName ? "valid ms-2" : "d-none"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validLastName || !lastName ? "d-none" : "invalid ms-2"}
            />
          </label>
          <input
            type="text"
            className="form-control mb-3"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            aria-describedby="lastNameNote"
            onFocus={() => setLastNameFocus(true)}
            onBlur={() => setLastNameFocus(false)}
          />
          <p
            id="lastNameNote"
            className={
              lastNameFocus && lastName && !validLastName
                ? "bg-black text-white p-3"
                : "d-none"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
            LastName Name must be provided!
          </p>
          <label htmlFor="email" className="form-label">
            Email address
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid ms-2" : "d-none"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "d-none" : "invalid ms-2"}
            />
          </label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailNote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p
            id="emailNote"
            className={
              emailFocus && email && !validEmail
                ? "bg-black text-white p-3"
                : "d-none"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
            Please provide valid Email!
          </p>
        </div>
        <div className="mb-3">
          <input
            type="radio"
            id="admin"
            name="role"
            value="Admin"
            className="me-2"
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="admin" className="me-3">
            Admin
          </label>
          <input
            type="radio"
            id="user"
            name="role"
            value="User"
            className="me-2"
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="user">User</label>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid ms-2" : "d-none"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? "d-none" : "invalid ms-2"}
            />
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
        </div>
        <p
          id="pwdnote"
          className={
            pwdFocus && !validPwd ? "bg-black text-white p-3" : "d-none"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters: <span>!</span> <span>@</span>{" "}
          <span>#</span> <span>$</span> <span>%</span>
        </p>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm password
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid ms-2" : "d-none"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "d-none" : "invalid ms-2"}
            />
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm-pasword"
            value={matchPwd}
            onChange={(e) => setMatchPwd(e.target.value)}
            aria-describedby="confirmPwdNote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
          />
        </div>
        <p
          id="confirmPwdNote"
          className={
            matchFocus && !validMatch ? "bg-black text-white p-3" : "d-none"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
          Password should match!
        </p>
        <p className="fw-bold" style={{ color: "red" }}>
          {errMsg ? errMsg : null}
        </p>
        <button
          type="submit"
          className="btn btn-primary mb-3"
          disabled={
            !validFirstName ||
            !validLastName ||
            !validEmail ||
            !validPwd ||
            !validMatch
              ? true
              : false
          }
        >
          Sign Up
        </button>
        <p className="d-flex">
          Already registered?
          <br />
          <span className="line ms-2">
            <Link to="/login">Login in</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
