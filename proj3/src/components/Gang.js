import React from 'react';
import './TeamMember.css'; 

const Gang = ({ name, photoUrl }) => {
    return (
        <div className='team-member'>
            <h2>The Team</h2>
            <img src={photoUrl} alt={name} className="member-photo" />
            <p>John Vitali</p>
            <img src={photoUrl} alt={name} className="member-photo" />
            <p>Spencer Hirsch</p>
            <img src={photoUrl} alt={name} className="member-photo" />
            <p>Thomas Johnson</p>
            <img src={photoUrl} alt={name} className="member-photo" />
            <p>Trevor Schiff</p>
            <img src={photoUrl} alt={name} className="member-photo" />
            <p>Remington Greko</p>
        </div>
    );
}

export default Gang;