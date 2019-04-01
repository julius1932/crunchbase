var fs = require('fs');
const jsonfile = require('jsonfile');
var name = "crunchbase";
var data = jsonfile.readFileSync(`data/crunchbase.json`);
var array = fs.readFileSync(`txt/aa.txt`).toString().split("\n");
var arr1 = [];
for (var i = 0; i < array.length; i++) {
    if (array[i].trim() != "") {
    	var elem = array[i].trim();
        arr1.push(elem);
    }
}

console.log(arr1);
var arr = [];
for (var i = 0; i < data.length; i++) {
    var elem = data[i].name.trim();
    if (!arr1.includes(elem)) {
        arr.push({name: elem});
    }
}
saveToFile();

function saveToFile() {
    jsonfile.writeFile(`data/${name}.json`, arr, { spaces: 2 }, function(err) {
        console.error(err)
    });
}