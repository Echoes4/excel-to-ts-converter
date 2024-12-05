document.getElementById('fileInput').addEventListener('change', function(e) {
    selectedFile = e.target.files[0];
});

document.getElementById('convertBtn').addEventListener('click', function() {
    if (!selectedFile) {
        alert('请先选择一个Excel文件');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        
        // 获取第一个sheet的名称
        const firstSheet = workbook.SheetNames[0];
        
        // 读取数据
        const worksheet = workbook.Sheets[firstSheet];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // 处理转换后的数据...
    };
    
    reader.readAsArrayBuffer(selectedFile);
}); 