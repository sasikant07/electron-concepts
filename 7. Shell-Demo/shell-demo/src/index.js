const openBtn = document.getElementById('openBtn');
const shell = require('electron').shell;

openBtn.addEventListener('click', function () {
    shell.showItemInFolder('E:\\files\\demo.txt');
    shell.openPath('E:\\files\\electron.png');
    shell.openExternal('https://www.electronjs.org');
});