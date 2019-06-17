/**
 * 模板函数。
 *
 * @example
 * // Returns "Hello, John!"
 * tpl('Hello, {username}!', { username: 'John' });
 * @param {string} template 模板字符串。
 * @param {Object.<string, *>} data 数据对象。
 * @returns {string} 返回编译之后的文本。
 */
function tpl(template, data) {
    var str = [];
    var res = null;
    var regexp = /(^|[^\\])\{([^\{\}]*[^\\])?\}/;

    // 确保参数类型正确
    template = '' + template;
    data = data || {};

    while ( res = regexp.exec(template) ) {
        var index = res.index;
        var match = res[0];
        var prefix = res[1];
        var key = res[2];

        // 去除 key 首尾的空格
        key = (key || '').replace(/^\s+|\s+$/g, '');
        // 保存 key 之前的文本内容
        str.push( template.substr( 0, index + prefix.length ) );
        // 保存 key 对应的值
        str.push( '' + data[key] );
        // 截取剩下未使用的模板字符串
        template = template.substr( index + match.length );
        // 重置 lastIndex（IE 在非全局匹配的模式也会改变 lastIndex）
        regexp.lastIndex = 0;
    }

    // 保存 key 之后的文本内容
    str.push(template);

    // 拼接字符串并将 \{ 和 \} 替换为 { 和 }
    str = str.join('');
    str = str.replace(/\\\{/g, '{');
    str = str.replace(/\\\}/g, '}');

    return str;
}

module.exports = tpl;
