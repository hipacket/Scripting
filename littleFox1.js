var obj = JSON.parse($response.body);
if(obj.data.contents.length) {
	for(let i = 0; i < obj.data.contents.length; i++) {
    obj.data.contents[i].service_info = {
      "service": "F",
			"story": "F",
			"original_text": "F",
      "sentence": "F",
      "ebook": "F",
      ...obj.data.contents[i].service_info
    };
		// obj.data.contents[i].service_info = {
		// 	"service": "F",
		// 	"story": "F",
		// 	"original_text": "F",
		// 	"vocabulary": "N",
		// 	"quiz": "F",
		// 	"sentence": "N",
		// 	"crossword": "N",
		// 	"translate": "N",
		// 	"starwords": "N",
		// 	"ebook": "F"
		// };
	}
}
$done({body: JSON.stringify(obj)});
