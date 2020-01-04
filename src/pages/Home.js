import React from 'react';
import Typest from '../components/Typest';

function Home() {
  return (
    <div className='container'>
      <section className='algopicker typewritter'>
        <h2 className='typewriter-text'>
          <Typest
            sentences={['Are you looking to store, search or sort data?']}
          />
        </h2>
      </section>
    </div>
  );
}

export default Home;
