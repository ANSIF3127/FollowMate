import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <div className={`bg-white rounded-xl flex items-center justify-center shadow-lg ${className}`}>
            <svg
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full p-2"
            >
                {/* FM Letter Design in Black */}
                <path
                    d="M15 15 L15 45 M15 15 L25 30 M25 30 L35 15 M35 15 L35 45"
                    stroke="#000"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default Logo;
