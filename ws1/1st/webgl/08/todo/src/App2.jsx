import { useState } from 'react';
import './App.css';

function Button(props) {
  return (
    <button className="btn" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

function App() {
  const [count, setCount] = useState(0);

  const countUp = () => {
    setCount(count + 1);
  };

  const countDown = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const countReset = () => {
    setCount(0);
  };

  return (
    <div className="container">
      <h1>カウンター：{count}</h1>

      <Button text="増やす" onClick={countUp} />
      <Button text="減らす" onClick={countDown} />
      <Button text="リセット" onClick={countReset} />
    </div>
  );
}

export default App;