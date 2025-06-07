module.exports = {
 launch: {
   headless: true,
   slowMo: 0,
   args: [
     '--no-sandbox',
     '--disable-setuid-sandbox'
   ]
 },
 server: {
   command: 'npx http-server -p 8080',
   port: 8080,
   launchTimeout: 10000,
   debug: true,
 }
}