var obj = JSON.parse($response.body);

if(obj.length && obj[0].value) {
  if(obj[0].value.id) {
    obj[0].value.isFree = true;
  } else if(obj[0].value.data && obj[0].value.data.length) {
    obj[0].value.data.forEach(book => {
      book.isFree = true;
    });
  }
}

$done({body: JSON.stringify(obj)});
