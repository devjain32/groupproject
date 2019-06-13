var firebaseConfig = {
    apiKey: "AIzaSyA_9s6_talU6UkVbal4IijDf9TO2e0wxnU",
    authDomain: "testproject-34d40.firebaseapp.com",
    databaseURL: "https://testproject-34d40.firebaseio.com",
    projectId: "testproject-34d40",
    storageBucket: "testproject-34d40.appspot.com",
    messagingSenderId: "852880512773",
    appId: "1:852880512773:web:ae5debd477d0b9f1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var name = "";
var role = "";
var year;
var rate;
var startArr;
var startObj;
var today;
var todayObj;
var time;
var money;

today = new Date();
todayObj = {
    todayMonth: today.getMonth() + 1,
    todayYear: today.getFullYear()
}

$("#add-user").on("click", function () {
    name = $("#name").val().trim();
    role = $("#role").val().trim();
    year = $("#year").val();
    rate = $("#rate").val();

    var newPerson = {
        name: name,
        role: role,
        year: year,
        rate: rate
    }
    database.ref().push(newPerson);

    timeWorkedHere();
    rateFunction();
});

database.ref().on("child_added", function (childSnapshot) {
    var csv = childSnapshot.val();
    var newName = csv.name;
    var newRole = csv.role;
    var newYear = csv.year;
    var newRate = csv.rate;
    timeWorkedHere();
    rateFunction();
    $("#pay-table > tbody").append(
        $("<tr>").append(
            $("<td>").text(newName),
            $("<td>").text(newRole),
            $("<td>").text(newYear),
            $("<td>").text(time),
            $("<td>").text(newRate),
            $("<td>").text(money)
        )
    );

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
})

function timeWorkedHere() {
    var startArr = parseInt($("#year").val().split("/"));
    var startObj = {
        startMonth: startArr[0],
        startDate: startArr[1],
        startYear: startArr[2]
    }
    var today = todayObj.todayYear;
    var start = parseInt(startObj.startYear);
    var durationYear = today - start;
    var durationMonths = 12 * durationYear;
    time = durationMonths + parseInt(startObj.startMonth) - todayObj.todayMonth;
    console.log(time);
    console.log(parseInt(rate));
}

function rateFunction() {
    money = time * parseInt(rate);
    console.log(money);
}