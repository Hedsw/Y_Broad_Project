var ch_file = document.querySelector('#btn');
var load_video = document.querySelector('#load_video');
var playVideo = document.querySelector('#play_video');
var sv_file = document.querySelector('#save_file');
var output = document.querySelector('output');
var importData = document.querySelector('#importData'); // 뭐 열었는지 보여주는거
var import_data = document.querySelector('#import_data'); // 버튼 
var blobList = [];
var entry;

function errorHandler(e) {
  console.error(e);
}

//load video to arraybuffer. Get ready to play Videos
load_video.addEventListener('click', function() {
  var vid2 = "http://www.ioncannon.net/examples/vp8-webm/big_buck_bunny_480p.webm"
  var vid = "http://techslides.com/demos/sample-videos/small.webm"
  var request = new XMLHttpRequest();
  request.responseType = "arraybuffer"
  request.onload = function(e) {
    var blob = new Blob([request.response], {type: "video/webm"});
    console.log(blob)
    blobList.push(blob)      
  }
  request.open("GET", vid, true)
  request.send()
  
  var request2 = new XMLHttpRequest()
  request2.responseType = "arraybuffer"
  request2.onload = function(e) {
    var blob = new Blob([request2.response], {type: "video/webm"});
    console.log(blob)
    blobList.push(blob)
  }
  request2.open("GET", vid2, true)
  request2.send()
})

//play videos which are load at load_video function at Chrome App 
playVideo.addEventListener('click', function() {
  // console.log(blobList)
  blobList.forEach(function(videoBlob) {
    var video = document.createElement('video')
    video.setAttribute("controls","controls")   
    video.autoplay = true;
    video.src = window.URL.createObjectURL(videoBlob);
    document.body.appendChild(video)
  })
})

//https://developer.mozilla.org/en-US/docs/Web/API/File <- 이걸로 보면됨

ch_file.addEventListener('click', function(e) {
  var accepts = {
    type: 'openDirectory',
    'accepts':[{ mimeTypes:['video/*']}, // object (curly bracket하는거)
    {'description':'This is example'}, // string (bracket만 하는거)
    {'extensions' :['webm','mp4']}] 
  }

  chrome.fileSystem.chooseEntry(accepts, function(theEntry) {
    var dirReader = theEntry.createReader();
    console.log(theEntry+" 1");
    if(!theEntry) {
      output.textContent = 'No file selected.';
      return;
    }
    console.log(dirReader+" 2");  
  
  chrome.fileSystem.isWritableEntry(theEntry, function(reserved) {
    console.log(reserved+" 3");
  })
  
  var entries = [];
  dirReader.readEntries(function(results) {
    //console.log(results);
    results.forEach(function(item) {
      entries.push(item.fullPath);
    })

     var find = "Korea" // 여기다가 찾고 싶은 것의 이름을 넣으면 되! //하나의 파일만 찾아 내고 싶을 때,
     var filter = entries.filter(function(item, index, array) {
          return !!~item.search(find);
      });
      console.log(filter+" 4");
  })

  chrome.fileSystem.getDisplayPath(theEntry, function(reserved2) { //File Path 어디인지 알아 낼 때
    console.log(reserved2+" 5");
  })

})

    // chrome.fileSystem.restoreEntry("test", function (reserved3) {
    //   console.log(reserved3);
    // }) // 이런거에서 id는 어디에서 가져 오는거지?

})


// var defaultDatabase = firebase.database();
// firebase.database.enableLogging(true);

// Firebase.INTERNAL.forceWebSockets();
// var database = firebase.database();

//   // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyAXO8kgV-tgvtRwyUmF2YUoH2qQUMLhJMc",
//     authDomain: "project-dandelion.firebaseapp.com",
//     databaseURL: "https://project-dandelion.firebaseio.com",
//     storageBucket: "project-dandelion.appspot.com",
//     messagingSenderId: "551863919971"
//   };
//   firebase.initializeApp(config);


// var rootRef = firebase.database().ref();

