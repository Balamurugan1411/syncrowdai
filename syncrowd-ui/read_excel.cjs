const xlsx = require('xlsx');
const workbook = xlsx.readFile('c:/Users/Balamurugan/Downloads/SynCrowd AI/Advanced_Stadium_Gate_Dataset.xlsx');
const sheet_name_list = workbook.SheetNames;
console.log(xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));
