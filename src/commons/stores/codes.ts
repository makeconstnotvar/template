/*
 * Если код находится в списке разрешенных, значит с сервера приходит нормальное пользовательское сообщение, которое можно показывать.
 */
const permittedCodes = [
  "FAST_ANSWER_GROUP_ALREADY_EXISTS",
  "EMPTY_FIELD",
  "NO_EXECUTOR"
]

function isPermitted(code) {
  return permittedCodes.includes(code);
}

export {isPermitted}