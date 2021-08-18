var obj = JSON.parse($response.body);
if(obj.info) {
  obj.info.days_vip = 365;
}
$done({body: JSON.stringify(obj)});
