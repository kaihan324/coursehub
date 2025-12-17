import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";


export default function Auth() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [mode, setMode] = useState("login"); // login | signup
  const [msg, setMsg] = useState(null);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const set = (setter) => (e) =>
    setter((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onLogin = (e) => {
    e.preventDefault();
    setMsg(null);

    const res = login(loginForm);
    setMsg({ type: res.ok ? "success" : "danger", text: res.message });
    if (res.ok) setTimeout(() => navigate("/profile"), 400);
  };

  const onSignup = (e) => {
    e.preventDefault();
    setMsg(null);

    const res = signup(signupForm);
    setMsg({ type: res.ok ? "success" : "danger", text: res.message });
    if (res.ok) setTimeout(() => navigate("/profile"), 400);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">ورود / ثبت‌نام</h4>
              <div className="btn-group">
                <button
                  className={`btn btn-sm ${mode === "login" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode("login")}
                  type="button"
                >
                  Login
                </button>
                <button
                  className={`btn btn-sm ${mode === "signup" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setMode("signup")}
                  type="button"
                >
                  Signup
                </button>
              </div>
            </div>

            {msg && <div className={`alert alert-${msg.type} mt-3 mb-0`}>{msg.text}</div>}

            {mode === "login" ? (
              <form className="mt-4" onSubmit={onLogin} noValidate>
                <div className="mb-3">
                  <label className="form-label">ایمیل</label>
                  <input
                    className="form-control"
                    name="email"
                    value={loginForm.email}
                    onChange={set(setLoginForm)}
                    placeholder="example@mail.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">رمز عبور</label>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    value={loginForm.password}
                    onChange={set(setLoginForm)}
                    placeholder="حداقل ۸ کاراکتر"
                  />
                </div>
                <button className="btn btn-success w-100">ورود</button>
              </form>
            ) : (
              <form className="mt-4" onSubmit={onSignup} noValidate>
                <div className="mb-3">
                  <label className="form-label">نام</label>
                  <input className="form-control" name="name" value={signupForm.name} onChange={set(setSignupForm)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">ایمیل</label>
                  <input className="form-control" name="email" value={signupForm.email} onChange={set(setSignupForm)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">شماره تماس</label>
                  <input className="form-control" name="phone" value={signupForm.phone} onChange={set(setSignupForm)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">رمز عبور</label>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    value={signupForm.password}
                    onChange={set(setSignupForm)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">تأیید رمز عبور</label>
                  <input
                    className="form-control"
                    name="confirm"
                    type="password"
                    value={signupForm.confirm}
                    onChange={set(setSignupForm)}
                  />
                </div>
                <button className="btn btn-success w-100">ثبت‌نام</button>
              </form>
            )}
          </div>
        </div>

        <div className="alert alert-info mt-3">
          <div className="fw-bold mb-1">نکته متمایز پروژه</div>
          احراز هویت و تم (Dark/Light) به صورت Context و ذخیره در LocalStorage پیاده‌سازی شده.
        </div>
      </div>
    </div>
  );
}
