# neko-script-bundler
>네코랜드 스크립트를 한파일로 묶어주는 cli툴입니다.

### 왜 사용해야 할까요?
- 네코랜드는 ServerScripts, Scripts 폴더에만 스크립트 파일을 넣어야 해서 폴더별 스크립트 관리가 힘들었습니다.
- 새로운 스크립트를 작성하고 매번 테스트 플레이를 껐다 켜는 것이 번거로웠습니다.

neko-script-bundler는 이런 문제들을 해결합니다.

### 설치방법
---


### 사용방법
---
  빌드하기:
  ```js
  node index.js
  ```  
  실시간 감시모드:
  ```js
  node index.js -w
  ```
  
  빌드 후 테스트 플레이 자동 실행:
  ```js
  node index.js -a
  ```
  
  도움말:
  ```js
  node index.js -h
  ```
