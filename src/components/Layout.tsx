
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-200 via-purple-300 to-teal-200">
      {children}
    </div>
  );
};

export default Layout;
