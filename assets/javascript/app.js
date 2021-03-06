var config = {
    apiKey: "AIzaSyDrTW0itwSy0cBSC-cFUpStAHk18Wu1aAM",
    authDomain: "timesheet-7f36f.firebaseapp.com",
    databaseURL: "https://timesheet-7f36f.firebaseio.com",
    projectId: "timesheet-7f36f",
    storageBucket: "",
    messagingSenderId: "529687938701"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var role = "";
var startDate = "";
var monthlyRate = 0;
var totalMonths = 0;
var totalBilled = 0;

// Currency formatter (courtesy of https://flaviocopes.com/how-to-format-number-as-currency-javascript/)
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

database.ref().on("child_added", function(snapshot) {
    var sv = snapshot.val();

    // Create new row.
    var newRow = $("<tr>");

    //This works, but we'll probably learn a better way in a second.
    // var diff = moment(sv.startDate, "MM/DD/YYYY").diff(moment(), 'milliseconds');
    // console.log(diff);
    // var duration = moment.duration(diff);
    // console.log(duration);
    totalMonths = moment().diff(sv.startDate, "months");
    

    // Calculate total billed, truncate to 2 decimals
    totalBilled = totalMonths * sv.monthlyRate;
    totalBilled = totalBilled.toFixed(2);

    // Create new TDs with appropriate values.
    var nameTD = $("<td>").text(sv.name);
    var roleTD = $("<td>").text(sv.role);
    var startTD = $("<td>").text(sv.startDate);
    var monthsWorkedTD = $("<td>").text("Placeholder");
    var monthsWorkedTD = $("<td>").text(totalMonths);
    var monthlyRateTD = $("<td>").text(formatter.format(sv.monthlyRate));
    var totalBilledTD = $("<td>").text(formatter.format(totalBilled));
    
    // Append td values to row.
    newRow.append(nameTD, roleTD, startTD, monthsWorkedTD, monthlyRateTD, totalBilledTD);
    
    // Append new row to existing table "tbody".
    $("tbody").append(newRow);

})

// On click handler for form submit.
$("#submit").on("click", function (e) {

    e.preventDefault();

    // Grab values from submit button.
    name = $("#employee-name").val().trim();
    role = $("#employee-role").val().trim();
    startDate = $("#employee-start").val().trim();
    monthlyRate = parseFloat($("#employee-rate").val()).toFixed(2);
    
    console.log(startDate);
    var str = startDate;
    var res = str.split("-");
    console.log(res);
    startDate = res[1]+"/"+res[2]+"/"+res[0];

    database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
    });

});