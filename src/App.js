import './App.css';
import { fileConfig } from './Assets/Data/fileConfig';
import RenderFiles from './components/RenderFiles';

function App() {
  return (
    <div className="App">
        <RenderFiles fileData={fileConfig}/>
    </div>
  );
}

export default App;
