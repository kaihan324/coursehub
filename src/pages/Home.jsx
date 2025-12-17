import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { categories, courses } from "../data/courses";
import CourseCard from "../components/CourseCard";
import { Storage } from "../lib/storage";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("همه");

  // 🔥 فعال‌سازی انیمیشن اسکرول
  useScrollReveal();

  const special = useMemo(() => courses.filter((c) => c.isSpecial), []);
  const reviews = Storage.getReviews();

  const topReviews = useMemo(() => {
    return [...reviews]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 4);
  }, [reviews]);

  const goSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (cat !== "همه") params.set("cat", cat);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="d-flex flex-column gap-5">
      {/* ================= Hero ================= */}
      <section className="hero card shadow-sm reveal">
        <div className="card-body p-4 p-md-5">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7">
              <h1 className="fw-bold mb-2">
                یادگیری حرفه‌ای،<br /> یک قدم جلوتر
              </h1>

              <p className="text-muted mb-4">
                دوره مناسب خودت رو پیدا کن، رزرو کن و تجربه‌ت رو با بقیه به اشتراک بذار.
              </p>

              <form onSubmit={goSearch} className="row g-2">
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    placeholder="چی می‌خوای یاد بگیری؟"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <select
                    className="form-select"
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                  >
                    <option>همه</option>
                    {categories.map((x) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12 col-md-2 d-grid">
                  <button className="btn btn-primary">
                    جستجو
                  </button>
                </div>
              </form>
            </div>

            <div className="col-12 col-lg-5">
              <div className="p-4 bg-body-tertiary rounded-4 border reveal">
                <div className="fw-bold mb-2">دسته‌بندی‌ها</div>
                <div className="d-flex flex-wrap gap-2">
                  {categories.map((x) => (
                    <button
                      key={x}
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        navigate(`/search?cat=${encodeURIComponent(x)}`)
                      }
                    >
                      {x}
                    </button>
                  ))}
                </div>
                <div className="small text-muted mt-3">
                  مستقیم وارد صفحه جستجو می‌شی
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Special Courses ================= */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-3 reveal">
          <h4 className="mb-0">پیشنهادهای ویژه</h4>
          <Link to="/search" className="small">
            مشاهده همه
          </Link>
        </div>

        <div className="row g-3">
          {special.map((c) => (
            <div key={c.id} className="col-12 col-md-6 col-lg-4">
              <CourseCard c={c} />
            </div>
          ))}
        </div>
      </section>

      {/* ================= Reviews ================= */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-3 reveal">
          <h4 className="mb-0">نقدهای برتر کاربران</h4>
          <Link to="/reviews" className="small">
            همه نقدها
          </Link>
        </div>

        {topReviews.length === 0 ? (
          <div className="alert alert-secondary reveal">
            هنوز نظری ثبت نشده.
          </div>
        ) : (
          <div className="row g-3">
            {topReviews.map((r) => (
              <div className="col-12 col-md-6 col-lg-3 reveal" key={r.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <div className="fw-bold mb-1">{r.courseTitle}</div>
                    <div className="small text-muted mb-2">{r.userName}</div>
                    <span className="badge text-bg-primary mb-2">
                      امتیاز: {r.rating}/5
                    </span>
                    <div className="small mt-2">{r.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
