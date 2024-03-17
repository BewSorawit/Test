import './App.css'; // Imports the CSS file for styling
import Records from './record.json'; // Imports the JSON file containing records

function App() {
  return (
    <div className="App">
      <br /><br />
      {Records && Records.map((record) => {
        return (
          <div className="box" key={record.id}>
            <div><h1><strong>{record.title}</strong></h1></div>
            <div>{record.content}</div>
            {record.tech && record.tech.map((tech) => {
              return <div key={tech}>{tech.name}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
