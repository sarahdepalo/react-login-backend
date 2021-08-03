import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;

  const onChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = { username, password };

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json(); //parse our json data

      if (parseRes.token) {
        console.log(parseRes);

        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login Successful!");
        
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
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => onChange(event)}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(event) => onChange(event)}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <Link to="/register">Not a user? Head over to Register</Link>
    </>
  );
};

export default Login;
