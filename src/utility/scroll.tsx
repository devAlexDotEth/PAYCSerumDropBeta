// ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function scrollToTop() {
  window.scrollTo(0, 0);
}

export function ScrollToTopOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [location]);

  return null; // This component doesn't render anything
}
