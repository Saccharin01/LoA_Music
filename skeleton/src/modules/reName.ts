const fs = require('fs').promises
const path = require('path')


const reNameFile = async (sourcePath : string) : Promise<void> => {
  try {
    const directoryPath : string = path.join(__dirname, sourcePath);
    const files : string[] = await fs.readdir(directoryPath);

    for (const file of files) {
      const oldPath : string = path.join(directoryPath, file);

      const stat = await fs.stat(oldPath);
      if (stat.isFile()) {
        const newFileName : string = file.trim().split(" ").join("_");
        const newPath : string = path.join(directoryPath, newFileName);

        if (oldPath !== newPath) {
          try {
            await fs.rename(oldPath, newPath);
            console.log(`Renamed: ${file} -> ${newFileName}`);
          } catch (err) {
            console.error(`Error renaming ${file}: ${err}`);
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
  }
};

export default reNameFile