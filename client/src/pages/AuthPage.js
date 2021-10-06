import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // console.log("error", error);
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
      console.log("DataAUTfile", data);
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
      // message('User has been logged in');
      // console.log("DataAUTfileLogin", data);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <h1>Title on the main page</h1>
        <div className="row">
          <div className="col s12 m6">
            <div className="card grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Authorization</span>
                <div className="input-field">
                  <input
                    placeholder="Enter Email"
                    id="email"
                    type="text"
                    className="yellow-input"
                    onChange={changeHandler}
                    name="email"
                    value={form.email}
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field">
                  <input
                    placeholder="Enter password"
                    id="password"
                    type="password"
                    className="yellow-input"
                    onChange={changeHandler}
                    name="password"
                    value={form.password}
                  />
                  <label htmlFor="email">Password</label>
                </div>
              </div>
              <div className="card-action"style={{textAlign: 'center'}}>
                <button
                  className="btn yellow darken-4"
                  disabled={loading}
                  onClick={loginHandler}
                  style={{marginRight: '2rem'}}
                >
                  Login
                </button>
                <button
                  className="btn grey lignten-1 black-text"
                  onClick={registerHandler}
                  disabled={loading}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
