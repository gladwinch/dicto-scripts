const script = require('./services/script')
const puppeteer = require('puppeteer')
const UserAgent = require('user-agents')
const PSIDModel = require('./models/PSID')

const URL = 'https://bard.google.com'
const HEADLESS = false
const TOKEN_ID = '__Secure-1PSID'
const MS = 50000
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const SLOT = 2

script.run(async () => {
    const browser = await puppeteer.launch({ 
        headless: HEADLESS,
        executablePath: CHROME_PATH ,
        args: [
            '--lang=en-US,en', 
            '--no-sandbox', 
            '--disable-setuid-sandbox', 
            '--disable-extensions',
            '--disable-dev-shm-usage'
        ]
    })
    const page = await browser.newPage()
    const userAgent = (new UserAgent()).toString()

    await page.setUserAgent(userAgent)
    await page.goto(URL)
    await script.delay(MS)

    const cookies = await page.cookies()
    const token = cookies.find(cookie => cookie.name === TOKEN_ID)

    if(!token) {
        console.log('TOKEN_ID cookie not found.'.red);
        await browser.close()
        return 
    }

    console.log('token: ', token.value)

    await browser.close()
})