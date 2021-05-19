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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */
const fetch = require('node-fetch');

module.exports = async function organiseMaintainers() {
  const packageArray = []
  const maintainers = []
  const packageMaintainers = []
  const usernames = []
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
        obj.maintainers.map((item) => usernames.push(item.username))
      );
      const uniq_usernames = [...new Set(usernames)];
    
      packageArray.forEach(obj =>
        packageMaintainers.push({package: obj.name, maintainers: obj.maintainers.map((item) => item.username)})
      );

        (uniq_usernames).forEach(user => {
          const userPackages = []
          for(i = 0; i < packageMaintainers.length; i++){
            if (((packageMaintainers[i].maintainers).includes(user)) == true) {
              userPackages.push(packageMaintainers[i].package)
            }
          }
          maintainers.push({
            username: user,
            packageNames: userPackages.sort()
          })
        })

      maintainers.sort((a, b) => a.username.localeCompare(b.username));
      return maintainers
};
