var obj = JSON.parse($response.body);
delete obj.data.preview_time;

$done({body: JSON.stringify(obj)});
