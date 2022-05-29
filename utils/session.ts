export const checkIfAuthorized = (): boolean => {
  try {
    const token = window.localStorage.getItem('_token')
    return token ? true : false
  } catch {
    console.error('localStorage getItem error')
  }

  return false
}
