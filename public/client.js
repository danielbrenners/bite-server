/*
$.ajax({
  type: "GET",
  url:"/ajax",
  success: function(data) {
  }
});
*/

var ip = null;
var connection = null;

$('#enter-room-id').click(function() {
  $.ajax({
    type: "POST",
    url: "/ajax",
    contentType: 'application/json',
    data: JSON.stringify({roomID: $('#room-id-input').val()}),
    success: function(data) {

      ip = data;

      if (ip === null) {
        var ip_message = "Wrong Room ID";
        $('#ip-target').html(ip_message);
      } else {
        removeSetupUI();
        setupController();
      }
      
    }
  })
});

function removeSetupUI(){
  // remove room id initialization UI
  $('#room-id-container').remove();
  $('#ip-target').remove();
}

function setupController(){ 
  // change header
  $('#header').html("Play Game");

  // set game ui
  var redButton = "<div id='btn-red'> Send Red </div>";
  var blueButton = "<div id='btn-blue'> Send Blue </div>";
  $('#controller-target').prepend(redButton);
  $('#controller-target').prepend(blueButton);

  startWS();
  attachEvents();
}


function attachEvents(){
  $('#btn-red').click( function(){
    console.log(ip);
    //connection.send('red');
  });

  $('#btn-blue').click( function(){
    console.log(ip);
    //connection.send('blue');
  });
}


function startWS(){
  connection = new WebSocket('ws://localhost:9000', ['soap', 'xmpp']);
  connection.onopen = function (){
    connection.send("Ping");
  };

  connection.onerror = function (error) {
    console.log('WebSocket Error ' + error);
  };

  connection.onmessage = function (e) {
    console.log('Server ' + e.data);
  };
}









