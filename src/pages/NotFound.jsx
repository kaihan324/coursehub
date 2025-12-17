import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center">
      <h2>404</h2>
      <p className="text-muted">صفحه پیدا نشد.</p>
      <Link className="btn btn-primary" to="/">
        برگشت به خانه
      </Link>
    </div>
  );
}
