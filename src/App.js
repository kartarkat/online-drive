import { useState } from 'react';
import './App.css';
import { fileConfig } from './Assets/Data/fileConfig';
import RenderFiles from './components/RenderFiles';
import useTreeTraversal from './hooks/useTreeTraversal';

function App() {
  const [fileData, setFileData] = useState(fileConfig)
  const { insertNode, deleteNode, updateNode } = useTreeTraversal();

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

  const handleNavigate = (parentId, config = fileConfig) => {
    const { id, items } = config;
    if (id === parentId) {
        setFileData(config);
        return;
      }
    items.forEach(item => item.id === parentId ? setFileData(item) : handleNavigate(item.parentId, item));
};

const isValuePresent = (value, config = fileConfig) => {
  const { name, items } = config;
  let isPresent
  if(value === name)  isPresent = true
  items.forEach(item => item.name === value ? isPresent = true : isValuePresent(item.name, item));
  return isPresent
  // isPresent = items.some(item => item.name === name)

}

  return (
    <div className="App">
      <RenderFiles 
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
