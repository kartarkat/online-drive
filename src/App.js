import { useEffect, useState } from 'react';
import './App.css';
import { fileConfig } from './Assets/Data/fileConfig';
import RenderFiles from './components/RenderFiles';
import useTreeTraversal from './hooks/useTreeTraversal';

function App() {
  const [fileData, setFileData] = useState(fileConfig)
  const [breadcrumbs, setBreadcrumbs] = useState([])
  const { insertNode, deleteNode, updateNode } = useTreeTraversal();

  useEffect(() => {
    setBreadcrumbs([{ id: fileConfig.id, name: fileConfig.name }])
  }, [])

  const handleInsertData = (id, val, isFolder) => {
    const res = insertNode(fileData, id, val, isFolder);
    setFileData(res);
  };

  const handleDeleteData = (id) => {
    const res = deleteNode(fileData, id);
    setFileData(res);
  };

  const handleUpdateData = (id, val) => {
    const res = updateNode(fileData, id, val);
    setFileData(res);
  };

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

  const isValuePresent = (value, config = fileConfig) => {
    const { name, items } = config;
    let isPresent
    if (value === name) isPresent = true
    items.forEach(item => item.name === value ? isPresent = true : isValuePresent(item.name, item));
    return isPresent
  }

  return (
    <div className="App">
      <RenderFiles
        breadcrumbs={breadcrumbs}
        setBreadcrumbs={setBreadcrumbs}
        fileData={fileData}
        setFileData={setFileData}
        handleNavigate={handleNavigate}
        insertData={handleInsertData}
        deleteData={handleDeleteData}
        updateData={handleUpdateData}
        isValuePresent={isValuePresent}
      />
    </div>
  );
}

export default App;
