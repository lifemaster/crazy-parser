const fs = require('fs');
const path = require('path');
const multer = require('multer');

const debetCreditService = require('../services/debetCreditParseService');

// create folder for files if it doesn't exist
try {
  fs.mkdirSync('./files');
} catch (err) {
  if (err && err.code == 'EEXIST' && !fs.statSync('./files').isDirectory()) {
    throw err;
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './files');
  },
  filename: (req, file, cb) => {
    const filename = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, filename + ext);
  }
});

const upload = multer({
  storage,
  limits: {
    files: 1,
    fileSize: 52428800 // 50 Mb
  }
});

module.exports = function(app) {
  app.post('/api/upload', upload.array('files'), (req, res, next) => {
    console.log(`[POST -> /api]: Received files(${req.files.length}):`, req.files);

    if (!req.files.length) {
      res.json({ message: 'No files received', data: req.body });
    } else if (req.files.length == 1) {
      const file = req.files[0].path;

      debetCreditService(file).then(data => res.json(data)).catch(err => next(err));
    } else {
      res.status(400).send('Too many files uploaded');
    }
  });
}
