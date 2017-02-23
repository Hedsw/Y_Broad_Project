var ch_file = document.querySelector('#btn');
var load_video = document.querySelector('#load_video');
var playVideo = document.querySelector('#play_video');
var sv_file = document.querySelector('#save_file');
var output = document.querySelector('output');
var importData = document.querySelector('#importData'); // 뭐 열었는지 보여주는거
var import_data = document.querySelector('#import_data'); // 버튼 
var write_file = document.querySelector("#write_file"); //Blob을 쓰는걸 해보기 위해서 만든 버튼! 
var blobList = []; //여기다가 여러게가 들어가!!
var entry;
function errorHandler(e) {
  console.error(e);
}

// 우선 Load_Video로 blobList에 있는 걸 우선 받아오고, 그 다음 이거 실행하면 내가 원하는 곳에 다운이 가능!
//실행 순서.. 1. load_video로 blobList에 넣는다 2. write File 버튼 눌러서 디렉토리 지정해서 파일 저장한다.
write_file.addEventListener('click', function() {
  var accepts = {
    type: 'openDirectory',
    'accepts':[{ mimeTypes:['video/*']}, // object (curly bracket하는거)
    {'description':'This is example'}, // string (bracket만 하는거)
    {'extensions' :['webm','mp4']}] 
  }
  //console.log(blobList[0]);
  chrome.fileSystem.chooseEntry(accepts, function(theEntry) {
    chrome.fileSystem.getWritableEntry(theEntry, function(theEntry2) {
      theEntry2.getFile('Test2.webm', {create:true}, function(theEntry3) {
        theEntry3.createWriter(function(writer) {
          writer.write(blobList[0]);
        })
      })
    })
  })
})

//load video to arraybuffer. Get ready to play Videos
load_video.addEventListener('click', function() {
  var accepts = {
    type: 'saveFile',
    'accepts':[{ mimeTypes:['video/*']}, // object (curly bracket하는거)
    {'description':'This is example'}, // string (bracket만 하는거)
    {'extensions' :['webm','mp4']}] 
  }
  var vid2 = "http://www.ioncannon.net/examples/vp8-webm/big_buck_bunny_480p.webm"
  var vid = "http://techslides.com/demos/sample-videos/small.webm"
  var blob;
  var request = new XMLHttpRequest();
  request.responseType = "arraybuffer"
  request.onload = function(e) {
    blob = new Blob([request.response], {type: "video/webm"});
    blobList.push(blob)      
  }
  var request2 = new XMLHttpRequest()
  request2.responseType = "arraybuffer"
  request2.onload = function(e) {
    blob = new Blob([request2.response], {type: "video/webm"});
    console.log(blob);
    blobList.push(blob)
  }  
  request2.open("GET", vid2, true)
  request2.send()
  request.open("GET", vid, true)
  request.send()

//var val = document.getElementById('id_field').value;

  if(request.readyState && request2.readyState) {
    console.log("First Video is Successfully loaded");
    document.getElementById('result').innerHTML ="videos are successfully loaded. \n";
  }
//  if(request2.readyState) {
//     console.log("Second Video is Successfully loaded");
//     document.getElementById('result').innerHTML = "Second video is successfully loaded.";
//  }

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


//이거는 일단 거의 필요가 없는건데.. FileEntry랑.. 개인 Path를 받아 오는것 까지 공부하는거..
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

      var find = /Korea/i // 여기다가 찾고 싶은 것의 이름을 넣으면 되! //하나의 파일만 찾아 내고 싶을 때,
      var filter = entries.filter(function(item, index, array) {
            return !!~item.search(find);
        });
        console.log(filter+" 4");
    })

    chrome.fileSystem.getDisplayPath(theEntry, function(reserved2) { //File Path 어디인지 알아 낼 때
      console.log(reserved2+" 5");
    })
  })
})

