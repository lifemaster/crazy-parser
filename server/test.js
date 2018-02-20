const str1 = ' 361-545    Филиал ООО"Инвестопт          2,157,746.42';
const str2 = ' 362-9      NBS Commerce Company -          295,453.44';
const str3 = '            им"                 ';

const str4 = ' 361-556    ООО"Запорожский инду -           15,480.00';
const str5 = '            стриально-механическ';
const str6 = '            ий завод"           ';

const accountReg = /[\d+-?]+\s/;
const amountReg = /[\d,?]+\.\d{2}/;

const str1Account = str1.match(accountReg)[0].trim();
const str1Amount = str1.match(amountReg)[0].trim();
const str1Contragent = str1.replace(accountReg, '').replace(amountReg, '').trim();

console.log(`str1Account: |${str1Account}|`);
console.log(`str1Amount: |${str1Amount}|`);
console.log(`str1Contragent: |${str1Contragent}|`);

const str2Account = str2.match(accountReg)[0].trim();
const str2Amount = str2.match(amountReg)[0].trim();
const str2Contragent = str2.replace(accountReg, '').replace(amountReg, '').trim();

console.log(`str2Account: |${str2Account}|`);
console.log(`str2Amount: |${str2Amount}|`);
console.log(`str2Contragent: |${str2Contragent}|`);
