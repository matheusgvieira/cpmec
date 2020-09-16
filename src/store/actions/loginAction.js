// Action Creator
export function setEmail(newEmail) {
  return {
    type: 'CHANGE_EMAIL',
    payload: newEmail,
  };
}
export function setPassword(newPassword) {
  return {
    type: 'CHANGE_PASSWORD',
    payload: newPassword,
  };
}
