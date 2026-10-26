import { useState } from "react";
import { login, register } from "../services/users";
import { Link, useNavigate } from "react-router-dom";

const UserForm = ({ isLogin = true }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handler = isLogin ? login : register;
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await handler(username, password);

      if (isLogin) {
        navigate("/files");
      }

      if (!isLogin) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.error);
    }
  };

  return (
    <>
      <div>
        <h2>{isLogin ? "LOG IN" : "REGISTER"}</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="username">username:</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            name="username"
            id="username"
            required
          />
          <label htmlFor="password">password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            name="password"
            id="password"
            required
          />
          <button type="submit">{isLogin ? "LOG IN" : "REGISTER"}</button>
        </form>
        <Link to={isLogin ? "/register" : "/login"}>
          {isLogin
            ? "Don't have an account? Click here to register."
            : "Already have an account? Click here to log in."}
        </Link>
        <div className="error">{error}</div>
      </div>
    </>
  );
};

export default UserForm;
