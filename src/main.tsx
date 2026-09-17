import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Preview from "./pages/preview";
import SuccessPage from "./pages/SuccessPage";
import ApplicationList from "./pages/ApplicationList";
import PaymentReceipt from "./pages/PaymentReceipt";
import CitizenFeeRegister from "./pages/CitizenFeeRegister";
import CitizenCertificateRegisterBook from "./pages/CitizenCertificateRegisterBook";
import CitizenCertificate from "./pages/CitizenCertificate";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import UnionManagement from "./pages/UnionManagement";
import UnionAdminManagement from "./pages/UnionAdminManagement";
import Login from "./pages/Login";
import UnionAdminDashboard from "./pages/UnionAdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OfficeSettings from "./pages/OfficeSettings";
import VerifyCertificate from "./VerifyCertificate";
import CertificateCorrection from "./pages/CertificateCorrection";
import CertificateCorrectionList from "./pages/CertificateCorrectionList";
import Profile from "./pages/Profile";
import CertificateManagement from "./pages/CertificateManagement";
import CitizenCertificateDashboard from "./pages/CitizenCertificateDashboard";
import SuperAdminProfile from "./pages/SuperAdminProfile";
import CitizenCertificateReprintApply from "./pages/CitizenCertificateReprintApply";
import CitizenCertificateReprintApplications from "./pages/CitizenCertificateReprintApplications";
import CorrectionPreview from "./pages/CorrectionPreview";
import BirthRegistrationApplication from "./components/birth-registration/BirthRegistrationApplication";
import BirthRegistrationPreview from "./components/birth-registration/BirthRegistrationPreview";
import DeceasedBirthRegistrationApplications from "./components/DeceasedBirthRegistrationApplications";
import DeathFeeRegister from "./components/DeathFeeRegister";
import BirthRegistrationBook from "./pages/BirthRegistrationBook";
import BirthFeeRegister from "./pages/BirthFeeRegister";
import TradeLicenseApplication from "./components/TradeLicenseApplication";
import TradeLicensePreview from "./components/TradeLicensePreview";
import TradeLicenseApplications from "./components/TradeLicenseApplications";
import TradeLicenseReceipt from "./components/TradeLicenseReceipt";
import TradeLicenseFeeRegister from "./pages/TradeLicenseFeeRegister";
import TradeLicenseRegisterBook from "./pages/TradeLicenseRegisterBook";
import TradeLicenseCertificate from "./components/TradeLicenseCertificate";
import TradeLicenseCorrection from "./pages/TradeLicenseCorrection";
import TradeLicenseCorrectionList from "./pages/TradeLicenseCorrectionList";
import TradeLicenseCorrectionView from "./pages/TradeLicenseCorrectionView";
import TradeLicenseCorrectionApplicationPrint
from "./pages/TradeLicenseCorrectionApplicationPrint";
import TradeLicenseCorrectionFee from "./pages/TradeLicenseCorrectionFee";
import TradeLicenseRenewal from "./pages/TradeLicenseRenewal";
import TradeLicenseRenewalApplications from "./pages/TradeLicenseRenewalApplications";
import TradeLicenseRenewalFee from "./pages/TradeLicenseRenewalFee";
import DeceasedBirthCertificate from "./components/DeceasedBirthCertificate";
import DeathRegistrationApplication from "./components/DeathRegistrationApplication";
import DeathRegistrationApplications from "./components/DeathRegistrationApplications";
import DeathRegistrationBook from "./components/DeathRegistrationBook";
import DeathFeeVoucher from "./components/DeathFeeVoucher";
import DeathRegistrationPreview from "./components/DeathRegistrationPreview";
import DeathRegistrationCertificate from "./components/DeathRegistrationCertificate";
import WarishCertificateApplication from "./components/WarishCertificateApplication";
import WarishCertificatePreview from "./components/WarishCertificatePreview";
import WarishCertificateApplicationList from "./components/WarishCertificateApplicationList";
import DeathRegistrationCorrection from "./components/DeathRegistrationCorrection";
import DeathRegistrationCorrectionList from "./components/DeathRegistrationCorrectionList";
import DeathRegistrationCorrectionView from "./components/DeathRegistrationCorrectionView";
import DeathRegistrationCorrectionFee from "./components/DeathRegistrationCorrectionFee";
import DeathRegistrationReprint from "./components/DeathRegistrationReprint";
import DeathRegistrationReprintApplications from "./components/DeathRegistrationReprintApplications";
import SameNameCertificate from "./components/sameNameCertificate";
import SameNameCertificateApplications from "./components/SameNameCertificateApplications";
import SameNameCertificatePreview from "./components/SameNameCertificatePreview";
import SameNameCertificateBook from "./components/SameNameCertificateBook";
import SameNameCertificatePrint from "./components/SameNameCertificatePrint";
import SameNameCertificateFeeRegister
  from "./components/SameNameCertificateFeeRegister";
  import Seal from "./components/Seal";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<App />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/applications" element={<ApplicationList />} />
        <Route path="/payment-receipt" element={<PaymentReceipt />} />
        <Route path="/citizen-fee-register" element={<CitizenFeeRegister />} />
        <Route path="/citizen-certificate-register-book"
                 element={<CitizenCertificateRegisterBook />}/>
        <Route path="/citizen-certificate"
                element={<CitizenCertificate />}/>
        <Route path="/super-admin"
                element={<SuperAdminDashboard />}/>
        <Route path="/union-management" element={<UnionManagement />}/>
        <Route path="/union-admin-management"
                 element={<UnionAdminManagement />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/union-admin-dashboard"
                element={<ProtectedRoute role="unionadmin"> <UnionAdminDashboard /> </ProtectedRoute>}/>
        <Route path="/super-admin"element={<ProtectedRoute role="superadmin">
            <SuperAdminDashboard /> </ProtectedRoute>}/>

        <Route path="/office-settings"element={
        <ProtectedRoute role="unionadmin"> <OfficeSettings /> </ProtectedRoute>}/>
        <Route path="/verify/:registerNo" element={<VerifyCertificate />}/>
        <Route path="/certificate-correction" element={<CertificateCorrection />}/>

<Route
  path="/certificate-correction-list"
  element={<CertificateCorrectionList />}
/>
<Route
  path="/certificate-correction-view"
  element={<CorrectionPreview />}
/>
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/certificate-management"
  element={
    <ProtectedRoute role="superadmin">
      <CertificateManagement />
    </ProtectedRoute>
  }
/>
<Route
  path="/citizen-certificate-dashboard"
  element={
    <ProtectedRoute role="superadmin">
      <CitizenCertificateDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/super-admin-profile"
  element={
    <ProtectedRoute role="superadmin">
      <SuperAdminProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/citizen-certificate-reprint-apply"
  element={<CitizenCertificateReprintApply />}
/>

<Route
  path="/citizen-certificate-reprint-applications"
  element={<CitizenCertificateReprintApplications />}
/>
<Route
  path="/birth-registration-application"
  element={<BirthRegistrationApplication />}
/>

<Route
  path="/birth-registration-preview"
  element={<BirthRegistrationPreview />}
/>
<Route
  path="/deceased-birth-registration-applications"
  element={<DeceasedBirthRegistrationApplications />}
/>
<Route
  path="/death-registration-reprint"
  element={<DeathRegistrationReprint />}
/>
<Route
  path="/death-registration-reprint-applications"
  element={<DeathRegistrationReprintApplications />}
/>
<Route
  path="/birth-registration-book"
  element={<BirthRegistrationBook />}
/>

<Route
  path="/birth-fee-register"
  element={<BirthFeeRegister />}
/>
<Route
  path="/trade-license-application"
  element={<TradeLicenseApplication />}
/>
<Route
  path="/trade-license-preview"
  element={<TradeLicensePreview />}
/>
<Route
  path="/trade-license-applications"
  element={<TradeLicenseApplications />}
/>
<Route
  path="/trade-license-receipt"
  element={<TradeLicenseReceipt />}
/>
<Route
  path="/trade-license-fee-register"
  element={<TradeLicenseFeeRegister />}
/>
<Route
  path="/trade-license-register-book"
  element={<TradeLicenseRegisterBook />}
/>
<Route
  path="/trade-license-certificate"
  element={<TradeLicenseCertificate />}
/>
<Route
  path="/trade-license-correction"
  element={<TradeLicenseCorrection />}
/>
<Route
  path="/trade-license-correction-list"
  element={<TradeLicenseCorrectionList />}
/>
<Route
  path="/trade-license-correction-view"
  element={<TradeLicenseCorrectionView />}
/>
<Route
  path="/trade-license-correction-application-print"
  element={
    <TradeLicenseCorrectionApplicationPrint />
  }
/>
<Route
  path="/trade-license-correction-fee"
  element={<TradeLicenseCorrectionFee />}
/>
<Route
  path="/trade-license-renewal"
  element={<TradeLicenseRenewal />}
/>
<Route
  path="/renewal-applications"
  element={<TradeLicenseRenewalApplications />}
/>
<Route
  path="/trade-license-renewal-applications"
  element={<TradeLicenseRenewalApplications />}
/>
<Route
  path="/trade-license-renewal-fee"
  element={<TradeLicenseRenewalFee />}
/>
<Route
  path="/deceased-birth-certificate"
  element={<DeceasedBirthCertificate />}
/>
<Route
  path="/death-registration-application"
  element={<DeathRegistrationApplication />}
/>
<Route
  path="/death-registration-applications"
  element={<DeathRegistrationApplications />}
/>
<Route
  path="/death-registration-correction-list"
  element={<DeathRegistrationCorrectionList />}
/>
<Route
  path="/death-registration-correction-fee"
  element={<DeathRegistrationCorrectionFee />}
/>
<Route
  path="/death-registration-book"
  element={<DeathRegistrationBook />}
/>
<Route
  path="/death-fee-voucher"
  element={<DeathFeeVoucher />}
/>
<Route
  path="/death-fee-register"
  element={<DeathFeeRegister />}
/>
<Route
  path="/death-registration-preview"
  element={<DeathRegistrationPreview />}
/>
<Route
  path="/death-registration-certificate"
  element={<DeathRegistrationCertificate />}
/>
<Route
  path="/death-registration-correction"
  element={<DeathRegistrationCorrection />}
/>
<Route
  path="/death-registration-correction-view"
  element={<DeathRegistrationCorrectionView />}
/>
<Route
  path="/warish-certificate"
  element={<WarishCertificateApplication />}
/>
<Route
  path="/warish-certificate-preview"
  element={<WarishCertificatePreview />}
/>
<Route
  path="/warish-certificate-list"
  element={<WarishCertificateApplicationList />}
/>
<Route
  path="/same-name-certificate-application"
  element={<SameNameCertificate />}
/>
<Route
  path="/same-name-certificate-applications"
  element={<SameNameCertificateApplications />}
/>
<Route
  path="/same-name-certificate-preview"
  element={<SameNameCertificatePreview />}
/>
<Route
  path="/same-name-certificate-book"
  element={<SameNameCertificateBook />}
/>
<Route
  path="/same-name-certificate-certificate"
  element={<SameNameCertificatePrint />}
/>
<Route
  path="/same-name-certificate-fee-register"
  element={<SameNameCertificateFeeRegister />}
/>
<Route path="/seal" element={<Seal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
