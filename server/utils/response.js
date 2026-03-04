export const successResponse = (data) => ({
  code: 1,
  data,
})

export const errorResponse = (message, code = 0) => ({
  code,
  error: message,
})