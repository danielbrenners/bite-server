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
        attachEvents();
        WebSocketSetup(SERVER_IP);
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
    WebSocketSendFrame("red");
  });

  $('#btn-blue').click( function(){
    //console.log(ip);    
    WebSocketSendFrame("blue");
  });
}






//On connect, websocket server should reply back with a unique token to identify client
var serverToken = "";
var SERVER_IP = "192.168.0.107";
var ws;

function WebSocketSendFrame(color) {
    var wsMessage = {
        "color": color
    };

    var jsonString = JSON.stringify(wsMessage)

    ws.send(jsonString);

  console.log("sending " + jsonString);
}

function WebSocketSetup(SERVER_IP) {
    if ("WebSocket" in window) {    // websocket is supported by the Browser

        // open a web socket
        ws = new WebSocket("ws://" + SERVER_IP + ":8051/webdata")

        ws.onmessage = function(evt) {

            if (serverToken == "") {
                serverToken = evt.data;
                console.log("serverToken set: " + evt.data);
            } else {
                console.log("new message received: " + evt.data);
                var received_msg = evt.data;
                if (evt.data.substring(0, 1) != "{") {
                    
                } else {
                    //parse json message, do something with it
                    console.log("RECEIVED NON-JSON FORMATTED MESSAGE")
                    console.log(evt.data)
                }

            }
        };

        ws.onclose = function() {
            serverToken = "";
            console.log("Connection is closed...");
        };

    } else {  
        alert("WebSocket NOT supported by your Browser!");
    }
}













