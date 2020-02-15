import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
      <Link className='logo' to='/'>
        <h2>TheDecisionTree</h2>
      </Link>
      <Link className='other-links' to='/create'>
        Create
      </Link>
    </div>
  );
}

export default Header;
