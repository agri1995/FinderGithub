import React from 'react'

const Alert = ({ alret }) => {
    return (
        alret !== null && (
           <div className={`text text-center`}>
           {alert.msg} 
           Please enter something...
           </div> 
        )
    );
};

export default Alert