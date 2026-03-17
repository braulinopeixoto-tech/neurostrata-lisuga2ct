export function encryptAES256(data: string, key: string): string {
  // Mock AES-256 encryption for frontend simulation
  return btoa(`encrypted[${key}]:${data}`)
}

export function generatePatientHash(name: string, dob: string): string {
  // Simulating SHA-256 hash generation for patient identity
  const combined = `${name}|${dob}`
  let hash = 0
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i)
    hash |= 0
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0')
  return hex.repeat(8) // 64 chars
}
