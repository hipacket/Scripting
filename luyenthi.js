var body = $response.body;

body = body.replace('const vip = 0', 'const vip = 1').replace('https://www.luyenthi123.com/file/common/grade/js/load_data.js?v=20221117', 'https://cdn.jsdelivr.net/gh/hipacket/Scripting@latest/luyenthi/load_data.js')

$done({body: body});
