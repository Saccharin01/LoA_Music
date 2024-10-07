const fs = require("fs");
const path = require("path");
const jsonData = require("./output.json");

const parentDirPath = "../music";

// 하위 디렉토리를 재귀적으로 탐색하면서 genre 속성을 업데이트하는 함수
const updateGenreIfIdExists = (dirPath, dirName) => {
  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 하위 디렉토리가 있으면 재귀적으로 탐색
      updateGenreIfIdExists(fullPath, path.basename(fullPath));
    } else {
      // 파일인 경우 _id가 파일명에 존재하는지 확인
      jsonData.forEach((asset) => {
        if (asset._id === path.parse(item).name) {
          // _id와 파일명이 일치하는 경우 genre 속성을 switch 문을 사용해 변경
          switch (dirName) {
            case "군단장":
              asset.genre = "commander";
              break;
            case "대륙":
              asset.genre = "continent";
              break;
            case "모험":
              asset.genre = "adventure";
              break;
            case "섬":
              asset.genre = "island";
              break;
            case "어비스":
              asset.genre = "abyss";
              break;
            case "오브":
              asset.genre = "orb";
              break;
            default:
              asset.genre = "";
              break;
          }
          console.log(`Updated genre for ${asset._id} to '${asset.genre}'`);
        }
      });
    }
  });
};

// 최상위 디렉토리 탐색 시작
updateGenreIfIdExists(parentDirPath, path.basename(parentDirPath));

// 변경된 JSON 데이터를 다시 파일로 저장
const updatedJsonPath = "./updated_output.json";
fs.writeFileSync(updatedJsonPath, JSON.stringify(jsonData, null, 2));
console.log("Updated JSON has been saved successfully!");
