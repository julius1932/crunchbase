const puppeteer = require('puppeteer');
const dalang = require('wayang');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({
        width: 1920,
        height: 1080,
    })
    await page.goto('https://www.crunchbase.com/organization/cultivate-2#section-overview');
    let kimantep = new dalang({
        page: page
    })

    kimantep.listenToDalang(async function(action) {
        //TODO: Scraper lines code are happy here after manual process  
        if (action == "start") {
           
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

            console.log(values);

        }
        if (action == "close") {
             console.log("pppppppppppppppppppppppppppppppppppppppppppppppp");
            browser.close();
            process.exit();
        }
    })



})();