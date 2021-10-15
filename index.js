
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
  if (!options.watch) {
    console.log("-------------------------------------------------------------------------------------------")
  }
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
  const date = () => "(\u001b[35m " + new Date().toLocaleTimeString() + " \u001b[0m)"
  
  const changed = [];
  const check = (path) => {
    if (!changed.includes(path)) {
      changed.push(path)
    }
    console.log("  현재까지 변경된 파일 : " + changed.length + " 개 ")
  }
  watcher
    .on('ready', () => {
      console.clear()
      console.log("\u001b[34m  실시간 감시모드를 시작합니다!!\u001b[0m ( 종료하려면 : Ctrl + C )")
    })
    .on('all',(_,path) => {
      check(path)
      console.log("\u001b[34m  실시간 감시모드 실행중 . . . . . . \u001b[0m( 종료하려면 : Ctrl + C )")
    })
    .on('add', (path,stats) => {
      build();
      console.clear()
      console.log("\u001b[32m✔ [Add] 파일변경을 감지했습니다 : " + path + "\u001b[0m" + " -" , stats.size , "byte" , date());
    })
    .on('change', ( path, stats ) => {
      build();
      console.clear()
      console.log("\u001b[32m✔ [Chage] 파일변경을 감지했습니다 : "+ path +"\u001b[0m" + " -" , stats.size , "byte" , date());
    })
    .on('unlink', path => {
      build();
      console.clear()
      console.log("\u001b[31m❌ 파일변경을 감지했습니다 : "+ path +"\u001b[0m"+ date());
    })
} 
  build();


