# Excel To TypeScript Converter

将Excel表格数据转换为TypeScript接口和数据的桌面工具。

## 特性

- 自动生成TypeScript接口定义
- 智能类型推断（number/string）
- 支持空值（null）处理
- 生成类型安全的数据对象
- 简单的拖放操作界面

## 安装
bash
克隆仓库
```bash
git clone https://github.com/Echoes4/excel-to-ts-converter.git
```
安装依赖
```bash
npm install
```


## 使用

### 开发模式

```bash
npm start
```

### 构建应用
```bash
npm run build
```

## Excel格式要求

Excel文件需要按以下格式组织：

| 说明 |       |      |       |         |       |      |
| ---- | ----- | ---- | ----- | ------- | ----- | ---- |
| id   | name  | type | value | enabled | group | desc |
| 1001 | 商品A | 1    | null  | true    | null  | null |
| 1002 | 商品B | 2    | 99.9  | false   | 101   | null |

- 第一行：说明行
- 第二行：字段名称定义
- 第三行及以后：数据内容

## 生成结果
```typescript
export interface ItemData {
    id: number | null;
    name: string | null;
    type: number | null;
    value: number | null;
    enabled: boolean | null;
    group: number | null;
    desc: string | null;
}
export var items: Record<number, ItemData> = {
    1001: { id: 1001, name: "商品A", type: 1, value: null, enabled: true, group: null, desc: null },
    1002: { id: 1002, name: "商品B", type: 2, value: 99.9, enabled: false, group: 101, desc: null }
};
```
## 项目结构

```
excel-to-ts-converter/
├── src/
│ ├── main.js # Electron主进程
│ ├── preload.js # 预加载脚本
│ └── renderer/ # 渲染进程
│ ├── index.html # 主界面
│ └── dist/ # 依赖文件
├── package.json # 项目配置
├── README.md # 项目说明
└── LICENSE # MIT许可证
```

## 许可证

[MIT](LICENSE) © Yanis Jiang