var request = require('request');
var secret = require('./secrets.js');
var fs = require('fs');
var args = process.argv.slice(2);

repoOwner = process.argv[2];
repoName = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
      'User-Agent': 'request',
      'Authorization': 'secret'
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
    if(JSON.parse(body).message == 'Not Found') {
      console.log("Not Found");
    }
  });
}



function downloadImageByURL(url, filePath) {
 request.get(url)

  .on('error', function(err) {
    console.log('error');
  })

  .on('response', function(response) {


    console.log('Response Status Code: ' + response.statusCode);
  })

  .on('end', function(response) {
    console.log("Downloaded");
  })

  .pipe(fs.createWriteStream('./' + filePath));

}



getRepoContributors(repoOwner, repoName, function(err, result) {
  // console.log("Errors:", err);
  var url = "";

    for (var i = 0; i < result.length; i++){
      url = result[i].avatar_url;
      downloadImageByURL(url, "avatar/" + result[i].login + ".jpg");
    }
  }
);