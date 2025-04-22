
import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const threshold = 100;
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      setIsScrolled(scrollY > threshold);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);
    
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  return isScrolled;
};
