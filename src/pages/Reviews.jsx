import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { Storage } from "../lib/storage";
import { useAuth } from "../contexts/useAuth";

export default function Reviews() {
  const navigate = useNavigate();
  const { user, isAuthed } = useAuth();

  const [courseId, setCourseId] = useState(courses[0]?.id || "");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [filterCourse, setFilterCourse] = useState("همه");
  const [msg, setMsg] = useState(null);

  const allReviews = Storage.getReviews();

  const list = useMemo(() => {
    let arr = [...allReviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (filterCourse !== "همه") arr = arr.filter((r) => r.courseId === filterCourse);
    return arr;
  }, [allReviews, filterCourse]);

  const submit = (e) => {
    e.preventDefault();
    setMsg(null);

    if (!isAuthed) return setMsg({ type: "danger", text: "برای ثبت نظر باید وارد بشی." });
    if (!courseId) return setMsg({ type: "danger", text: "یک دوره انتخاب کن." });

    const rNum = Number(rating);
    if (!(rNum >= 1 && rNum <= 5)) return setMsg({ type: "danger", text: "امتیاز باید 1 تا 5 باشد." });

    if (text.trim().length < 10) return setMsg({ type: "danger", text: "متن نظر حداقل 10 کاراکتر باشد." });

    const c = courses.find((x) => x.id === courseId);

    const review = {
      id: crypto.randomUUID(),
      userId: user.id,
      userName: user?.name || "کاربر",
      courseId,
      courseTitle: c?.title || "دوره",
      rating: rNum,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    Storage.setReviews([review, ...allReviews]);
    setText("");
    setRating(5);
    setMsg({ type: "success", text: "نظر ثبت شد ✅" });
  };

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="mb-3">ارسال نظر</h4>

            {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

            {!isAuthed && (
              <div className="alert alert-warning">
                وارد نیستی. برای ثبت نظر برو ورود.
                <button className="btn btn-sm btn-outline-dark ms-2" onClick={() => navigate("/auth")}>
                  ورود
                </button>
              </div>
            )}

            <form onSubmit={submit} noValidate>
              <div className="mb-3">
                <label className="form-label">انتخاب دوره</label>
                <select className="form-select" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">امتیاز</label>
                <select className="form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
                  {[5, 4, 3, 2, 1].map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">متن نظر</label>
                <textarea className="form-control" rows="4" value={text} onChange={(e) => setText(e.target.value)} />
                <div className="form-text">حداقل 10 کاراکتر</div>
              </div>

              <button className="btn btn-primary w-100">ثبت نظر</button>
            </form>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-7">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <h4 className="mb-0">لیست نقد و بررسی‌ها</h4>

          <div className="d-flex gap-2 align-items-center">
            <span className="small text-muted">فیلتر بر اساس دوره:</span>
            <select
              className="form-select form-select-sm"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="همه">همه</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 d-flex flex-column gap-2">
          {list.length === 0 ? (
            <div className="alert alert-secondary">هنوز نظری ثبت نشده.</div>
          ) : (
            list.map((r) => (
              <div key={r.id} className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between flex-wrap gap-2">
                    <div>
                      <div className="fw-bold">{r.courseTitle}</div>
                      <div className="small text-muted">
                        توسط {r.userName} • {new Date(r.createdAt).toLocaleString("fa-IR")}
                      </div>
                    </div>
                    <div className="badge text-bg-primary align-self-start">امتیاز: {r.rating}/5</div>
                  </div>

                  <div className="mt-2">{r.text}</div>

                  <button className="btn btn-link px-0 mt-2" onClick={() => navigate(`/course/${r.courseId}`)}>
                    مشاهده جزئیات دوره →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
