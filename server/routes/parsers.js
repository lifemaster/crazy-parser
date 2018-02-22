const config = require('../config');

module.exports = app => {
  app.get('/api/parsers', (req, res, next) => {
    res.json(config.parsers);
  })
}
