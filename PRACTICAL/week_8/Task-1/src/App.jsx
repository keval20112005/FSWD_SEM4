import React from 'react';
import ProfileCard from './ProfileCard';

const App = () => {
  return (
    <div className="app-container">
      <h1>Personal Profile</h1>
      <ProfileCard
        name="Hardik Pandya"
        photo="https://m.economictimes.com/thumb/msid-93863149,width-1200,height-900,resizemode-4,imgsize-54170/hardik-pandya.jpg"
        bio="Hi, I'm Hardik! I'm a Cricketer."
      />
    </div>
  );
};

export default App;