var $messages = $('.messages-content');
var serverResponse = "wala";


var suggession;
//speech reco
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
  $('.no-browser-support').show();
}

$('#start-record-btn').on('click', function(e) {
  recognition.start();
});

recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
 document.getElementById("MSG").value= speechToText;
  //console.log(speechToText)
  insertMessage()
}


function listendom(no){
  console.log(no)
  //console.log(document.getElementById(no))
document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}

$(window).load(function() {
  $messages.mCustomScrollbar();
  // setTimeout(function() {
  //   serverMessage("hello i am customer support bot type hi and i will show you quick buttions");
  // }, 100);
  // $('#chatblock').addClass('hidechat');

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}



function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
   fetchmsg() 
  
  $('.message-input').val(null);
  updateScrollbar();

}

document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault() 
  insertMessage();
  //serverMessage("Hello");
  //speechSynthesis.speak( new SpeechSynthesisUtterance("IAM Aion chat assistant"))
}

function serverMessage(response2) {


  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="css/img.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();
  

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="css/img.png" /></figure>' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
  }, 100 + (Math.random() * 20) * 100);

}


function fetchmsg(){

    //  var url = 'http://localhost:5000/send-msg';
     var url = 'http://127.0.0.1:3000/communication_front';

      
     let agent_id = "769913d4-7648-49e2-9eaf-b7b4047c7c41";
     console.log('Agent id:', agent_id);
     const data = new URLSearchParams();
     let body = [];

     for (const pair of new FormData(document.getElementById("mymsg"))) {
         data.append(pair[0], pair[1]);
         // console.log(pair);
         // console.log(body)
         var varjson = {'payload' : pair[1], 'agent-id': agent_id}
         var mydata = JSON.stringify(varjson);
     }
      
      console.log("abc",mydata)
        fetch(url, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          body:mydata
        }).then(res => res.json())
         .then(response => {
           
          console.log('start response');
          console.log(response);
          console.log('end response');

          serverMessage(response.answer);
          // speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply))
         })
          .catch(error => console.error('Error h:', error));

}


$(document).ready(function(){
  $('#chatblock').addClass('hidechat');
})

function btnaction(){
  var el = document.querySelector("#chatblock");
  if(el.classList.contains('hidechat') ){
    setTimeout(function() {
    $('#chatblock').removeClass('hidechat');
    $('#chatblock').addClass('showchat');
    }, 100);

    setTimeout(function(){
      $('#chatbtnsection').hide();
    }, 100);

    $messages.mCustomScrollbar();
    setTimeout(function() {
      serverMessage("hello i am customer support bot type hi and i will show you quick buttions");
    }, 100);

  }else if(el.classList.contains('showchat'))
  {
    setTimeout(function() {
      $('#chatblock').removeClass('showchat');
      $('#chatblock').addClass('hidechat');
      
    }, 100);
    setTimeout(function(){
      $('#chatbtnsection').show();
    }, 100);
  }
  
}