import React from 'react';

const SectionTitle = ({children}) => {
  return (
    <h2>
      {children}

      {/* STYLE */}
      <style jsx>{`
        h2 {
          border-bottom: var(--border);
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
      `}</style>
    </h2>
  );
};

export default SectionTitle;