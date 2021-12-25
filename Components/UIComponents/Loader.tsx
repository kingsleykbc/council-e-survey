import React from 'react';
import Spinner from "react-spinners/ScaleLoader";

const Loader = ({height="auto", size=50}) => {
  return (
    <div className='Loader'>
      <Spinner color="var(--primary)" loading={true} size={size} />
      

      {/* STYLE */}
      <style jsx>{`
        .Loader {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: ${height};
          padding: 30px;
        }
      `}</style>
    </div>
  );
};

export default Loader;