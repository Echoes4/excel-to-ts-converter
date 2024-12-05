const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile(path.join(__dirname, 'renderer', 'index.html'));

    // 开发时可以打开开发者工具
    // win.webContents.openDevTools();
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

// 处理保存对话框
ipcMain.handle('show-save-dialog', async (event, options) => {
    return dialog.showSaveDialog(options);
});

// 处理文件保存
ipcMain.handle('save-file', async (event, { filePath, fileBuffer }) => {
    if (!filePath || !fileBuffer) {
        throw new Error('文件路径或内容不能为空');
    }
    // 将数组转回 Buffer
    const buffer = Buffer.from(fileBuffer);
    await fs.writeFile(filePath, buffer);
});

// 在文件选择处理函数中添加状态更新
ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'Excel Files', extensions: ['xlsx', 'xls'] }
    ]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    // 返回选中的文件路径
    return result.filePaths[0];
  }
  return null;
});