var employeeName = // the employee name ;

function populateInfo() {

    var newRow = $("<tr>");
    newRow.addClass("row new-row");

    var infoName = $("<td>");
    infoName.text("Employee Name: " + employeeName);
    infoName.addClass("col-lg-");
    $("#name-box").append(infoName);
    
  }
 
 
 
var name;
var job;
var start;
var rate;

var startArr;
var startObj;
var today;
var todayObj;

var time;
var money;

$("#submit").on("click", function () {
    name = $("#name").val();
    job = $("#role").val();
    start = $("#start").val();
    rate = $("#rate").val();

    startArr = start.split('/');
    startObj = {
        startMonth: startArr[0],
        startDate: startArr[1],
        startYear: startArr[2]
    }
    today = new Date();
    todayObj = {
        todayMonth: today.getMonth() + 1,
        todayYear: today.getFullYear(),
    }

    timeWorkedHere();
    $(".output").append("Name: " + name + "<br>");
    $(".output").append("Role: " + job + "<br>");
    $(".output").append("Start date: " + start + "<br>");
    $(".output").append("Months worked: " + time + "<br>");
    $(".output").append("Money: " + money);

});





function timeWorkedHere() {
    var today = todayObj.todayYear;
    var start = parseInt(startObj.startYear);
    var durationYear = today - start;
    var durationMonths = 12 * durationYear;
    time = durationMonths + parseInt(startObj.startMonth) - todayObj.todayMonth;
    console.log(time);
    console.log(parseInt(rate));
    rateFunction();
}

function rateFunction() {
    money = time * parseInt(rate);
    console.log(money);




// Firebase watcher .on("child_added"
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the data
    console.log(sv.name);
    console.log(sv.job);
    console.log(sv.start);
    console.log(sv.rate);

    // Change the HTML to reflect
    $("#name").text(sv.name);
    $("#role").text(sv.job);
    $("#start").text(sv.start);
    $("#rate").text(sv.rate);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });