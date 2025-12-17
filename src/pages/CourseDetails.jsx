import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { courses } from "../data/courses";
import { Storage } from "../lib/storage";
import { isCardNumber, isCVV, isExpiryValid, isSeats } from "../lib/validators";
import RatingStars from "../components/RatingStars";
import { useAuth } from "../contexts/useAuth";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const course = useMemo(() => courses.find((c) => c.id === id), [id]);

  const [form, setForm] = useState({
    fullName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    seats: 1,
  });

  const [msg, setMsg] = useState(null);

  if (!course) {
    return (
      <div className="alert alert-danger">
        دوره پیدا نشد. <Link to="/search">بازگشت</Link>
      </div>
    );
  }

  const set = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!user?.id) return "برای رزرو باید وارد بشی.";
    if (!form.fullName.trim()) return "نام و نام‌خانوادگی را وارد کن.";
    if (!isCardNumber(form.cardNumber)) return "شماره کارت باید ۱۶ رقم باشد.";
    if (!isExpiryValid(form.expiry)) return "تاریخ انقضا معتبر نیست (MM/YY).";
    if (!isCVV(form.cvv)) return "CVV باید ۳ یا ۴ رقم باشد.";
    if (!isSeats(form.seats)) return "تعداد صندلی بین ۱ تا ۱۰ باشد.";
    return null;
  };

  const reserve = (e) => {
    e.preventDefault();
    setMsg(null);

    const err = validate();
    if (err) {
      if (err.includes("وارد")) setTimeout(() => navigate("/auth"), 500);
      return setMsg({ type: "danger", text: err });
    }

    const seatsNum = Number(form.seats);

    const reservation = {
      id: crypto.randomUUID(),
      userId: user.id,
      courseId: course.id,
      courseTitle: course.title,
      coursePrice: course.price,
      seats: seatsNum,
      status: "رزرو شد",
      createdAt: new Date().toISOString(),
    };

    const tx = {
      id: crypto.randomUUID(),
      userId: user.id,
      amount: course.price * seatsNum,
      method: "کارت بانکی",
      status: "موفق",
      createdAt: new Date().toISOString(),
      ref: String(Math.floor(Math.random() * 1_000_000_000)).padStart(9, "0"),
    };

    Storage.setReservations([reservation, ...Storage.getReservations()]);
    Storage.setTransactions([tx, ...Storage.getTransactions()]);

    setMsg({ type: "success", text: "رزرو با موفقیت انجام شد ✅" });
  };

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-7">
        <div className="card shadow-sm">
          <img src={course.image} className="card-img-top details-img" alt={course.title} />
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start gap-2">
              <h3 className="mb-1">{course.title}</h3>
              {course.isSpecial && <span className="badge text-bg-danger">ویژه</span>}
            </div>

            <div className="text-muted mb-2">
              {course.category} • {course.level} • مدرس: {course.instructor}
            </div>

            <RatingStars value={course.rating} />

            <div className="mt-3">{course.description}</div>

            <div className="row mt-3 g-2">
              <div className="col-6">
                <div className="p-3 bg-body-tertiary rounded border">مدت: {course.durationHours} ساعت</div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-body-tertiary rounded border">
                  قیمت: {course.price.toLocaleString()} تومان
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="mb-3">فرم رزرو</h4>

            {!user?.id && (
              <div className="alert alert-warning">
                برای رزرو باید وارد بشی. <Link to="/auth">رفتن به ورود</Link>
              </div>
            )}

            {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

            <form onSubmit={reserve} noValidate>
              <div className="mb-3">
                <label className="form-label">نام کامل</label>
                <input className="form-control" name="fullName" value={form.fullName} onChange={set} />
              </div>

              <div className="mb-3">
                <label className="form-label">شماره کارت (16 رقم)</label>
                <input
                  className="form-control"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={set}
                  inputMode="numeric"
                  placeholder="مثلاً 6037990000000000"
                />
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <label className="form-label">تاریخ انقضا (MM/YY)</label>
                  <input className="form-control" name="expiry" value={form.expiry} onChange={set} placeholder="08/29" />
                </div>
                <div className="col-6">
                  <label className="form-label">CVV</label>
                  <input className="form-control" name="cvv" value={form.cvv} onChange={set} inputMode="numeric" />
                </div>
              </div>

              <div className="mt-3 mb-3">
                <label className="form-label">تعداد صندلی</label>
                <input className="form-control" name="seats" value={form.seats} onChange={set} inputMode="numeric" />
                <div className="form-text">بین 1 تا 10</div>
              </div>

              <button className="btn btn-success w-100">رزرو</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
