# 使用指南：
1. 将需要翻译的文件放到`src/App`的目录下，然后执行`npm run dev`或者`npm run build`。
2. 处理好的翻译结果将在`src/App`目录下会生成一个`translateStorage.json`的json文件。
# 注意
针对两类文件翻译：`.vue`和`.js`。针对两种文件有不同的处理：
* .vue：
自动把文件内html标签的中文转换为**lang('key')**，把script标签内中文转换为**this.lang('key')**

* .js:

若文件名叫executor处理和.vue一致。否则自动把中文转换为**key**