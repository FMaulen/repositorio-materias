export function normalizeRut(rutStr) {
  if (!rutStr) return '';
  return rutStr.replace(/[.\-]/g, '').trim().toUpperCase();
}

export function computeDV(body) {
  let sum = 0, mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const mod = 11 - (sum % 11);
  if (mod === 11) return '0';
  if (mod === 10) return 'K';
  return String(mod);
}

export function validateRut(rutStr) {
  const clean = normalizeRut(rutStr);
  if (clean.length < 2) return false;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  if (!/^\d+$/.test(body)) return false;
  return computeDV(body) === dv;
}

export function formatRut(rutStr) {
  const clean = normalizeRut(rutStr);
  if (clean.length < 2) return clean;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  const rev = body.split('').reverse().join('');
  const chunks = rev.match(/.{1,3}/g) || [];
  const withDots = chunks.map(c => c.split('').reverse().join('')).reverse().join('.');
  return `${withDots}-${dv}`;
}