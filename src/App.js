import { useEffect, useState } from 'react';
import './App.css';
import { fileConfig } from './Assets/Data/fileConfig';
import RenderFiles from './components/RenderFiles';

function App() {
  const [fileData, setFileData] = useState(fileConfig)
  const [breadcrumbs, setBreadcrumbs] = useState([])

  useEffect(() => {
    setBreadcrumbs([{ id: fileConfig.id, name: fileConfig.name }])
  }, [])

  const handleBreadcrumbs = (id) => {
    const result = []
    let isCurrentFolder = false
    breadcrumbs.forEach(obj => {
      if (!isCurrentFolder) result.push(obj)
      if (obj.id === id) isCurrentFolder = true
    })
    setBreadcrumbs(result)
  }

  const handleNavigate = (parentId, config = fileConfig) => {
    const { id, items } = config;
    if (id === parentId) {
      handleBreadcrumbs(parentId)
      setFileData(config);
      return;
    }
    items.forEach(item => {
      if (item.id === parentId) {
        setFileData(item);
        handleBreadcrumbs(parentId)
      }
      else handleNavigate(item.parentId, item)
    });
  };

  return (
    <div className="App">
      <RenderFiles
        fileData={fileData}
        setFileData={setFileData}
        breadcrumbs={breadcrumbs}
        setBreadcrumbs={setBreadcrumbs}
        handleNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
