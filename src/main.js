const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile(path.join(__dirname, 'renderer', 'index.html'));

    // 开发时可以打开开发者工具
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// 处理保存文件的IPC消息
ipcMain.handle('save-file', async (event, { content, filename }) => {
    try {
        const { filePath } = await dialog.showSaveDialog({
            defaultPath: filename,
            filters: [
                { name: 'TypeScript', extensions: ['ts'] }
            ]
        });

        if (filePath) {
            fs.writeFileSync(filePath, content);
            return { success: true, path: filePath };
        }
        return { success: false, error: 'No path selected' };
    } catch (error) {
        return { success: false, error: error.message };
    }
});