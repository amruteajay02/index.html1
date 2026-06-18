const startBtn = document.getElementById('startBtn');
const candleSection = document.getElementById('candleSection');
const scratchCards = document.querySelectorAll('.scratch-card');
const continueWrapper = document.getElementById('continueWrapper');
const continueBtn = document.getElementById('continueBtn');
const candleContinueBtn = document.getElementById('candleContinueBtn');
const wishesSection = document.getElementById('wishesSection');
const letterSection = document.getElementById('letterSection');
const memoriesBtn = document.getElementById('memoriesBtn');
const memoriesSection = document.getElementById('memoriesSection');
const finalBtn = document.getElementById('finalBtn');
const finalSection = document.getElementById('finalSection');

function revealSection(section) {
  section.classList.remove('hidden');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

startBtn.addEventListener('click', () => revealSection(candleSection));
candleContinueBtn.addEventListener('click', () => revealSection(wishesSection));
continueBtn.addEventListener('click', () => revealSection(letterSection));
memoriesBtn.addEventListener('click', () => revealSection(memoriesSection));
finalBtn.addEventListener('click', () => revealSection(finalSection));

function setupScratchCard(card) {
  const message = card.dataset.message;
  const canvas = card.querySelector('canvas');
  const front = card.querySelector('.card-front');
  const back = card.querySelector('.card-back');
  back.textContent = message;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let revealed = false;

  function resizeCanvas() {
    canvas.width = card.clientWidth;
    canvas.height = card.clientHeight;
    paintOverlay();
  }

  function paintOverlay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#9ea7e0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-out';
  }

  function getPointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const pointerX = event.clientX || (event.touches && event.touches[0].clientX);
    const pointerY = event.clientY || (event.touches && event.touches[0].clientY);
    return {
      x: pointerX - rect.left,
      y: pointerY - rect.top,
    };
  }

  function scratch(event) {
    if (revealed) return;
    event.preventDefault();
    const { x, y } = getPointerPosition(event);
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2, true);
    ctx.fill();
    checkReveal();
  }

  function checkReveal() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    const total = imageData.data.length / 4;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared += 1;
    }
    if (cleared / total > 0.55) {
      revealCard();
    }
  }

  function revealCard() {
    if (revealed) return;
    revealed = true;
    front.style.opacity = '0';
    canvas.style.opacity = '0';
    setTimeout(() => {
      front.style.display = 'none';
      canvas.style.display = 'none';
      card.classList.add('revealed');
      checkAllRevealed();
    }, 250);
  }

  function checkAllRevealed() {
    const revealedCount = Array.from(scratchCards).filter((cardItem) => cardItem.classList.contains('revealed')).length;
    if (revealedCount === scratchCards.length) {
      continueWrapper.classList.remove('hidden');
    }
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  canvas.addEventListener('mousedown', () => { isDrawing = true; });
  canvas.addEventListener('mouseup', () => { isDrawing = false; });
  canvas.addEventListener('mouseleave', () => { isDrawing = false; });
  canvas.addEventListener('mousemove', (event) => { if (isDrawing) scratch(event); });

  canvas.addEventListener('touchstart', (event) => { isDrawing = true; scratch(event); });
  canvas.addEventListener('touchmove', (event) => { if (isDrawing) scratch(event); });
  canvas.addEventListener('touchend', () => { isDrawing = false; });

  canvas.addEventListener('click', () => {
    if (!revealed) {
      revealCard();
    }
  });
}

scratchCards.forEach(setupScratchCard);

// Candle Animation Logic
const candleCanvas = document.getElementById('candleCanvas');
const ctx = candleCanvas.getContext('2d');
let candleBlown = false;
let flameHeight = 60;
let flameWobble = 0;
let blowPower = 0;

function drawCandle() {
  // Clear canvas
  ctx.fillStyle = 'rgba(13, 18, 33, 0)';
  ctx.clearRect(0, 0, candleCanvas.width, candleCanvas.height);

  const centerX = candleCanvas.width / 2;
  const baseY = candleCanvas.height - 80;

  // Draw candle wax
  ctx.fillStyle = '#fff8dc';
  ctx.beginPath();
  ctx.moveTo(centerX - 30, baseY);
  ctx.lineTo(centerX + 30, baseY);
  ctx.lineTo(centerX + 20, baseY - 150);
  ctx.lineTo(centerX - 20, baseY - 150);
  ctx.closePath();
  ctx.fill();

  // Draw candle wick
  ctx.strokeStyle = '#444';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, baseY - 150);
  ctx.lineTo(centerX, baseY - 150 + 15);
  ctx.stroke();

  if (!candleBlown) {
    // Draw flame with animation
    flameWobble += Math.random() * 0.2 - 0.1;
    const currentFlameHeight = flameHeight + Math.sin(flameWobble) * 8;
    
    // Outer flame (red/orange)
    ctx.fillStyle = 'rgba(255, 69, 0, 0.8)';
    ctx.beginPath();
    ctx.moveTo(centerX - 15 + Math.sin(flameWobble) * 5, baseY - 150);
    ctx.quadraticCurveTo(centerX - 20 + Math.sin(flameWobble) * 8, baseY - 150 - currentFlameHeight * 0.6, centerX + Math.sin(flameWobble) * 10, baseY - 150 - currentFlameHeight);
    ctx.quadraticCurveTo(centerX + 20 + Math.sin(flameWobble) * 8, baseY - 150 - currentFlameHeight * 0.6, centerX + 15 + Math.sin(flameWobble) * 5, baseY - 150);
    ctx.closePath();
    ctx.fill();

    // Inner flame (yellow)
    ctx.fillStyle = 'rgba(255, 200, 0, 0.9)';
    ctx.beginPath();
    ctx.moveTo(centerX - 10 + Math.sin(flameWobble) * 3, baseY - 150);
    ctx.quadraticCurveTo(centerX - 12 + Math.sin(flameWobble) * 5, baseY - 150 - currentFlameHeight * 0.7, centerX + Math.sin(flameWobble) * 5, baseY - 150 - currentFlameHeight * 0.8);
    ctx.quadraticCurveTo(centerX + 12 + Math.sin(flameWobble) * 5, baseY - 150 - currentFlameHeight * 0.7, centerX + 10 + Math.sin(flameWobble) * 3, baseY - 150);
    ctx.closePath();
    ctx.fill();

    // Glow effect
    const gradient = ctx.createRadialGradient(centerX, baseY - 150 - currentFlameHeight * 0.5, 5, centerX, baseY - 150 - currentFlameHeight * 0.5, 40);
    gradient.addColorStop(0, 'rgba(255, 200, 0, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(centerX - 50, baseY - 200, 100, 100);
  } else {
    // Draw smoke when blown
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = `rgba(200, 200, 200, ${0.5 - i * 0.15})`;
      ctx.beginPath();
      ctx.arc(centerX + (Math.random() - 0.5) * 40, baseY - 150 - 100 - i * 30, 20 + i * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Apply blow effect
  if (blowPower > 0) {
    blowPower *= 0.95; // Decay blow power
    flameHeight = Math.max(0, flameHeight - blowPower * 2);
  }

  requestAnimationFrame(drawCandle);
}

// Mouse move for blow effect
candleCanvas.addEventListener('mousemove', (e) => {
  if (candleBlown) return;
  const rect = candleCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const centerX = candleCanvas.width / 2;
  const baseY = candleCanvas.height - 80;
  
  // Check if mouse is near flame (within blow range)
  const distToFlame = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - (baseY - 200), 2));
  if (distToFlame < 100) {
    candleCanvas.style.cursor = 'pointer';
  } else {
    candleCanvas.style.cursor = 'default';
  }
});

// Click to blow
candleCanvas.addEventListener('click', (e) => {
  if (candleBlown) return;
  const rect = candleCanvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const centerX = candleCanvas.width / 2;
  const baseY = candleCanvas.height - 80;
  
  const distToFlame = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - (baseY - 200), 2));
  if (distToFlame < 100) {
    blowPower += 15;
    if (flameHeight <= 0) {
      candleBlown = true;
      // Show continue button after candle is blown
      setTimeout(() => {
        document.getElementById('candleContinueWrapper').classList.remove('hidden');
      }, 800);
    }
  }
});

drawCandle();

window.addEventListener('load', () => {
  const instruction = document.createElement('p');
  instruction.textContent = 'Tip: Drag or click on each card to reveal the hidden wish.';
  instruction.style.color = 'var(--muted)';
  instruction.style.marginTop = '20px';
  const grid = document.getElementById('scratchCards');
  grid.parentElement.insertBefore(instruction, grid);
});
