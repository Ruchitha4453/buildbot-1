import { contextBridge , ipcRenderer} from 'electron';


contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (message) => ipcRenderer.invoke('send-message', message),
})

