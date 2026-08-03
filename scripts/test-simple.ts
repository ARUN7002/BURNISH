// Test basic functions from governance engine

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) - h + input.charCodeAt(i)) | 0;
  }
  return (Math.abs(h) % 10000) / 10000;
}

function seededScore(seed: string, index: number, min: number, max: number): number {
  const v = hashSeed(`${seed}:${index}`);
  return Math.round((min + v * (max - min)) * 10) / 10;
}

function clamp(v: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, v));
}

console.log('hashSeed:', hashSeed('facebook/react'));
console.log('seededScore:', seededScore('facebook/react', 1, 55, 95));
console.log('Done!');
