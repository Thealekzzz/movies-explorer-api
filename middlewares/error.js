export default (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  console.log(err);

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Серверная ошибка'
      : message,
  });

  next();
};
