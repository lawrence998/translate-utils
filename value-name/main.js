const fs = require('fs');
const axios = require('axios');

// 得到一个驼峰的key值
const getKeyByWord = function(word) {
    const reg = /[^ ]+/g;
    const arr = word.match(reg);
    let result = '';
    arr.forEach((item, index) => {
        if (index === 0) {
            result += item.toLowerCase();
        } else {
            result += item.toLowerCase().replace(/^[a-z]/g, (L) => L.toUpperCase());
        }
    });
    return result;
};

// 翻译请求
const translateRequest = function(obj) {
    let url = 'http://translate.google.cn/translate_a/single?client=gtx&dt=t&dj=1&ie=UTF-8&sl=auto&tl=en&q=' + encodeURI(obj.word);
	return axios({
        method: 'GET',
        url: url
	}).then((res) => {
        return {
            zh: obj.word,
            en: res.data.sentences[0].trans,
            key: getKeyByWord(res.data.sentences[0].trans)
        };
	}).catch((err) => {
        console.log('err:', err);
    });
};

function main() {
    let data = fs.readFileSync('quick/example-chinese.js', 'utf8');
    chineseSchema = data.split(/\r\n/g);
    chineseSchema = chineseSchema.map((item) => {
        let arr = item.split(' ');
        return {
            zh: arr[1],
            value: arr[0]
        };
    });
    let json = fs.readFileSync('quick/example.json', 'utf8');
    json = JSON.parse(json);

    let promiseList = [];
    json.forEach((item) => {
        let value = item.value;
        const obj = chineseSchema.find((item) => {
            return value == item.value;
        });
        item.zh = obj.zh;
        item.translateKey = item.label;
        promiseList.push(translateRequest({word: item.zh}).then((res) => {
            item.en = res.en;
        }));
    });

    Promise.all(promiseList).then(() => {
        fs.writeFile('quick/out.json', JSON.stringify(json, null, json.length), ()=>{});
    })
}
main();