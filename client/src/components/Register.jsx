import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInput] = useState({
    fullname: "",
    email: "",
    username: "",
    password: "",
  });

  const { fullname, email, username, password } = inputs;

  const onChange = (event) => {
    setInput({ ...inputs, [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const body = { fullname, email, username, password };

    try {
      //have to set this up as a post since the default is a get
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json(); //need this so we can use the data. Should give us our jwt token

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token); //sets our jwt token in our local storage!
        setAuth(true);
        toast.success("Registered Successfully!");

      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="fullname"
          placeholder="Enter your Full Name"
          value={fullname}
          onChange={(event) => onChange(event)}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => onChange(event)}
        />
        <br />
        <input
          type="text"
          name="username"
          placeholder="Enter a username"
          value={username}
          onChange={(event) => onChange(event)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter a password"
          value={password}
          onChange={(event) => onChange(event)}
        />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Already Registered? Click here to login.</Link>
    </>
  );
};

export default Register;
