import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");

  const RegisterAccount = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/register", user, {
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
        <h1 className='text-5xl text-center mb-5 '>Register</h1>
        {errors ? (
          <p className='text-center font-bold mb-2 text-red-500'>{errors}</p>
        ) : (
          ""
        )}
        <form
          action=''
          className='max-w-md mx-auto flex flex-col gap-2 items-center justify-center'
          onSubmit={(e) => RegisterAccount(e)}>
          <input
            type='text'
            name='name'
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder='Chris Hogan'
          />
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
          <input
            type='password'
            name='confirmPassword'
            placeholder='confirm password'
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          <button
            className='primary font-semibold disabled:opacity-75'
            disabled={user.password === user.confirmPassword ? false : true}>
            Register
          </button>
          <p>
            Already have an account?{" "}
            <Link
              to={"/login"}
              className='font-semibold text-secondary underline underline-offset-2 decoration-2 under'>
              Sign In Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
