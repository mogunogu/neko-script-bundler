
const chokidar = require('chokidar');
const luabundle = require('lua-bundler');
const path = require('path');
const fs = require('fs');
const { execFile } = require('child_process');
const { program } = require('commander');


program
  .option('-a, --auto-restart', '테스트플레이 자동재시작')
  .option('-w, --watch', '파일변경감시')
program.parse(process.argv);

const options = program.opts();

const build = () => {
  console.log("-------------------------------------------------------------------------------------------")
  if (fs.existsSync(path.resolve('./src/ServerScripts/index.lua'))) {
    luabundle.toFile(path.resolve('./src/ServerScripts/index.lua'), path.resolve('./ServerScripts/___bundle.lua'));
    console.log("\u001b[32m✔ \u001b[33m서버 스크립트 빌드완료. \u001b[0m");
  } else {
    console.error('./src/Scripts/index.lua파일이 존재하지 않습니다!!!!');
  }
  
  if (fs.existsSync(path.resolve('./src/Scripts/index.lua'))) {
    luabundle.toFile(path.resolve('./src/Scripts/index.lua'), path.resolve('./Scripts/___bundle.lua'));
    console.log("\u001b[32m✔ \u001b[34m클라이언트 스크립트 빌드완료. \u001b[0m");
    
  } else {
    console.error('./src/Scripts/index.lua파일이 존재하지 않습니다!!!!')
  }
  console.log("-------------------------------------------------------------------------------------------");
  
  // -a command
  if (options.autoRestart) {
    console.log('⏩ 자동 재시작 . . . . . .');
    execFile('./restart_testplay.exe');
  }
}

// -w command
if (options.watch) {
  const watcher = chokidar.watch('./src/', { ignoreInitial: true });
  watcher
    .on('add', (event, path) => {
      console.log(' [Add] 파일변경을 감지했습니다');
      console.log("\u001b[32m✔ "+ event +"\u001b[0m"+ " ( " + path.atime.toLocaleTimeString() + " ) ");
      build();
    })
    .on('change', (event, path) => {
      console.log('[Change] 파일변경을 감지했습니다');
      console.log("\u001b[32m✔ "+ event +"\u001b[0m"+ " ( " + path.atime.toLocaleTimeString() + " ) ");
      build();
    })
    .on('unlink', (event, path) => {
      console.log(' [Unlink] 파일변경을 감지했습니다');
      var a = new Date();
      console.log("\u001b[31m❌ "+ event +"\u001b[0m"+ " ( " + a.toLocaleTimeString() + " ) ");
      build();
    })
}

build();

