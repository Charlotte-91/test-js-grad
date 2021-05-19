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

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */
const fetch = require('node-fetch');

module.exports = async function countMajorVersionsAbove10() {
  const packageArray = []
  var count = 0
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
  })

  packageArray.forEach(obj =>
    {if (parseFloat(obj.version) >= '11') {
      count += 1
    }})
  return count
};

