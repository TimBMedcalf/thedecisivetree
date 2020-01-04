import React from 'react';
import Routes from './routes';
import Header from './components/header/header';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Header />
      </header>
      <Routes></Routes>
    </div>
  );
}

export default App;
