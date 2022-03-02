var obj = JSON.parse($response.body);
if(obj.data.userData) {
  obj.data.userData.premium = 1;
} else {
  obj.data.premium = 1;
}

$done({body: JSON.stringify(obj)});
