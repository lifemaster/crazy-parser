module.exports = app => {
  require('./upload-files')(app);
  require('./parsers')(app);
}
