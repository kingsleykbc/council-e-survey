import React from 'react';

const Section = ({children}) => {
  return (
    <div>
      {children}

      {/* STYLE */}
      <style jsx>{`
        div {
          max-width: 900px;
          padding: 20px;
          margin: auto;
        }
      `}</style>
    </div>
  );
};

export default Section;