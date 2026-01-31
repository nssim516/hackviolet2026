import { Navigate, Route, Routes } from "react-router-dom";
import AppointmentAssistant from "./pages/AppointmentAssistant";
import AppointmentReflection from "./pages/AppointmentReflection";
import HealthJournalTimeline from "./pages/HealthJournalTimeline";
import PrepareForAppointment from "./pages/PrepareForAppointment";
import Profile from "./pages/Profile";
import VisitSummaryInsights from "./pages/VisitSummaryInsights";
import WelcomeSignIn from "./pages/WelcomeSignIn";

export default function App() {
  return (
    <div className="min-h-screen bg-background-light">
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<WelcomeSignIn />} />

        {/* Core flow */}
        <Route path="/journal" element={<HealthJournalTimeline />} />
        <Route path="/prepare" element={<PrepareForAppointment />} />
        <Route path="/assistant" element={<AppointmentAssistant />} />
        <Route path="/summary" element={<VisitSummaryInsights />} />
        <Route path="/reflection" element={<AppointmentReflection />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
