# Excel To TypeScript Converter

一个将 Excel 文件转换为 TypeScript 接口和数据的桌面应用程序。

## 功能特点

- 支持 Excel 文件 (.xlsx, .xls) 转换
- 自动生成 TypeScript 接口定义
- 自动推断数据类型（number | string）
- 支持多个工作表（Sheet）
- 支持自定义接口名称
- 支持导出为 TypeScript (.ts) 或 JavaScript (.js) 文件
- 实时预览转换结果

## 下载安装

您可以从 [GitHub Releases](https://github.com/Echoes4/excel-to-typescript/releases) 页面下载最新版本：

- **便携版**：下载 `Excel To TypeScript Converter-portable-{version}.exe`
- **安装版**：下载 `Excel To TypeScript Converter-setup-{version}.exe`

## 使用说明

1. 选择 Excel 文件
2. 选择要转换的工作表（Sheet）
3. （可选）自定义接口名称
4. 选择输出格式（TypeScript/JavaScript）
5. 点击保存按钮导出文件

## 开发相关

### 环境要求

- Node.js >= 16
- npm >= 8

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/Echoes4/excel-to-typescript.git

# 安装依赖
npm install

# 启动应用
npm start

# 构建便携版
npm run build:portable

# 构建安装包
npm run build:setup
```

### 项目结构

```
excel-to-typescript/
├── src/
│   ├── main.js          # 主进程
│   ├── preload.js       # 预加载脚本
│   └── renderer/        # 渲染进程
│       └── index.html   # 主界面
├── build/
│   ├── icon.ico         # 应用图标
│   └── installer.nsh    # NSIS 安装脚本
└── package.json
```

## 示例输出

### Excel 输入

```
| 说明  | ID   | 名称  | 类型 | 价格  |
|-----|------|------|-----|------|
| id   | name | type | price |
| 1001 | 商品A | 1    | 99.9 |
| 1002 | 商品B | 2    | 199.9 |
```

### TypeScript 输出

```typescript
export interface IExcelData {
    id: number | null;
    name: string | null;
    type: number | null;
    price: number | null;
}

export var Sheet1: Record<number, IExcelData> = {
    1001: { id: 1001, name: "商品A", type: 1, price: 99.9 },
    1002: { id: 1002, name: "商品B", type: 2, price: 199.9 }
};
```

## 技术栈

- Electron
- TypeScript/JavaScript
- SheetJS (xlsx)

## 许可证

[MIT](LICENSE)