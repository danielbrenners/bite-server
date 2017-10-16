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
        setupControllerUI();
        initWS();
        attachEvents();
      }
      
    }
  })
});


function removeSetupUI(){
  // remove room id initialization UI
  $('#room-id-container').remove();
  $('#ip-target').remove();
}

function setupControllerUI(){ 
  // change header
  $('#header').html("Play Game");

  // set game ui
  var redButton = "<div id='btn-red'> Send Red </div>";
  var blueButton = "<div id='btn-blue'> Send Blue </div>";
  $('#controller-target').prepend(redButton);
  $('#controller-target').prepend(blueButton);
}

function attachEvents(){
  $('#btn-red').click( function(){
    //console.log(ip);
    websocket.send('red');
  });

  $('#btn-blue').click( function(){
    //console.log(ip);    
    websocket.send('blue');
  });
}

//var wsUri = "ws://echo.websocket.org/";
var wsUri = "ws://echo.websocket.org/";
var output;

function initWS()
{
  output = document.getElementById("output");
  connectWebSocket();
}

function connectWebSocket()
{
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { 
    console.log('connected');
  };
  websocket.onclose = function(evt) {
    console.log('disconnected');
  };
  websocket.onmessage = function(evt) { 
    console.log(evt.data);
  };
  websocket.onerror = function(evt) { 
    console.log(evt.data);
  };
}





