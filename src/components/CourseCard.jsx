import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

export default function CourseCard({ c }) {
  return (
    <div className="course-card card h-100 reveal">
      <div className="course-img-wrapper">
        <img src={c.image} className="course-img" alt={c.title} />
        {c.isSpecial && <span className="course-badge">ویژه</span>}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{c.title}</h5>

        <div className="course-meta">
          {c.category} • {c.level}
        </div>

        <RatingStars value={c.rating} />

        <p className="course-desc">
          {c.description.slice(0, 70)}...
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="course-price">
            {c.price.toLocaleString()} تومان
          </span>
          <Link to={`/course/${c.id}`} className="btn btn-outline-primary btn-sm">
            مشاهده →
          </Link>
        </div>
      </div>
    </div>
  );
}
