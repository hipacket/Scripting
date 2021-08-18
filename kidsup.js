var obj = JSON.parse($response.body);

obj= {
 "response": {
  "id": "full",
  "title": "TRỌN ĐỜI",
  "orderId": 87543,
  "unlockGift": false,
  "prepaid": false
 }
};

$done({status: 200, body: JSON.stringify(obj)});
