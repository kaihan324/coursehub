import React, { useMemo } from "react";
import { Storage } from "../lib/storage";
import { useAuth } from "../contexts/useAuth";


export default function Profile() {
  const { user } = useAuth();

  const reservations = useMemo(() => {
    return Storage.getReservations().filter((r) => r.userId === user?.id);
  }, [user?.id]);

  const transactions = useMemo(() => {
    return Storage.getTransactions().filter((t) => t.userId === user?.id);
  }, [user?.id]);

  if (!user) return <div className="alert alert-danger">کاربر پیدا نشد.</div>;

  return (
    <div className="d-flex flex-column gap-3">
      <h3 className="mb-0">پروفایل کاربر</h3>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-12 col-md-4">
              <div className="p-3 bg-body-tertiary border rounded">نام: {user.name}</div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-3 bg-body-tertiary border rounded">ایمیل: {user.email}</div>
            </div>
            <div className="col-12 col-md-4">
              <div className="p-3 bg-body-tertiary border rounded">شماره تماس: {user.phone}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">رزروهای پیشین</h5>
          {reservations.length === 0 ? (
            <div className="alert alert-secondary mb-0">هنوز رزروی نداری.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>دوره</th>
                    <th>تعداد</th>
                    <th>تاریخ</th>
                    <th>وضعیت</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id}>
                      <td>{r.courseTitle}</td>
                      <td>{r.seats}</td>
                      <td>{new Date(r.createdAt).toLocaleString("fa-IR")}</td>
                      <td>
                        <span className="badge text-bg-success">{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">تراکنش‌ها</h5>
          {transactions.length === 0 ? (
            <div className="alert alert-secondary mb-0">هنوز تراکنشی ثبت نشده.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm align-middle">
                <thead>
                  <tr>
                    <th>مبلغ</th>
                    <th>روش</th>
                    <th>وضعیت</th>
                    <th>کد رهگیری</th>
                    <th>تاریخ</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td>{t.amount.toLocaleString()} تومان</td>
                      <td>{t.method}</td>
                      <td>
                        <span className="badge text-bg-primary">{t.status}</span>
                      </td>
                      <td>{t.ref}</td>
                      <td>{new Date(t.createdAt).toLocaleString("fa-IR")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
