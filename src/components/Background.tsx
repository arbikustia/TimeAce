import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='bg-black w-full h-screen pt-16 text-black'>
      <main className='w-full h-full backdrop-blur-xl bg-white/30'>{children}</main>
    </div>
  );
};

export default Layout;
