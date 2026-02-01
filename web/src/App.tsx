import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AppointmentAssistant from "./pages/AppointmentAssistant";
import AppointmentReflection from "./pages/AppointmentReflection";
import HealthJournalTimeline from "./pages/HealthJournalTimeline";
import PrepareForAppointment from "./pages/PrepareForAppointment";
import Profile from "./pages/Profile";
import MedicalTermsAll from "./pages/MedicalTermsAll";
import VisitDetails from "./pages/VisitDetails";
import VisitSummaryInsights from "./pages/VisitSummaryInsights";
import WelcomeSignIn from "./pages/WelcomeSignIn";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  type: "tween" as const,
  ease: "easeInOut" as const,
  duration: 0.25,
};

function AnimatedPage({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background-light">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Landing page */}
          <Route path="/" element={<AnimatedPage><WelcomeSignIn /></AnimatedPage>} />

          {/* Core flow */}
          <Route path="/journal" element={<AnimatedPage><HealthJournalTimeline /></AnimatedPage>} />
          <Route path="/prepare" element={<AnimatedPage><PrepareForAppointment /></AnimatedPage>} />
          <Route path="/assistant" element={<AnimatedPage><AppointmentAssistant /></AnimatedPage>} />
          <Route path="/summary" element={<AnimatedPage><VisitSummaryInsights /></AnimatedPage>} />
          <Route path="/visit/:id" element={<AnimatedPage><VisitDetails /></AnimatedPage>} />
          <Route path="/terms" element={<AnimatedPage><MedicalTermsAll /></AnimatedPage>} />
          <Route path="/reflection" element={<AnimatedPage><AppointmentReflection /></AnimatedPage>} />

          {/* Profile */}
          <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
