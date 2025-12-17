import React, { useState } from "react";
import { Storage } from "../lib/storage";
import { isEmail, minLen } from "../lib/validators";
import { AuthContext } from "./auth.context";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => Storage.getSession());

  const user = (() => {
    if (!session?.userId) return null;
    return Storage.getUsers().find((u) => u.id === session.userId) || null;
  })();

  const login = ({ email, password }) => {
    if (!isEmail(email)) return { ok: false, message: "ایمیل معتبر نیست." };
    if (!minLen(password, 8)) return { ok: false, message: "رمز عبور حداقل ۸ کاراکتر باشد." };

    const all = Storage.getUsers();
    const u = all.find(
      (x) => x.email.toLowerCase() === email.toLowerCase() && x.password === password
    );
    if (!u) return { ok: false, message: "ایمیل یا رمز عبور اشتباهه." };

    const next = { userId: u.id };
    Storage.setSession(next);
    setSession(next);
    return { ok: true, message: "ورود موفق ✅" };
  };

  const signup = ({ name, email, phone, password, confirm }) => {
    if (!name?.trim()) return { ok: false, message: "نام را وارد کن." };
    if (!isEmail(email)) return { ok: false, message: "ایمیل معتبر نیست." };
    if (!phone?.trim()) return { ok: false, message: "شماره تماس را وارد کن." };
    if (!minLen(password, 8)) return { ok: false, message: "رمز عبور حداقل ۸ کاراکتر باشد." };
    if (password !== confirm) return { ok: false, message: "تأیید رمز عبور یکی نیست." };

    const all = Storage.getUsers();
    const exists = all.some((x) => x.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, message: "این ایمیل قبلاً ثبت شده." };

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password,
      createdAt: new Date().toISOString(),
    };

    Storage.setUsers([newUser, ...all]);

    const next = { userId: newUser.id };
    Storage.setSession(next);
    setSession(next);

    return { ok: true, message: "ثبت‌نام موفق ✅" };
  };

  const logout = () => {
    Storage.clearSession();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, user, login, signup, logout, isAuthed: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
