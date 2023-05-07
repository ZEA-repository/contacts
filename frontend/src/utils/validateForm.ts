export const errorMessages = {
  login: 'Invalid email',
  username: 'U must have at least 2 letters',
  password: 'Password should include at least 6 characters',
  passwordConfirm: 'Passwords did not match',
}

export const validateEmail = (value: string) =>
  /^\S+@\S+$/.test(value) ? null : errorMessages.login

export const validateUsername = (value: string) =>
  value.length < 2 ? errorMessages.username : ''

export const validatePassword = (value: string) =>
  value.length <= 6 ?? errorMessages.password

export const validatePasswordConfirm = (
  value: string,
  values: { password: string }
) => value !== values.password ?? errorMessages.passwordConfirm
