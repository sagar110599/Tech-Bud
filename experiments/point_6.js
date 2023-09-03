const fs = require('fs')

const path = './.gitignore'

try {
    if (fs.existsSync(path)) {
        const data = fs.readFileSync(path, 'UTF-8');
        const lines = data.split(/\r?\n/);
        var count = 0;
        lines.forEach((line) => {
            console.log(line);
            count = count + 1

        });
        console.log("NO OF LINES:" + count);
    }
} catch (err) {
    console.error(err)
}