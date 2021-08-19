var obj = JSON.parse($response.body);

if(obj.length) {
  var book_index = obj.findIndex(function(o) {
    return o.value.id;
  });
  if(book_index) {
    obj[book_index].value.isFree = true;
    obj[book_index].value.whyItFree = 'Fonos quyết định dành tặng các thính giả hoàn toàn miễn phí.';
    obj[book_index].value.purchased = true;
  }
}

$done({body: JSON.stringify(obj)});
