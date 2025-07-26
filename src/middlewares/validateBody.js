import createHttpError from "http-errors";

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false, // собирать все ошибки, а не первую
    });
    return next(); // важно — возвращаем, чтобы не шло дальше случайно
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', {
      errors: err.details,
    });
    return next(error); // тоже return!
  }
};
