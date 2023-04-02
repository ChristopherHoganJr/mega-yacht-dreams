import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");

  const Login = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/login", user, {
        withCredentials: true,
      })
      .then((res) => {
        setCurrentUser(res.data.currentUser);
        navigate("/");
      })
      .catch((error) => setErrors(error.response.data.error));
  };

  return (
    <div className='flex min-h-[calc(100vh-100px)]  py-4 items-center justify-center'>
      <div className='-translate-y-[25%]'>
        <h1 className='text-5xl text-center mb-5 '>Login</h1>
        {errors ? (
          <p className='text-center font-bold mb-2 text-red-500'>{errors}</p>
        ) : (
          ""
        )}
        <form
          onSubmit={(e) => Login(e)}
          action=''
          className='max-w-md mx-auto flex flex-col gap-2 items-center justify-center'>
          <input
            type='email'
            name='email'
            placeholder='email@provider.com'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button type='submit' className='primary font-semibold'>
            Login
          </button>
          <p>
            Don&apos;t have an account yet?{" "}
            <Link
              to={"/register"}
              className='font-semibold text-secondary underline underline-offset-2 decoration-2 under'>
              Register Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
