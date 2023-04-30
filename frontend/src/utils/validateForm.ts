export const errorMessages = {
  password: 'Password should include at least 6 characters',
  passwordConfirm: 'Passwords did not match',
}

export const validateEmail = (value) =>
  /^\S+@\S+$/.test(value) ? null : 'Invalid email'

export const validatePassword = (value) =>
  value.length <= 6 ?? errorMessages.password

export const validatePasswordConfirm = (value, values) =>
  value !== values.password ?? errorMessages.passwordConfirm
