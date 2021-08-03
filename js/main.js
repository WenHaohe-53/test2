require.config({

    // 模块名字自定义 require.js规范不需要加js后缀
    paths: {
        'jquery': 'jquery-3.6.2.min',
        'jquery-cookie': 'jquery.cookie',
        'index': 'index'


    },
    // 引入文件有相互依赖关系
    shim: {
        'jquery-cookie': ['jquery'],
        // 如果引入require.js,都必须遵循AMD规范
    }


});
// 引入index.js再调用

require(['index'], function(index) {

    index.main();

});