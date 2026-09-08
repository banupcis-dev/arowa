
interface CertificateFooterProps {
  application?: any;
}

function CertificateFooter({ application }: CertificateFooterProps) {
  return (
    <div className="certificate-footer">

      {/* বাম পাশ - প্রশাসনিক কর্মকর্তা */}
      <div className="footer-signature">
        <div className="signature-space"></div>

        <div className="signature-line"></div>

        <div className="signature-title">
          প্রশাসনিক কর্মকর্তা
        </div>

        <div className="signature-title">
          ইউনিয়ন পরিষদ
        </div>

        <div className="seal-box">
          সীল
        </div>
      </div>

      {/* মাঝখানে - ইউপি সীলমোহর */}
      <div className="footer-seal">
        <div className="seal-circle">
          <span>ইউনিয়ন পরিষদ</span>
          <strong>সীলমোহর</strong>
          <span>বাংলাদেশ</span>
        </div>
      </div>

      {/* ডান পাশ - ইউপি চেয়ারম্যান */}
      <div className="footer-signature">
        <div className="signature-space"></div>

        <div className="signature-line"></div>

        <div className="signature-title">
          ইউপি চেয়ারম্যান
        </div>

        <div className="signature-title">
          ইউনিয়ন পরিষদ
        </div>

        <div className="seal-box">
          সীল
        </div>
      </div>

    </div>
  );
}

export default CertificateFooter;
