const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

let btnMin = $("#min");
let btnMax = $("#max");
let btnClose = $("#close");

btnMin.addEventListener("click", (
)=>{
    ipc.send('minimizeApp');
});
btnMax.addEventListener("click", ()=>{
    ipc.send('maximizeApp');
});
btnClose.addEventListener("click", ()=>{
    ipc.send('closeApp');
});

export default contextmenu;