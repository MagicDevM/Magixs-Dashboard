const rateLimit = new Map();

function checkAlt(ip, userid) {
  const now = Date.now();
  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, lastRegister: now });
    return false
  }
  const record = rateLimit.get(ip);
  const timeSinceLastRegisteration = now - record.lastRegister;
  if (!timeSinceLastRegisteration < 3600000) {
    record.count += 1;
  } else {
    record.count = 1;
  }
  record.lastRegister = now;
  rateLimit.set(ip, record)
  if (record.count > 3) {
    console.log(`Alt detected for ip: ${ip}`);
    return true
  }
  return false
}

module.exports = checkAlt;