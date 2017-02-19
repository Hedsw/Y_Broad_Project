    // var button = document.getElementById('btn');
    //  button.onclick = function(e) {
    //     var url = "www.naver.com"
    //   location.href= url
    //  }
    //
    // Path: <input type="text" id="file_path" readonly>
    // <span>Size: <span id="file_size"></span> bytes</span>
    // <output></output>
    // <textarea></textarea>
    // <button id ="btn">Choose File</button>
    // <button id ="btn2">Choose Directory</button>
    //  <p><button id="save_file" disabled>Save As</button></p>

  var Ch_file = document.querySelector('#btn');
  var Ch_dir = document.querySelector('#btn2');
  var httpRequest = document.querySelector('#btn3');
  var playVideo = document.querySelector('#play');
  var Sv_file = document.querySelector('#save_file');
  var output = document.querySelector('output');
  var textarea = document.querySelector('textarea');
  var chosenEntry = null;

  var blobList = [];

  function errorHandler(e) {
    console.error(e);
  }

  var entry;

  playVideo.addEventListener('click', function(){
    console.log(blobList)
    blobList.forEach( function(videoBlob){
      var video = document.createElement('video')
      video.setAttribute("controls","controls")   
      video.autoplay = true;
      video.src = window.URL.createObjectURL(videoBlob);
      document.body.appendChild(video)
    })
    
  })
  
  Ch_file.addEventListener('click', function(e) {
    var accepts = [{
      mimeTypes: ['text/*'],
      extensions: ['js', 'css', 'txt', 'html', 'xml', 'tsv', 'csv', 'rtf', "jpg", "gif", "crx","pdf"]
    }];
    chrome.fileSystem.chooseEntry({type: 'openFile', accepts: accepts}, function(theEntry) {
      if(!theEntry) {
        output.textContent = 'No file selected.';
        return;
      }
      chrome.storage.local.set({'chosenFile': chrome.fileSystem.retainEntry(theEntry)});
      entry = theEntry;
      loadFileEntry(theEntry);
      
    });
  });


  
  httpRequest.addEventListener('click', function(){
    var request = new XMLHttpRequest();
    request.responseType = "arraybuffer"
    request.onload = function(e) {
      
      var blob = new Blob([request.response], {type: "video/webm"});
      console.log(blob)
      blobList.push(blob)      
      request2.open("GET", vid2, true)
      request2.send()
    }

    request.open("GET", "http://techslides.com/demos/sample-videos/small.webm", true)
    request.send()

    var vid2 = "http://www.ioncannon.net/examples/vp8-webm/big_buck_bunny_480p.webm"
    var request2 = new XMLHttpRequest()
    request2.responseType = "arraybuffer"
    request2.onload = function(e){
      var blob = new Blob([request2.response], {type: "video/webm"});
      console.log(blob)
      blobList.push(blob)
    }
})
//https://developer.mozilla.org/en-US/docs/Web/API/File <- 이걸로 보면됨
  function loadFileEntry(Data) {
    chosenEntry = Data;
    chosenEntry.file(function(file) {
      readAsText(chosenEntry, function(result) {
        textarea.value = result;
      });
      saveFileButton.disabled = false;
      //displayEntryData(chosenEntry);
    });
  }

  function readAsText(fileEntry, callback) {
    fileEntry.file(function(file) {
      var reader = new FileReader();
      reader.onerror = errorHandler;
      reader.onload = function(e) {
        callback(e.target.result);
      };
      reader.readAsText(file);
    });
  }

  // function displayEntryData(theEntry) {
  //   if (theEntry.isFile) {
  //     chrome.fileSystem.getDisplayPath(theEntry, function(path) {
  //       document.querySelector('#file_path').value = path;
  //     });
  //     theEntry.getMetadata(function(data) {
  //       document.querySelector('#file_size').textContent = data.size;
  //     });
  //   }
  //   else {
  //     document.querySelector('#file_path').value = theEntry.fullPath;
  //     document.querySelector('#file_size').textContent = "N/A";
  //   }
  // }
