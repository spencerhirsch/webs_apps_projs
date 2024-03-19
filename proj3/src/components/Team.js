
import React, { useState } from 'react';
import TeamMember from './TeamMember';

const Team = () => {

    const [hoveredMember, setHoveredMember] = useState(null);

    const teamMembers = [
        { 
            id: 1, 
            name: 'John Vitali', 
            photoUrl: './images/john.jpg' 
            about: {
                Major: 'Software Engineer'
                bio: 'John is a 4th year Software Engineer at Florida Tech, and he interns at Larsen Motorsports.'
            }
        },
        { id: 2, name: 'Spencer Hirsch', photoUrl: '../images/spenc.jpg' },
        { id: 3, name: 'Thomas Johnson', photoUrl: '../images/thomas.png' },
        { id: 4, name: 'Trevor Schiff', photoUrl: '../images/trev.jpg' },
        { id: 5, name: 'Remington Greko', photoUrl: '../images/remi.png' },
    ];

    const handleMouseEnter = (memberId) => {
        setHoveredMember(memberId);
    };

    const handleMouseLeave = () => {
        setHoveredMember(null);
    }


    return (
        <div>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              onMouseEnter={() => handleMouseEnter(member.id)}
              onMouseLeave={handleMouseLeave}
            >
              <TeamMember name={member.name} photoUrl={member.photoUrl} />
              {hoveredMember === member.id && (
                <div className="about-section">
                  <h3>{member.name}</h3>
                  <p><strong>Role:</strong> {member.about.role}</p>
                  <p><strong>Bio:</strong> {member.about.bio}</p>

                </div>
              )}
            </div>
          ))}
        </div>
      );
    };

export default Team;
