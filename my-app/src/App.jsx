import React from 'react';
import ProfileCard from './ProfileCard';

function App() {
  return (
    <div>
      <h1>User Profiles</h1>
      <ProfileCard
        name="Srishty Sengar"
        age={25}
        bio="Frontend developer with a passion for building scalable, user-centric applications. Loves React, clean UI, and solving real-world problems."
      />
      <ProfileCard
        name="Riddhi Patel" 
        age={30}
        bio="Enjoys traveling, photography, and experimenting with new cuisines. Always curious to learn more and improve skills."
      />
    </div>
  );
}

export default App;
