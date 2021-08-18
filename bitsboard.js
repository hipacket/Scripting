//https://p16-buy.itunes.apple.com/WebObjects/MZFastFinance.woa/wa/inAppCheckDownloadQueue
let headers = $response.headers;
let obj = JSON.parse($response.body);
obj = {"Expires":"Thu, 01 Jan 1970 00:00:00 GMT","Set-Cookie":{"Expires":"Mon, 06-Jan-2020 14:47:12 GMT"};

$done({status: 200, body: JSON.stringify(obj), headers});
