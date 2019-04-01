const puppeteer = require('puppeteer');

const jsonfile = require('jsonfile');

const fs = require('fs');
var stringify = require('csv-stringify');
var readlineSync = require('readline-sync');

var data = jsonfile.readFileSync(`data/data.json`);
var array = jsonfile.readFileSync(`data/crunchbase.json`);
//var downloadPdf = require('./crawlerC');

let startUrl = "https://www.crunchbase.com/organization/cultivate-2#section-overview";
var pagesToVist = [startUrl];
var vistedPages = []; //jsonfile.readFileSync('./afr.json');
var allDetails = {};
var numEle = 112;
var browser = null;

/*var choice;
do {

    // Handle the secret text (e.g. password).
    choice = readlineSync.question('CHOOSE ONE OPTION \n Enter 1:  for TheLinks.json and shift operation \n Enter 2:  for TheLinksD.json and pop  operation \n');

} while (!(choice == 1 || choice == 2));

var fileName;
if (choice == 1) {
    fileName = './TheLinks.json';
} else if (choice == 2) {
    fileName = './TheLinksD.json';
}
var data = []; // jsonfile.readFileSync(fileName);
//pagesToVist = Object.keys(data);

//console.log(arr.length);

// span.ng-star-inserted*/
var count = 0;
async function scrape(currlink) {
    console.log(currlink);
    const page = await browser.newPage();
    await page.setViewport({ width: 520, height: 900 });
    await page.goto(currlink, { waitUntil: 'networkidle2', timeout: 0 });
    try {
        await page.waitForSelector('.cb-text-color-medium.field-label.flex-100.flex-gt-sm-25.ng-star-inserted');
    } catch (err) {

    }


    // await page.screenshot({ path: `./screenshots/shot${ik}.jpeg`, type: 'jpeg', fullPage: true });

    let values = await page.evaluate(() => {
        let links = { pdfLink: "" };

        var coNa = document.querySelector('.flex.layout-column.layout-align-center-center.layout-align-gt-sm-center-start.text-content span.ng-star-inserted');
        if (coNa) {
            links["company name"] = coNa.innerText;
        }

        var pdfL = document.querySelector('.cb-text-color-medium.field-label.flex-100.flex-gt-sm-25.ng-star-inserted');
        if (pdfL) {
            links.pdfLink = pdfL.innerText;
        }


        return links;
    });

    page.close();
    //extend(data[currlink], values);
    /* data[currlink].pdfLink=values.pdfLink;
    if(values.pdfLink){
       var pdfName=data[currlink].exhname.trim()+data[currlink].exhid;
       await downloadPdf(values.pdfLink,pdfName);
    }
    saveJson(fileName);*/
    console.log(values);
    data[url] = values;
    jsonfile.writeFile(`data/data.json`, data, { spaces: 2 }, function(err) {
        console.error(err)
    });
}

function extend(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}


function saveJson(name) {
    // jsonfile.writeFileSync(name, data, { spaces: 2 });
    console.error(" null " + name);
    /*jsonfile.writeFile(name, data, { spaces: 2 }, function(err) {
        console.error(err)
    });*/
}

async function crawl() {
    if (browser == null) {
        console.log("============================================================browser init");
        browser = await puppeteer.launch({ headless: false, slowMo: 10 });
    }
    if (array.length == 0) {
        return;
    }
    var link = array.pop();
    var url = `https://www.crunchbase.com/organization/${link}#section-overview`;
    if (!data[url]) {
        try {
            await scrape(url);
        } catch (err) {

        }
    }
    await crawl();


}

crawl();