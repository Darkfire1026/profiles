const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const pdf = require('html-pdf');
const writeFileAsync = util.promisify(fs.writeFile);

function rating() {
    api.github.com / users / { username }
    /starred
}

function promptUser() {
    return inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is your name? its very importent for teambuilding"
        }, {
            type: "input",
            name: "location",
            message: "where are you from? i totally wont sell this info"
        }, {
            type: "input",
            name: "github",
            message: " please put your GitHub username>   (why you ask? well youll find out.)"
        },
        {
            type: "input",
            name: "linkedin",
            message: "Please enter your LinkedIn url."
        },

        {
            type: "input",
            name: "rating",
            message: "how many stars do you have on your guthub profile? (please use only the numbers 1-5) "
        }
    ]);
}

function generateHTML(info) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<https://api.github.com/resource?page=2>; 
      <https://api.github.com/resource?page=5>;
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge"> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body style="background-color:LightBlue;">
  <div class="jumbotron jumbotron-fluid">
  <div class="container"style="background-color:silver;">
    <h1 class="display-4"> hello. i am ${info.name}</h1>
    <p class="lead" style="background-color:silver;"> i am originally from  ${info.location}.</p>  <h3><span class="badge badge-secondary">my contacts </span></h3> <ul class="list-group">
      <li class="list-group-item">My GitHub username is <a href="https://github.com/${info.github}">${info.github}</li>
      <li class="list-group-item">LinkedIn: <a href="${info.linkedin}"> ${info.linkedin} </li>
    <li class="list-group-item"> i have a rating of <img src="${info.rating}.png" width="250px"  height="48px"></img></ul>
  </div>
</div>
</body>
</html>`
};

async function init() {
    console.log("hi");
    try {
        const info = await promptUser();

        const html = generateHTML(info);

        await writeFileAsync("index.html", html);
        var readHtml = fs.readFileSync('index.html', 'utf8');
        var options = { format: 'Letter' };
        pdf.create(readHtml, options).toFile('html.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res);
        });
        console.log("Successfully wrote to index.html");
    } catch (err) {
        console.log(err);
    }
}
init();