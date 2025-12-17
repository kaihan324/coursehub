import React from "react";

export default function Footer() {
  return (
    <footer className="bg-light border-top py-4 mt-5">
      <div className="container small text-muted d-flex flex-wrap justify-content-between gap-2">
        <span>CourseHub © {new Date().getFullYear()}</span>
        <span>Frontend Demo (LocalStorage)</span>
      </div>
    </footer>
  );
}
