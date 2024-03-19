import React, { useState, useEffect } from 'react';
import './TeamMember.css';

const Team = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
      fetch('memberList.json') // Placed data in /public/ directory because you cannot import from outside src, use fetch to get it from public
        .then(response => response.json())
        .then(data => setMembers(data))
        .catch(error => console.error('Failed to load memberList.json:', error));
    }, []);

    return (
        <div className='App-body'>
            <h2>Team Members</h2>
            <div className='member-grid' style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}> 
            {members.map((member, index) => (
                <div key={index} className="member-container">
                    <img src={member.url} alt={member.name} className="member-image" />
                    <div className="member-details">
                        <h3>{member.name}</h3>
                        <p>{member.email}</p>
                        <p>{member.bio}</p>
                    </div>
                </div>
            ))}
            </div>

        </div>
    );
};

export default Team;
