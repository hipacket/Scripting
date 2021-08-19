var obj = JSON.parse($response.body);

if(obj.length) {
  var book = obj.find(function(o) {
    return o.value.id;
  });
  var data = obj.find(function(o) {
    return o.value.data && o.value.data.length;
  });;
  if(book) {
    book.isFree = true;
    book.whyItFree = 'Fonos quyết định dành tặng các thính giả hoàn toàn miễn phí.';
  } else if(data) {
    data.forEach(function(b) {
      b.isFree = true;
    });
  }
}

$done({body: JSON.stringify(obj)});
