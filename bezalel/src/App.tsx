/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { EcosystemPage } from './pages/EcosystemPage';
import { StoryPage } from './pages/StoryPage';
import { ImpactPage } from './pages/ImpactPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { ClientsPage } from './pages/ClientsPage';
import { ContactPage } from './pages/ContactPage';
import { StartPage } from './pages/StartPage';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgressBar } from './components/MotionContainer';
import { SEOHead } from './components/SEOHead';
import { PageTransition } from './components/PageTransition';
import { PremiumEffects } from './components/PremiumEffects';
import { StickyCTA } from './components/StickyCTA';
import { ClosingCTA } from './components/ClosingCTA';

interface AnimatedRoutesProps {
  onOpenInquiry: (businessId?: string, audience?: string) => void;
  inquiryBusinessId?: string;
  inquiryAudience?: string;
}

const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({
  onOpenInquiry,
  inquiryBusinessId,
  inquiryAudience,
}) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex-1"
        onAnimationStart={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }}
      >
        <Routes location={location}>
          <Route
            path="/"
            element={
              <HomePage
                onOpenInquiry={(bId, role) => onOpenInquiry(bId, role)}
              />
            }
          />
          <Route
            path="/start"
            element={
              <StartPage
                onOpenInquiry={(bId, role) => onOpenInquiry(bId, role)}
              />
            }
          />
          <Route
            path="/ecosystem"
            element={
              <EcosystemPage
                onOpenInquiry={(bId) => onOpenInquiry(bId)}
              />
            }
          />
          <Route
            path="/story"
            element={
              <StoryPage
                onOpenInquiry={(bId) => onOpenInquiry(bId)}
              />
            }
          />
          <Route
            path="/impact"
            element={
              <ImpactPage
                onOpenInquiry={(role) => onOpenInquiry(undefined, role)}
              />
            }
          />
          <Route
            path="/marketplace"
            element={<Navigate to="/ecosystem" replace />}
          />
          <Route
            path="/leadership"
            element={
              <LeadershipPage
                onOpenInquiry={(role) => onOpenInquiry(undefined, role)}
              />
            }
          />
          <Route
            path="/clients"
            element={<ClientsPage />}
          />
          <Route
            path="/company/:id"
            element={<Navigate to="/ecosystem" replace />}
          />
          <Route
            path="/venture/:id"
            element={<Navigate to="/ecosystem" replace />}
          />
          <Route
            path="/inquire"
            element={
              <ContactPage
                preselectedBusinessId={inquiryBusinessId}
                preselectedAudience={inquiryAudience}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <ContactPage
                preselectedBusinessId={inquiryBusinessId}
                preselectedAudience={inquiryAudience}
              />
            }
          />
          <Route
            path="/loading"
            element={<LoadingScreen standalone />}
          />
          {/* Catch-all route */}
          <Route
            path="*"
            element={
              <HomePage
                onOpenInquiry={(bId) => onOpenInquiry(bId)}
              />
            }
          />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inquiryBusinessId, setInquiryBusinessId] = useState<string | undefined>(undefined);
  const [inquiryAudience, setInquiryAudience] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const handleOpenInquiry = (businessId?: string, audience?: string) => {
    setInquiryBusinessId(businessId);
    setInquiryAudience(audience);
    const params = new URLSearchParams();
    if (businessId) params.set('venture', businessId);
    if (audience) params.set('audience', audience);
    const queryString = params.toString();
    navigate(queryString ? `/inquire?${queryString}` : '/inquire');
  };

  return (
    <>
      <SEOHead />
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            key="global-loader"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <PremiumEffects />
      <StickyCTA onOpen={() => handleOpenInquiry()} />
      <PageTransition />
      <ScrollProgressBar />

      <div className="relative bg-[#FAF9F6] text-[#141812] flex flex-col font-sans selection:bg-[#1E2918] selection:text-[#FAF9F6] w-full max-w-full overflow-x-clip min-h-screen">
        {/* GLOBAL HEADER & NAVIGATION BAR */}
        <Header
          onOpenInquiry={() => handleOpenInquiry()}
        />

        {/* DEDICATED PAGE ROUTES */}
        <main className="relative z-10 flex-1 flex flex-col">
          <AnimatedRoutes
            onOpenInquiry={handleOpenInquiry}
            inquiryBusinessId={inquiryBusinessId}
            inquiryAudience={inquiryAudience}
          />
        </main>

        <ClosingCTA onOpen={(id) => handleOpenInquiry(id)} />

        {/* GLOBAL FOOTER */}
        <Footer
          onOpenInquiry={(bId) => handleOpenInquiry(bId)}
        />
        <div className="h-16 sm:hidden" aria-hidden="true" />
      </div>
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
