// Displaying current day
var currentDay = $("#currentDay")
var displayCurrentDay = moment().format('dddd, MMMM Do YYYY')
currentDay.text(moment().format(displayCurrentDay));

//Create timeblocks
//Create variables for elements
var targetContainer = $(".container");
var hourArr = [];

function createHourArr() {

    for (var i = 0; i < 9; i++) {

        var hour = moment().hour(i + 9).format("h a");
        hourArr.push(hour);

    }

}
createHourArr();
createTimeBlock();

checkStorage();

renderEvents();
checkTime();

$(document).on("click", "button", function () {
    var userInput = $(this).parent().find("textarea").val();
    var textRow = $(this).parent().find("textarea").attr("data-row");
    var dayPlanner = JSON.parse(localStorage.getItem("dayPlanner"))
    var newEvent = new Object();
    newEvent.currentDay = displayCurrentDay;
    newEvent.row = textRow
    newEvent.text = userInput
    dayPlanner.unshift(newEvent);
    console.log(dayPlanner);
    dayPlanner = removeDuplicates(dayPlanner, "row")
    dayPlanner.sort(function (x, y) {
        return x.row - y.row
    });
    console.log(dayPlanner);

    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));

    function removeDuplicates(array, key) {
        var lookup = {};
        var result = [];
        for (var i = 0; i < array.length; i++) {
            if (!lookup[array[i][key]]) {
                lookup[array[i][key]] = true;
                result.push(array[i]);
            }
        }
        return result;
    }
});

function createTimeBlock() {
    for (var i = 0; i < hourArr.length; i++) {
        // Creating first row
        var createTimeBlockRow = $("<div>");
        createTimeBlockRow.addClass("row timeblock").attr("id", "row" + i);
        targetContainer.append(createTimeBlockRow);
        //Creating column for the row
        // Hour column
        var hourCol = $("<div>");
        hourCol.addClass("col-sm-1 hour").text(hourArr[i]).attr("data-hour", i + 9);
        $("#row" + i).append(hourCol);
        // Event column
        var eventCol = $("<textarea>");
        eventCol.addClass("col-sm-10 description").attr("id", "text" + i).attr("data-row", i);
        $("#row" + i).append(eventCol);
        // Save column
        var saveCol = $("<button>");
        saveCol.addClass("col-sm-1 saveBtn").html("<i class=\"far fa-save\"></i>");
        $("#row" + i).append(saveCol);
    };
};

function renderEvents() {

    var display = JSON.parse(localStorage.getItem("dayPlanner"));

    $("textarea").empty;
    for (var i = 0; i < hourArr.length; i++) {
        $("#text" + i).text(display[i].text);

    };
};

function checkStorage() {

    var storage = JSON.parse(localStorage.getItem("dayPlanner"));

    if (storage === undefined || storage === null || storage[0].currentDay !== displayCurrentDay) {

        storage = [];

        for (var i = 0; i < hourArr.length; i++) {

            var generateObj = new Object();
            generateObj.currentDay = displayCurrentDay;
            generateObj.row = i
            generateObj.text = ""
            storage.push(generateObj);
            localStorage.setItem("dayPlanner", JSON.stringify(storage));
        }
    }

    localStorage.setItem("dayPlanner", JSON.stringify(storage));
}

function checkTime() {

    for (var i = 0; i < hourArr.length; i++) {
        console.log("Iteration " + i + ":");
        if (moment().isSame(moment().hour(9 + i))) {
            $("#text" + i).addClass("present");

        } else if (moment().isBefore(moment().hour(9 + i))) {

            $("#text" + i).addClass("future");
        } else {
            $("#text" + i).addClass("past");
        }



    }

}
//In the timeblocks, there are 3 parts:
// Display Hour, Display Time Event, Display Save Button


// We will display from 9AM to 5PM, which is a length of 9 blocks


// When we click on Time Event, user can input text.


// When we click on save button, text is stored on localstorage and persists in Time Event.


// Time blocks are color coded. Current hour displays red. Past hours display gray. Future hours display green.
// These color codes are already in the style sheet, so we just need to add the elements to html using jQuery.

