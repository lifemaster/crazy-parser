const fs = require('fs');
const iconv = require('iconv-lite');
const domain = require('domain');

const debetCreditParser = require('../parsers/debetCreditParser');

module.exports = filePath => {
  const stream = fs.ReadStream(filePath);
  let dataArr;

  return new Promise((resolve, reject) => {
    const parserDomain = domain.create();

    parserDomain.on('error', err => reject(err));

    stream.on('open', () => console.log('File has been opened'));
    stream.on('close', () => console.log('File has been closed'));
    stream.on('error', err => {
      console.log('An error has occurred: ', err);
      reject(err);
    });

    stream.on('readable', () => {
      const data = stream.read();

      if (data) {
        dataArr = iconv.decode(data, 'CP866').split('\r\n');
      }
    });

    stream.on('end', () => {
      console.log('File has been read successfully');
      parserDomain.run(() => {
        resolve(debetCreditParser(dataArr));
      });
    });
  });
}
