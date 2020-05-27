import React from 'react';
import "../css/button.css";

const SteamButton = ({ 
    onClick, 
    type,
    buttonStyle
}) => {

    return (
        <button className={`btn ${buttonStyle}`} type={type}  onClick={onClick}/>
    );
};

export default SteamButton;