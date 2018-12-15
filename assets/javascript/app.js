

// On click handler for form submit.
$("#submit").on("click", function(e) {

    e.preventDefault();

    // Grab values from submit button.
    var name = $("#employee-name").val().trim();
    var role = $("#employee-role").val().trim();
    var startDate = $("#employee-start").val().trim();
    var monthlyRate = parseInt($("#employee-rate").val());
    
    // Create new row.
    var newRow = $("<tr>");

    // Create new TDs with appropriate values.
    var nameTD = $("<td>").text(name);
    var roleTD = $("<td>").text(role);
    var startTD = $("<td>").text(startDate);
    var monthsWorkedTD = $("<td>").text("Placeholder");
    var monthlyRateTD = $("<td>").text(monthlyRate);
    var totalBilledTD = $("<td>").text("Placeholder");

    // Append td values to row.
    newRow.append(nameTD, roleTD, startTD, monthsWorkedTD, monthlyRateTD, totalBilledTD); 

    // Append new row to existing table "tbody".
    $("tbody").append(newRow);

});