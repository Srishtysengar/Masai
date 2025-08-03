import React, { useState } from 'react';
import CorrectedText from './CorrectedText';

function AutoCorrectApp() {
  const [inputText, setInputText] = useState('');

  const corrections = {
    teh: 'the',
    recieve: 'receive',
    adress: 'address',
    wierd: 'weird',
    thier: 'their'
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h2>AutoCorrect App</h2>
      <input
        type="text"
        placeholder="Type here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />

      <div style={{ marginTop: '20px' }}>
        <strong>Corrected Preview:</strong>
        <CorrectedText text={inputText} corrections={corrections} />
      </div>
    </div>
  );
}

export default AutoCorrectApp;
