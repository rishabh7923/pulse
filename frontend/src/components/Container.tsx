import React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl min-h-screen mx-auto w-full">
      {children}
    </div>
  );
}

export default Container