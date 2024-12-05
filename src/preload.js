const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    showSaveDialog: async (options) => {
        return await ipcRenderer.invoke('show-save-dialog', options);
    },
    saveFile: async (data) => {
        return await ipcRenderer.invoke('save-file', data);
    }
}); 