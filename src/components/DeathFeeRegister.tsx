
import { useEffect, useState } from "react";

function DeathFeeRegister() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [payments, setPayments] = useState<any[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    const savedFees = JSON.parse(
      localStorage.getItem("deathFeeRegister") || "[]"
    );

    setPayments(savedFees);
    setFilteredPayments(savedFees);
  }, []);

  const convertToDate = (dateString: string) => {
    if (!dateString) return null;

    const parts = dateString.split("/");

    if (parts.length !== 3) return null;

    return new Date(
      Number(parts[2]),
      Number(parts[1]) - 1,
      Number(parts[0])
    );
  };

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      setFilteredPayments(payments);
      return;
    }

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    endDate.setHours(23, 59, 59, 999);

    const result = payments.filter((payment: any) => {
      const paymentDate = convertToDate(payment.paymentDate);

      if (!paymentDate) return false;

      return paymentDate >= startDate && paymentDate <= endDate;
    });

    setFilteredPayments(result);
  };

  const totalApplicationFee = filteredPayments.reduce(
    (sum, payment) =>
      sum + (Number(payment.applicationFee) || 0),
    0
  );

  const totalServiceCharge = filteredPayments.reduce(
    (sum, payment) =>
      sum + (Number(payment.serviceCharge) || 0),
    0
  );

  const grandTotal =
    totalApplicationFee + totalServiceCharge;

  return (
    <div className="preview-container">

      <h2>মৃত্যু নিবন্ধন ফি আদায় রেজিস্টার</h2>

      <div className="register-header">

        {/* প্রতিবেদন কাল */}
        <div className="report-period">

          <label>প্রতিবেদন কাল</label>

          <input
            type="date"
            className="input-field"
            value={fromDate}
            onChange={(e) =>
              setFromDate(e.target.value)
            }
          />

          <span>হতে</span>

          <input
            type="date"
            className="input-field"
            value={toDate}
            onChange={(e) =>
              setToDate(e.target.value)
            }
          />

          <button
            className="submit-btn"
            onClick={handleSearch}
          >
            অনুসন্ধান
          </button>

        </div>

        {/* ফিল্টার এবং প্রিন্ট */}
        <div className="page-filter">

          <label>ফিল্টার</label>

          <select
            className="input-field"
            value={pageSize}
            onChange={(e) =>
              setPageSize(Number(e.target.value))
            }
          >
            <option value={12}>১২</option>
            <option value={25}>২৫</option>
            <option value={50}>৫০</option>
            <option value={100}>১০০</option>
          </select>

          <button
            className="submit-btn"
            onClick={() => window.print()}
          >
            প্রিন্ট
          </button>

        </div>

      </div>

      {/* ==========================================
          FEE TABLE
      ========================================== */}

      <div className="table-scroll">

        <table className="register-table">

          <thead>

            <tr>
              <th>ক্রমিক নং</th>
              <th>তারিখ</th>
              <th>রসিদ নং</th>
              <th>BRN</th>
              <th>আবেদনকারীর নাম</th>
              <th>সেবার নাম</th>
              <th>আবেদন ফি</th>
              <th>সার্ভিস চার্জ</th>
              <th>মোট টাকা</th>
            </tr>

          </thead>

          <tbody>

            {filteredPayments
              .slice(0, pageSize)
              .map((payment, index) => (

                <tr
                  key={payment.brn || index}
                >

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {payment.paymentDate || "-"}
                  </td>

                  <td>
                    {payment.receiptNo || "-"}
                  </td>

                  <td>
                    {payment.brn || "-"}
                  </td>

                  <td>
                    {payment.applicantName ||
                      payment.deceasedNameBn ||
                      "-"}
                  </td>

                  <td>
                    মৃত্যু নিবন্ধন
                  </td>

                  <td>
                    {payment.applicationFee || 0}
                  </td>

                  <td>
                    {payment.serviceCharge || 0}
                  </td>

                  <td>
                    {(Number(payment.applicationFee) || 0) +
                      (Number(payment.serviceCharge) || 0)}
                  </td>

                </tr>

              ))}

          </tbody>

        </table>

        {/* ==========================================
            TOTAL
        ========================================== */}

        <div className="register-total">

          <p>
            <strong>
              মোট আবেদন ফি :
            </strong>{" "}
            {totalApplicationFee} টাকা
          </p>

          <p>
            <strong>
              মোট সার্ভিস চার্জ :
            </strong>{" "}
            {totalServiceCharge} টাকা
          </p>

          <h3>
            <strong>
              সর্বমোট আদায় :
            </strong>{" "}
            {grandTotal} টাকা
          </h3>

        </div>

        {/* ==========================================
            SIGNATURE
        ========================================== */}

        <div className="register-signature">

          <div>
            ........................................
            <br />
            ইউনিয়ন প্রশাসনিক কর্মকর্তা
          </div>

          <div>
            ........................................
            <br />
            ইউপি চেয়ারম্যান
          </div>

        </div>

      </div>

    </div>
  );
}

export default DeathFeeRegister;
