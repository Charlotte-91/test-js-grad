/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
 */
const fetch = require('node-fetch');

module.exports = async function oldestPackageName() {
  const packageArray = []
  const packageDates =[]
  const body = {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true}
    const response = await fetch('http://ambush-api.inyourarea.co.uk/ambush/intercept',{
      method: 'POST',
      body: JSON.stringify(body)});
      const data = await response.json();

      (data.content).forEach(obj => {
        packageArray.push(obj.package)
      });

      packageArray.forEach(obj =>
        packageDates.push({name: obj.name, date: Date.parse(obj.date)}
      ));
    const sortedPackages = packageDates.sort((a, b) => b.date - a.date)
    const name = (sortedPackages.slice(-1)[0].name)

  return name
};
