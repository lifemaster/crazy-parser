const fs = require('fs');
const iconv = require('iconv-lite');
const domain = require('domain');

const debetCreditParser = require('../parsers/debetCreditParser');

const parserDomain = domain.create();

module.exports = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const decodedData = iconv.decode(data, 'CP866');
        const dataArr = decodedData.toString().split('\r\n');
        parserDomain.run(() => resolve(debetCreditParser(dataArr)));
      }
    });

    parserDomain.on('error', err => reject(err));
  });
}
