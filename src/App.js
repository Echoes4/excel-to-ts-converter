import React, { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSave = async () => {
    if (!selectedFile) {
      alert('请先选择文件');
      return;
    }

    try {
      // 调用 electron 的保存对话框
      const result = await window.electron.showSaveDialog({
        defaultPath: selectedFile.name,
        filters: [
          { name: '所有文件', extensions: ['*'] }
        ]
      });

      if (result.filePath) {
        // 读取选中的文件
        const reader = new FileReader();
        reader.onload = async (e) => {
          const arrayBuffer = e.target.result;
          const buffer = new Uint8Array(arrayBuffer);
          const data = {
            filePath: result.filePath,
            fileBuffer: Array.from(buffer)
          };
          console.log('Saving file with data:', {
            filePath: data.filePath,
            bufferLength: data.fileBuffer.length
          });
          await window.electron.saveFile(data);
          alert('文件保存成功！');
        };
        reader.readAsArrayBuffer(selectedFile);
      }
    } catch (error) {
      console.error('保存文件时出错:', error);
      alert('保存文件失败，请重试');
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSave}>保存文件</button>
    </div>
  );
}

export default App; 