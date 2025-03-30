import './App.css';
import reactLogo from './assets/react.svg';
import useLocalCounter from './Hooks/UseLocalCounter';
import viteLogo from '/vite.svg';

function App() {
  const [count, setCount] = useLocalCounter('counter', 0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div style={{alignItems: 'center'}}>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button onClick={() => setCount(count > 0 ? count -1 : 0)} 
        style={{ marginLeft: '10px' }}
        disabled={count === 0}>
          Decrement
        </button>
        <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>
          Reset
        </button>
        <p>count is <strong>{count}</strong></p>
      </div>
    </>
  );
}

export default App;
