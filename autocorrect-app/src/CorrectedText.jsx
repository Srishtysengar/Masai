import React from 'react';

function CorrectedText({ text, corrections }) {
  const words = text.split(' ');

  let correctionCount = 0;

  const correctedWords = words.map((word) => {
    const cleanWord = word.toLowerCase();
    if (corrections[cleanWord]) {
      correctionCount++;
      return corrections[cleanWord];
    }
    return word;
  });

  return (
    <div style={{ marginTop: '10px', lineHeight: '1.5em' }}>
      <p>{correctedWords.join(' ')}</p>
      <p style={{ fontSize: '14px', color: 'gray' }}>
        {correctionCount} word{correctionCount !== 1 ? 's' : ''} corrected
      </p>
    </div>
  );
}

export default CorrectedText;
