/*
$.ajax({
  type: "GET",
  url:"/ajax",
  success: function(data) {
  }
});
*/

$('#enter-room-id').click(function() {
  $.ajax({
    type: "POST",
    url: "/ajax",
    contentType: 'application/json',
    data: JSON.stringify({roomID: $('#room-id-input').val()}),
    success: function(data) {
      var ip_string;
      
      if (data === null) {
        ip_string = "Wrong Room ID";
      } else {
        ip_string = "Your IP is " + data
      }
      
      $('#ip-target').html(ip_string);      


    }
  })
});













