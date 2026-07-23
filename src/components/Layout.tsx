import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {children}
    </div>
  );
};

export default Layout;
