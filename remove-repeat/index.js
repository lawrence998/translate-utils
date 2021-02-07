const axios = require('axios');
const fs = require('fs');
const path = require('path');

function removeRepeat(arr) {
  let valueArr = [];
  let jsonArr = [];
  arr.forEach((item) => {
    const json = JSON.stringify(item);
    // 没有重复的
    if (jsonArr.indexOf(json) < 0) {
      jsonArr.push(json);
      valueArr.push(item);
    }
  });

  return valueArr;
}

function main(path, proPath) {
  const code = fs.readFileSync(path, 'utf-8');
  const data = JSON.parse(code);

  let valueArr = [];
  let jsonArr = [];
  data.forEach((item) => {
    const json = JSON.stringify(item);
    // 没有重复的
    if (jsonArr.indexOf(json) < 0) {
      jsonArr.push(json);
      valueArr.push(item);
    }
  });

  fs.writeFile(proPath, JSON.stringify(valueArr, null, valueArr.length), (err) => {
    if (!err) {
      console.log(prodPath + '写入成功!');
    }
  })
}
main(path.resolve(__dirname, 'input.json'), path.resolve(__dirname, 'output.json'));