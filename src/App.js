import { useState } from 'react';
import './App.css';
import { fileConfig } from './Assets/Data/fileConfig';
import RenderFiles from './components/RenderFiles';

function App() {
  const [fileData, setFileData] = useState(fileConfig)

  return (
    <div className="App">
      <RenderFiles fileData={fileData} setFileData={setFileData} /> 
  </div>
  );
}

export default App;
