import { ReactNode, useEffect, useState } from 'react';

interface ViewTransitionProps {
  children: ReactNode;
  viewKey: string;
  direction?: 'forward' | 'back';
}

export default function ViewTransition({ children, viewKey, direction = 'forward' }: ViewTransitionProps) {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    setIsEntering(true);
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, [viewKey]);

  return (
    <div
      key={viewKey}
      className={`view-transition ${isEntering ? 'view-transition-enter' : ''} ${
        direction === 'back' ? 'view-transition-back' : 'view-transition-forward'
      }`}
    >
      {children}
    </div>
  );
}
