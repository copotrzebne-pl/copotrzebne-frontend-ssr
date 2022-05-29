export const isEmail = (email: string): boolean => {
  return /(.+)@(.+){2,}\.(.+){2,}/.test(email)
}
