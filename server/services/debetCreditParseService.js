const fs = require('fs');
const iconv = require('iconv-lite');
const domain = require('domain');

const debetCreditParser = require('../parsers/debetCreditParser');

module.exports = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const decodedData = iconv.decode(data, 'CP866');
        const dataArr = decodedData.toString().split('\r\n');
        resolve(debetCreditParser(dataArr));
      }
    });
  });
}
