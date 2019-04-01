var fs = require('fs');
const jsonfile = require('jsonfile');
var name = "crunchbase";
var array = fs.readFileSync(`txt/${name}.txt`).toString().split("\n");
var data = jsonfile.readFileSync(`data/data.json`);

var item = {}
for (var i = 0; i < array.length; i++) {
    if (array[i].trim() == "") {
        i--;
    }
    if (i == 0) {
        item['Crunchbase link'] = array[i].trim();
    } else if (i == 1) {
        item['Company Name'] = array[i].trim();
    } else if (i - 1 >= 0) {
        var prev = array[i - 1].trim();
        if (prev == "Founders") {
            item['founder'] = array[i].trim();
        } else if (prev == "Website") {
            item['Website '] = array[i].trim();
        }
    }
}
data.push(item);

saveToFile();

function saveToFile() {
    jsonfile.writeFile(`data/data.json`, data, { spaces: 2 }, function(err) {
        console.error(err)
    });
}