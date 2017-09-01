import * as fse from 'fs-extra';

const config = JSON.parse(fse.readFileSync(__dirname + '/../config.json', 'utf8'));

var filesMoved = false;

fse.readdir(config.defaultDir, (err, files) => {
    files.forEach((file) => {
        if (file.endsWith('.zip')) {
            config.mangaList.forEach((manga) => {
                const regex = new RegExp(manga.regex);
                if (regex.test(file)) {
                    const srcPath = `${config.defaultDir}/${file}`;
                    const destPath = `${manga.dir}/${file}`;
                    fse.move(srcPath, destPath, (err) => {
                        if (err) {
                            console.error('An error has occurred: ' + err.message);
                        } else {
                            filesMoved = true;
                            console.log(`Moved file '${file}' to dir '${manga.dir}'`);
                        }
                    });
                }
            });
        }
    });
    if (!filesMoved) {
        console.log("No manga files were found.");
    }
});