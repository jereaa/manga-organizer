import * as fse from "fs-extra";

const config = JSON.parse(fse.readFileSync(__dirname + "/../config.json", "utf8"));

fse.readdir(config.defaultDir, (err, files) => {

    let filesToMove = 0;
    let fileMovesTried = 0;
    let filesProperlyMoved = 0;

    files.forEach((file) => {
        if (file.endsWith(".zip")) {
            config.mangaList.forEach((manga) => {
                const regex = new RegExp(manga.regex);
                if (regex.test(file)) {
                    filesToMove++;
                    const srcPath = `${config.defaultDir}/${file}`;
                    const destPath = `${manga.dir}/${file}`;
                    fse.move(srcPath, destPath, (error) => {
                        fileMovesTried++;
                        if (error) {
                            console.error("An error has occurred: " + error.message);
                        } else {
                            filesProperlyMoved++;
                            console.log(`Moved file '${file}' to dir '${manga.dir}'.`);
                        }

                        if (filesToMove === fileMovesTried) {
                            console.log(`Successfully moved ${filesProperlyMoved} out of ${fileMovesTried} files.`);
                        }
                    });
                }
            });
        }
    });
    if (filesToMove === 0) {
        console.log("No files were found to move.");
    }
});
