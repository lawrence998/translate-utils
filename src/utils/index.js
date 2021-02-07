const fs = require('fs');
const path = require('path');
/**
 * 判断文件是否存在
 * @param { String} p 路径 
 */
function exists(p) {
	return fs.existsSync(p);
}

/**
 * 判断是否是文件
 * @param { String } p 路径 
 */
function isFile(p) {
	return exists(p) && fs.statSync(p).isFile();
}
exports.isFile = isFile

/**
 * 判断是否是文件夹
 * @param { String } p 路径 
 */
function isDir(p) {
	return exists(p) && fs.statSync(p).isDirectory();
}
exports.isDir = isDir

/**
 * 得到指定路径下的所有文件路径
 * @param {String} p 路径 
 */
exports.getFileByPath = function(p) {
  let arr = [];
  findDeepFile(p);
  /**
   * 递归搜索文件夹下的文件
   * @param {String} p 路径
   */
  function findDeepFile(p) {
    if (isDir(p)) {
      let fileList = fs.readdirSync(p);
      fileList.forEach((file, index) => {
        fileList[index] = findDeepFile(path.resolve(p, file));
      })
      // return fileList;
    } else if (isFile(p)) {
      arr.push(p);
    }
  }
  return arr;
}

exports.writeFile = function(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (!err) {
        resolve();
      } else {
        reject()
      }
    });
  });
}