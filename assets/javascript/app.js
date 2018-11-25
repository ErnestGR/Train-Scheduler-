var config = {
  apiKey: "AIzaSyBeSSn572wgvpFN_xQg04tdFFDzKU1lXG4",
  authDomain: "train-scheduler-cd126.firebaseapp.com",
  databaseURL: "https://train-scheduler-cd126.firebaseio.com",
  projectId: "train-scheduler-cd126",
  storageBucket: "train-scheduler-cd126.appspot.com",
  messagingSenderId: "684646299869"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#submit").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var tName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  var ftt = $("#ftt-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newEmp = {
    name: tName,
    destination: destination,
    frequency: frequency,
    ftt: ftt
  };

  // Uploads train data to the database
  database.ref().push(newEmp);

  // Logs everything to console
  console.log(newEmp.tName);
  console.log(newEmp.destination);
  console.log(newEmp.frequency);
  console.log(newEmp.ftt);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#ftt-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var ftt = childSnapshot.val().ftt;
  var formattedFtt = moment(ftt, "HH:mm").subtract(1, "years");
  // Difference between the times
  var diffTime = moment().diff(formattedFtt, "minutes");
  var tRemainder = diffTime % frequency;
  // Minute Until Train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // train Info
  console.log(tName);
  console.log(destination);
  console.log(frequency);
  console.log(ftt);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(ftt),
    $("<td>").text(tMinutesTillTrain + " " + "min"),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});