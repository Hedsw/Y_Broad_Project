# Project_dandelion
By Kevin and Yunhyeok 

Feb 22 기록
1. Firebase랑 연동

- Extension에서 쓰는 Permission을 끌어다 써본 결과..
// "content_security_policy": "script-src 'self' https://cdn.firebase.com https://*.firebaseio.com; object-src 'self'",

작동이 안되는 것 같음.

Extension에서는 저 Permission만 넣고 파이어베이스 일반 웹에서 파이어베이스 연동하듯이 만들면 된다고 되어 있는데, 실제로 해보니까 두 종류의 에러가 존재

1)  Uncaught ReferenceError: firebase is not defined
    at window.js:71
2)  window.html:1 window.localStorage is not available in packaged apps. Use chrome.storage.local instead.


2. Kiosk 사용 - 케시에 저장 안해도 되고, 편하다고 함..
관련 링크 1. - https://developer.chrome.com/apps/fileSystem#method-requestFileSystem
관련 링크 2. - https://developer.chrome.com/apps/manifest/kiosk_enabled


3. RequestFileSystem - 크롬 OS에서 작동 하는 것 같음 (맥, Window에서 작동 X)


4. 해야 할 것..
 4-1)Blob 객체 파일 받아서.. 파일로 변환 하고 그거를 해당 디렉터리에 저장 - 완료 

 4-2)삭제도 하기 


