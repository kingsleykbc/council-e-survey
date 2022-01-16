import React from 'react';

const Endpoint = ({ method, link }) => {
	return (
		<a href={`#${link}`}>
			<span className='method'>{method}</span>
			<span>{link}</span>

      {/* STYLE */}
      <style jsx>{`
        a {
          padding: 12px;
          display: inline-block;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
		</a>
	);
};

export default Endpoint;
