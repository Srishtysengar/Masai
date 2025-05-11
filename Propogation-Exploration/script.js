function setupPropagation(id, name) {
    const element = document.getElementById(id);
  
    element.addEventListener(
      'click',
      (e) => {
        alert(`${name} (Capturing phase)`);
      },
      true
    );
  
    element.addEventListener('click', (e) => {
      alert(`${name} (Bubbling phase)`);
    });
  }
  
  setupPropagation('div1', 'Div 1');
  setupPropagation('div2', 'Div 2');
  setupPropagation('div3', 'Div 3');
  
  setupPropagation('btn1', 'Button 1');
  setupPropagation('btn2', 'Button 2');
  
  const btn3 = document.getElementById('btn3');
  
  btn3.addEventListener(
    'click',
    (e) => {
      alert('Button 3 (Capturing phase)');
      e.stopPropagation(); 
    },
    true
  );
  
  btn3.addEventListener('click', (e) => {
    alert('Button 3 (Bubbling phase)');
    e.stopPropagation(); 
  });
  