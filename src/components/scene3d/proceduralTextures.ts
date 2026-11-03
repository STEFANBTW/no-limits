import * as THREE from 'three';

/**
 * Creates a procedural smoked oak herringbone/chevron parquet floor texture.
 */
export function createParquetFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Base deep charcoal/warm oak floor
  ctx.fillStyle = '#1e1a16';
  ctx.fillRect(0, 0, 1024, 1024);

  const plankW = 64;
  const plankH = 256;
  const cols = Math.ceil(1024 / plankW) + 2;
  const rows = Math.ceil(1024 / plankH) + 2;

  // Oak tone palette (smoked architectural dark oak)
  const tones = [
    '#25201b',
    '#221d19',
    '#2a241e',
    '#28221c',
    '#1e1a16',
    '#2d2620',
    '#211c18'
  ];

  ctx.lineWidth = 1.5;

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const x = c * plankW;
      const y = r * plankH;

      ctx.save();
      ctx.translate(x, y);

      // Random plank tone
      const toneIndex = (Math.abs(r * 13 + c * 37)) % tones.length;
      ctx.fillStyle = tones[toneIndex];
      ctx.fillRect(1, 1, plankW - 2, plankH - 2);

      // Subtle wood grain lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 0.8;
      const grainCount = 6 + (Math.abs(r * 7 + c * 11) % 6);
      for (let g = 0; g < grainCount; g++) {
        const gx = 4 + g * (plankW / grainCount) + (Math.sin(g + r) * 3);
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.bezierCurveTo(
          gx + 4, plankH * 0.33,
          gx - 3, plankH * 0.66,
          gx + 2, plankH
        );
        ctx.stroke();
      }

      // Plank bevel seam / shadow
      ctx.strokeStyle = '#0e0c0a';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, plankW, plankH);

      // Subtle top highlight seam
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(1, 1);
      ctx.lineTo(plankW - 1, 1);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Micro surface stippling for natural varnish sheen
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 8;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates a luxury bouclé woven wool rug texture.
 */
export function createBoucleRugTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Base warm graphite / charcoal heather tone
  ctx.fillStyle = '#272421';
  ctx.fillRect(0, 0, 512, 512);

  // Woven loops and nubs
  const step = 8;
  for (let y = 0; y < 512; y += step) {
    for (let x = 0; x < 512; x += step) {
      const offset = (Math.sin(x * 0.1) + Math.cos(y * 0.1)) * 2;
      const radius = 2.5 + Math.random() * 1.5;

      const lightness = 38 + Math.floor(Math.random() * 18);
      ctx.fillStyle = `rgb(${lightness + 6}, ${lightness + 3}, ${lightness})`;
      ctx.beginPath();
      ctx.arc(x + step / 2 + offset, y + step / 2, radius, 0, Math.PI * 2);
      ctx.fill();

      // Shadow under loop
      ctx.fillStyle = 'rgba(10, 8, 7, 0.45)';
      ctx.beginPath();
      ctx.arc(x + step / 2 + offset, y + step / 2 + 1.2, radius * 0.8, 0, Math.PI);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 6);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates a museum-grade contemporary textured abstract artwork texture.
 */
export function createAbstractArtTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Fine Belgian raw linen ground
  ctx.fillStyle = '#1e1c19';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle linen weave texture
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < 1024; i += 4) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(1024, i);
    ctx.stroke();
  }

  // Abstract architectural fields (monochrome with gold and raw umber)
  // Field 1: Deep Charcoal wash
  const grad1 = ctx.createLinearGradient(120, 100, 800, 900);
  grad1.addColorStop(0, '#151311');
  grad1.addColorStop(0.5, '#282420');
  grad1.addColorStop(1, '#110f0e');
  ctx.fillStyle = grad1;
  ctx.beginPath();
  ctx.moveTo(140, 120);
  ctx.lineTo(880, 180);
  ctx.lineTo(820, 860);
  ctx.lineTo(160, 780);
  ctx.closePath();
  ctx.fill();

  // Field 2: Architectural arch & diagonal cut
  ctx.fillStyle = '#2f2820';
  ctx.beginPath();
  ctx.arc(512, 480, 260, Math.PI * 0.9, Math.PI * 1.9);
  ctx.lineTo(512, 720);
  ctx.closePath();
  ctx.fill();

  // Field 3: Rich Gold leaf band / patinated bronze accent
  const goldGrad = ctx.createLinearGradient(200, 500, 800, 560);
  goldGrad.addColorStop(0, '#b8860b');
  goldGrad.addColorStop(0.3, '#d4af37');
  goldGrad.addColorStop(0.6, '#f3e5ab');
  goldGrad.addColorStop(0.8, '#aa771c');
  goldGrad.addColorStop(1, '#785310');
  ctx.fillStyle = goldGrad;
  ctx.fillRect(240, 520, 540, 24);

  // Sculptural gestural white charcoal mark
  ctx.strokeStyle = 'rgba(240, 235, 225, 0.4)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(280, 320);
  ctx.bezierCurveTo(460, 240, 600, 420, 740, 360);
  ctx.stroke();

  // Fine minimalist graphite line
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(340, 640);
  ctx.lineTo(680, 640);
  ctx.stroke();

  // Signature in bottom right
  ctx.font = '14px serif';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.fillText('Atelier 2NO / 26', 720, 920);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates a fluted walnut wood texture for the sculptural pedestal.
 */
export function createFlutedWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Base dark walnut
  ctx.fillStyle = '#221b15';
  ctx.fillRect(0, 0, 512, 256);

  // Vertical fluted ridges with highlights and shadows
  const fluteWidth = 16;
  for (let x = 0; x < 512; x += fluteWidth) {
    const fluteGrad = ctx.createLinearGradient(x, 0, x + fluteWidth, 0);
    fluteGrad.addColorStop(0, '#100c09'); // deep shadow crease
    fluteGrad.addColorStop(0.25, '#2e241c');
    fluteGrad.addColorStop(0.5, '#3e3226'); // flute ridge highlight
    fluteGrad.addColorStop(0.75, '#292018');
    fluteGrad.addColorStop(1, '#0e0b08'); // shadow crease

    ctx.fillStyle = fluteGrad;
    ctx.fillRect(x, 0, fluteWidth, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.repeat.set(2, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates a Roman travertine marble top texture.
 */
export function createTravertineTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Warm honed cream travertine
  ctx.fillStyle = '#c5baad';
  ctx.fillRect(0, 0, 512, 512);

  // Pores and subtle linear veins
  ctx.strokeStyle = 'rgba(120, 105, 90, 0.2)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 40; i++) {
    const y = Math.random() * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(150, y + (Math.random() - 0.5) * 20, 350, y + (Math.random() - 0.5) * 20, 512, y + (Math.random() - 0.5) * 10);
    ctx.stroke();
  }

  // Micro speckles
  for (let i = 0; i < 800; i++) {
    const px = Math.random() * 512;
    const py = Math.random() * 512;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(80, 68, 55, 0.25)' : 'rgba(255, 250, 240, 0.3)';
    ctx.fillRect(px, py, Math.random() * 2 + 1, Math.random() * 1.5 + 0.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
