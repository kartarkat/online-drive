import { useEffect, useState } from 'react';
import './App.css';
import { fileConfig } from './Assets/Data/fileConfig';
import Files from './components/Files';

function App() {
  const [data, setData] = useState(fileConfig)
  const [fileData, setFileData] = useState(fileConfig)
  const [breadcrumbs, setBreadcrumbs] = useState([])

  useEffect(() => {
    setBreadcrumbs([{ id: fileConfig.id, name: fileConfig.name }])
  }, [])

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      items: prevData.items.map(item => item.id === fileData.id ? { ...item, items: fileData.items } : item)
    }))
  }, [fileData])

  const handleBreadcrumbs = (id) => {
    const index = breadcrumbs.findIndex(obj => obj.id === id)
    setBreadcrumbs(breadcrumbs.slice(0, index + 1))
  }

  const handleNavigate = (parentId, config = data) => {
    const { id, items } = config;
    if (id === parentId) {
      handleBreadcrumbs(id)
      setFileData(config);
      return;
    }
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.id === parentId) {
        setFileData(item);
        handleBreadcrumbs(item.id)
        return;
      }
      handleNavigate(parentId, item);
    }
  };
  
  return (
    <div className="App">
      <Files
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
