const fs = require("fs");
const inquirer = require("inquirer");
const jest = require("jest");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
let newUsers = [];


const program = {
  step1: function(){
    inquirer.prompt(addEmployee())
    .then(function(answer){
       if (answer.add) {
          program.step2();
       }
       else {
         let htmlarry = program.step3();
         let html =makeHtml(htmlarry);
         return writeFileAsync("index.html", html);
         
        }
    }).catch(err => {
      console.log(err)
    });
  },
  step2: function(){
    inquirer.prompt(promptUser()).then(function(newUser){
      newUsers.push(newUser)
       program.step1();
    }) 
  },
  step3: function(){
     console.log(newUsers)
     let divarry = [];
     for(i=0; i<newUsers.length; i++){
       let htmlel = `<div class="col-sm-3"><p>${newUsers[i].job}</p><p>${newUsers[i].job}</p><p>${newUsers[i].email}</p><p>${newUsers[i].id}</p></div>`;
       divarry.push(htmlel);
       
     }
     return divarry
  }


}

program.step1();


function addEmployee(){
  return [{
  	type: "confirm",
    name: "add",
    message: "Would you like to add an employee",
  }]
}

function promptUser() {
  return [
   
    {
      type: "input",
      name: "job",
      message: "What is the employee's title?"
    },
    {
        type: "input",
        name: "name",
        message: "What is their name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is their e-mail?"
    },
    {
        type: "input",
        name: "id",
        message: "What is their id?"
    },
  ];
}

function makeHtml(users) {
  let stringel = ""
   users.forEach(userdiv => {
    stringel += userdiv
  });
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <title>Employee page</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="server.js"></script>
  
  <style>
     
   
    /* Add a gray background color and some padding to the footer */
    footer {
      background-color: #f2f2f2;
      padding: 25px;
    }
  </style>
</head>
<body>



<div class="jumbotron">
  <div class="container text-center">
    <h1>My team</h1>      
    <p>this is my team</p>
  </div>
</div>
  
<div class="container-fluid bg-3 text-center">    
  <h3>these are the team members</h3><br>
  <div class="row appen" >
    ${stringel}
  </div>
</div><br>


<footer class="container-fluid text-center">
  <p>Footer Text</p>
</footer>

</body>
</html>
  `

}


