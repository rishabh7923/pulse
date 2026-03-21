import React from 'react'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto w-full">
      {children}
    </div>
  );
}

export default Container