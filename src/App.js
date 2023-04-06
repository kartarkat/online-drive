import { useState } from 'react';
import './App.css';
import { fileConfig } from './Assets/Data/fileConfig';
import RenderFiles from './components/RenderFiles';

function App() {
  const [fileData, setFileData] = useState(fileConfig)

  const handleNavigate = (parentId, config = fileConfig) => {
    const { id, items } = config;
    if (id === parentId) {
        setFileData(config);
        return;
      }
    items.forEach(item => item.id === parentId ? setFileData(item) : handleNavigate(item.parentId, item));
};

  return (
    <div className="App">
      <RenderFiles fileData={fileData} setFileData={setFileData} handleNavigate={handleNavigate} /> 
  </div>
  );
}

export default App;
