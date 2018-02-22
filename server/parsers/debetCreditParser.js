module.exports = dataArr => {
  const data = getData(dataArr);

  const infoData = parseInfo(data.info);
  const debetData = parseData(data.debetData);
  const creditData = parseData(data.creditData);

  return {
    info:infoData,
    debet: debetData,
    credit: creditData
  }
}

function getData(dataArr) {
  let beginInfoIndex = 0;
  let endInfoIndex;

  let beginDebetIndex;
  let endDebetIndex;

  let beginCreaditIndex;
  let endCreditIndex;

  dataArr.forEach((item, i) => {
    // Get info index
    if (item.indexOf(String.fromCharCode(9472) + 'Дебет' + String.fromCharCode(9472)) >= 0) {
      endInfoIndex = i;
    }

    // Get dedet data
    if (item.indexOf(String.fromCharCode(9472) + 'Дебет' + String.fromCharCode(9472)) >= 0) {
      beginDebetIndex = i;
    }

    if (item.indexOf(String.fromCharCode(9472) + 'Кpедит' + String.fromCharCode(9472)) >= 0 && i > beginDebetIndex && endDebetIndex === undefined) {
      endDebetIndex = i;
    }

    // Get credit data
    if (item.indexOf(String.fromCharCode(9472) + 'Кpедит' + String.fromCharCode(9472)) >= 0) {
      beginCreaditIndex = i;
    }

    endCreditIndex = dataArr.length + 1;
  });

  return {
    info: dataArr.slice(beginInfoIndex, endInfoIndex),
    debetData: dataArr.slice(beginDebetIndex, endDebetIndex),
    creditData: dataArr.slice(beginCreaditIndex, endCreditIndex)
  };
}

function parseInfo(infoData) {
  return {
    title: infoData[0].trim(),
    begin: {
      title: infoData[2].split(':')[0].trim(),
      value: infoData[2].split(':')[1].trim().split(',').join('')
    },
    end: {
      title: infoData[3].split(':')[0].trim(),
      value: infoData[3].split(':')[1].trim().split(',').join('')
    }
  }
}

function parseData(data) {
  const result = {
    data: [],
    total: {}
  };

  data.forEach((rowData, i) => {
    if (i == 0) {
      return;
    }

    const parsedRowData = parseRowData(rowData);

    if (!Object.keys(parsedRowData).length) {
      return;
    }

    if (parsedRowData.isPrimaryRow) {
      result.data.push({
        accountNumber: parsedRowData.account,
        contragent: parsedRowData.contragent,
        amount: parsedRowData.amount
      });
    } else if (parsedRowData.isSecondaryRow) {
      result.data[result.data.length - 1].contragent += parsedRowData.value;
    } else if (parsedRowData.isTotalRow) {
      result.total.title = parsedRowData.totalTitle;
      result.total.amount = parsedRowData.totalAmount;
    }
  });

  return result;
}

function parseRowData(rowData) {
  const accountReg = /\d{1,3}-?\d{0,3}\s/;
  const amountReg = /[\d,?]+\.\d{2}/;

  const secondaryRowReg = /[А-Яа-яA-Za-z"-]+/;
  const totalRowReg = /Итого/;

  const isPrimaryRow = accountReg.test(rowData);
  const isSecondaryRow = secondaryRowReg.test(rowData);
  const isTotalRow = totalRowReg.test(rowData);

  if (isPrimaryRow) {
    const account = accountReg.exec(rowData)[0].trim();
    const contragent = rowData.replace(accountReg, '').replace(amountReg, '').trim().slice(0, -1).trim();
    const amount = amountReg.exec(rowData)[0].split(',').join('');

    return { isPrimaryRow: true, account, contragent, amount };
  } else if (isTotalRow) {
    const totalTitle = rowData.replace(amountReg, '').trim().slice(0, -1).trim();
    const totalAmount = amountReg.exec(rowData)[0].split(',').join('');

    return { isTotalRow: true, totalTitle, totalAmount };
  } else if (isSecondaryRow) {
    return { isSecondaryRow: true, value: rowData.trim() };
  }

  return {};
}
