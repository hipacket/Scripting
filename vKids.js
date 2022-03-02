var obj = JSON.parse($response.body);
obj.data.premium = 1;

$done({body: JSON.stringify(obj)});
