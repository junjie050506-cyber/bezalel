import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const resetToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  if (document.scrollingElement) {
    document.scrollingElement.scrollTop = 0;
  }
};

export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  // Ensure browser never restores an old scroll position
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    // Only scroll to top on actual route/pathname changes (not on search param updates like selecting a venture)
    if (!hash) {
      resetToTop();
      requestAnimationFrame(resetToTop);
      const t1 = setTimeout(resetToTop, 20);
      const t2 = setTimeout(resetToTop, 80);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [pathname]);

  return null;
};
