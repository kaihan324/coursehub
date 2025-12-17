import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { courses, categories } from "../data/courses";
import CourseCard from "../components/CourseCard";
import useScrollReveal from "../hooks/useScrollReveal";

export default function CourseSearch() {
  const [params, setParams] = useSearchParams();

  const [q, setQ] = useState(params.get("q") || "");
  const [cat, setCat] = useState(params.get("cat") || "همه");
  const [level, setLevel] = useState(params.get("level") || "همه");
  const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") || "");
  const [sort, setSort] = useState(params.get("sort") || "rating_desc");

  // 🔥 فعال‌سازی انیمیشن اسکرول
  useScrollReveal();

  const filtered = useMemo(() => {
    let list = [...courses];

    const qq = q.trim().toLowerCase();
    if (qq) {
      list = list.filter((c) =>
        [c.title, c.instructor, c.category, c.level].some((x) =>
          String(x).toLowerCase().includes(qq)
        )
      );
    }

    if (cat !== "همه") list = list.filter((c) => c.category === cat);
    if (level !== "همه") list = list.filter((c) => c.level === level);

    if (maxPrice !== "") {
      const m = Number(maxPrice);
      if (!Number.isNaN(m)) list = list.filter((c) => c.price <= m);
    }

    if (sort === "rating_desc") list.sort((a, b) => b.rating - a.rating);
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    if (sort === "duration_asc")
      list.sort((a, b) => a.durationHours - b.durationHours);

    return list;
  }, [q, cat, level, maxPrice, sort]);

  const apply = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (cat !== "همه") p.set("cat", cat);
    if (level !== "همه") p.set("level", level);
    if (maxPrice !== "") p.set("maxPrice", maxPrice);
    if (sort) p.set("sort", sort);
    setParams(p);
  };

  const clear = () => {
    setQ("");
    setCat("همه");
    setLevel("همه");
    setMaxPrice("");
    setSort("rating_desc");
    setParams(new URLSearchParams());
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 reveal">
        <h3 className="mb-0">دوره مناسب خودت رو پیدا کن</h3>
        <div className="text-muted small">فیلتر و مرتب‌سازی سمت کلاینت</div>
      </div>

      <form onSubmit={apply} className="card shadow-sm reveal">
        <div className="card-body">
          <div className="filters-grid">
            <div className="filters-item filters-search">
              <input
                className="form-control"
                placeholder="جستجو..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="filters-item">
              <select
                className="form-select"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              >
                <option value="همه">همه دسته‌ها</option>
                {categories.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div className="filters-item">
              <select
                className="form-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="همه">همه سطح‌ها</option>
                <option value="مبتدی">مبتدی</option>
                <option value="متوسط">متوسط</option>
                <option value="پیشرفته">پیشرفته</option>
              </select>
            </div>

            <div className="filters-item">
              <input
                className="form-control"
                placeholder="حداکثر قیمت"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                inputMode="numeric"
              />
            </div>

            <div className="filters-item">
              <select
                className="form-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="rating_desc">امتیاز (زیاد → کم)</option>
                <option value="price_asc">قیمت (کم → زیاد)</option>
                <option value="price_desc">قیمت (زیاد → کم)</option>
                <option value="duration_asc">مدت زمان (کم → زیاد)</option>
              </select>
            </div>

            <div className="filters-actions">
              <button className="btn btn-primary">اعمال فیلتر</button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={clear}
              >
                پاک کردن
              </button>
            </div>
          </div>
        </div>
      </form>
      <form onSubmit={apply} className="card shadow-sm reveal">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-12 col-md-4">
              <input
                className="form-control"
                placeholder="جستجو..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="col-6 col-md-2">
              <select
                className="form-select"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
              >
                <option value="همه">همه دسته‌ها</option>
                {categories.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-6 col-md-2">
              <select
                className="form-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="همه">همه سطح‌ها</option>
                <option value="مبتدی">مبتدی</option>
                <option value="متوسط">متوسط</option>
                <option value="پیشرفته">پیشرفته</option>
              </select>
            </div>

            <div className="col-6 col-md-2">
              <input
                className="form-control"
                placeholder="حداکثر قیمت"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                inputMode="numeric"
              />
            </div>

            <div className="col-6 col-md-2">
              <select
                className="form-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="rating_desc">امتیاز (زیاد → کم)</option>
                <option value="price_asc">قیمت (کم → زیاد)</option>
                <option value="price_desc">قیمت (زیاد → کم)</option>
                <option value="duration_asc">مدت زمان (کم → زیاد)</option>
              </select>
            </div>

            <div className="col-12 d-flex gap-2 mt-2">
              <button className="btn btn-primary">اعمال فیلتر</button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={clear}
              >
                پاک کردن
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row g-3">
        {filtered.map((c) => (
          <div key={c.id} className="col-12 col-md-6 col-lg-4">
            <CourseCard c={c} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="alert alert-warning reveal">
          هیچ دوره‌ای با این فیلترها پیدا نشد.
        </div>
      )}
    </div>
  );
}
