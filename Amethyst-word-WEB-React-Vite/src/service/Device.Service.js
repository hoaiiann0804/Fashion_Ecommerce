// fingerprint.service.js
import FingerprintJS from '@fingerprintjs/fingerprintjs'

let fpPromise = null

export const getVisitorId = async () => {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load({
      monitoring: false,
    })
  }

  const fp = await fpPromise
  const result = await fp.get()
  return result;
}
