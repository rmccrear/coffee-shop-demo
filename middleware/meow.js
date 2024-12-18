

function meowMiddleware(req, res, next) {
  console.log('Meow!');
  req.meow = 'Meow!';
  next();
}

module.exports = meowMiddleware;