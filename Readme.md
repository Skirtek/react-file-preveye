# 🗂️ react-file-preveye

A lightweight and flexible React component library for previewing various file types directly in your React apps.  
The library has a simple API — just pass a **File** or **Blob** object.

Tested in modern browsers including **Chrome**, **Brave**, **Edge**, and **Firefox**.

## ✨ Supported File Types

- 📦 Archives: **ZIP** *(content preview only — opening files and password-protected archives are not supported yet)*
- 🎵 Audio: All major formats (MP3, WAV, OGG, etc.)
- 📊 Data: **CSV**, **XLSX**
- 🖼️ Images: All common formats (JPG, PNG, GIF, SVG, etc.)
- 💻 Code & Text: Most plain text and source code formats
- 🎬 Video: All major formats (MP4, WEBM, etc.)
- 📄 Documents: **DOCX**, **PDF**

> ⚠️ Audio, video, and PDF previews may vary slightly depending on the browser’s built-in rendering engine.

## 🆒 Live demo
[Click and check it live](https://codesandbox.io/p/sandbox/r6lc74)

## 📦 Installation

First, install all peer dependencies:

- `styled-components` — styling library
- `mammoth` — converts DOCX files to HTML
- `xlsx` — reads Excel files

```json
{
  "react": "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0",
  "styled-components": "^6.0.0",
  "mammoth": "^1.11.0",
  "xlsx": "^0.18.5"
}
```

Using **npm**:

```bash
npm install react react-dom styled-components mammoth xlsx
npm install react-file-preveye
```

Using **yarn**:

```bash
yarn add react react-dom styled-components mammoth xlsx
yarn add react-file-preveye
```

## 🚀 Usage Example

```typescript
import { useRef, useState } from 'react';
import { FilePreveye } from 'react-file-preveye';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <div
        ref={containerRef}
        style={{ width: '1600px', height: '800px', border: '1px solid #ccc' }}
      />

      {file && <FilePreveye file={file} container={containerRef.current} />}
    </div>
  );
}
export default App
```

## 🚀 Available props
| Prop          | Type                  | Required | Description                                    |
| ------------- | --------------------- | -------- | ---------------------------------------------- |
| `file`     | `File` or `Blob`              | ✅        | File to show in the preview                     |
| `container`       | `HTMLElement` or `null` | ❌        | Custom container where file will be shown                        |   |
| `fileName`       | `string` | ❌        | File name - important when file is BLOB type and file name can not be determined from file object                      |   |

## 📄 License
This project is licensed under the [MIT License](./LICENSE). 
Feel free to use it in your own projects.

## 🧭 Roadmap / Next Steps
- 🔐 Support password-protected archives
- 📧 Support mail file previews (.eml, .msg)
- 📦 Support other archives files types such as **RAR** and **7z** 
- 💅 Remove styled-components dependency

## 💬 Support & Contributions
- 🐞 Report bugs or request features on GitHub Issues
- ⭐ If you find this library helpful, please consider starring the repo on GitHub