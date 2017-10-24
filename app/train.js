$(document).ready(function() {
    // 1. Link to Firebase
    var config = {
        apiKey: "AIzaSyCO-_L32iY6saZG8oR41aGvNjeM-hhMJIQ",
        authDomain: "train-schedul-4681f.firebaseapp.com",
        databaseURL: "https://train-schedul-4681f.firebaseio.com",
        projectId: "train-schedul-4681f",
        storageBucket: "train-schedul-4681f.appspot.com",
        messagingSenderId: "771924023997"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();


    // 2. Button for adding Trains
    $("#addTrainBtn").on("click", function() {

        // Grabs user input and assign to variables
        var trainName = $("#trainInput").val().trim();
        var destination = $("#destInput").val().trim();
        var trainTimeInput = moment($("#timeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");;
        var frequencyInput = $("#freqInput").val().trim();

        // Test for variables entered
        console.log(trainName);
        console.log(lineName);
        console.log(destination);
        console.log(trainTimeInput);
        console.log(frequencyInput);


        // Will push this to firebase
        database.ref().push({
            name: trainName,
            destination: destination,
            trainTime: trainTimeInput,
            frequency: frequencyInput,
        });


    });

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // assign firebase variables to snapshots.
        var firebaseName = childSnapshot.val().name;
        var firebaseDestination = childSnapshot.val().destination;
        var firebaseTrainTimeInput = childSnapshot.val().trainTime;
        var firebaseFrequency = childSnapshot.val().frequency;

        var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
        var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency;
        var minutes = firebaseFrequency - timeRemainder;

        var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

        // Test for correct times and info
        console.log(minutes);
        console.log(nextTrainArrival);
        console.log(moment().format("hh:mm A"));
        console.log(nextTrainArrival);
        console.log(moment().format("X"));

        // Append train info to table on page
        $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

    });


});