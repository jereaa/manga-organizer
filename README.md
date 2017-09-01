# Manga Organizer

Just a little app to move files around (I made it for manga files).

### Setup

Set your configurations in `config.json`.

Example:
```json
{
    "defaultDir": "C:/Users/jerea/Desktop",
    "mangaList": [
        {
            "regex": "ReLIFE Report \\d{3}\\s?(?:v\\d)? \\[Whiteout Scans\\]\\.zip",
            "name": "ReLIFE",
            "dir": "E:/Series/Manga/ReLIFE"
        }
    ]
}
```

### Usage

Execute the following commands in the root folder of the project.
```bash
npm install
npm run tsc
npm start
```