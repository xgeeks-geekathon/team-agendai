import React from 'react';


export const Logo: React.FC<any> = ({ color, icon, ...props }) => {
  return (
    <img src="./Agendai.svg" {...props}  alt="Agendai"/>
  );
};
