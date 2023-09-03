const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.question("Enter data that u want to append in file ", function (data) {
    fs.appendFile('temp.txt', data, function (err) {
        if (err) throw err;
        console.log('Saved!');

        const r2 = readline.createInterface({
            input: fs.createReadStream('./temp.txt'),
            output: process.stdout,
            terminal: false
        });
        r2.on('line', (line) => {
            console.log(line);
        });
    });

});
