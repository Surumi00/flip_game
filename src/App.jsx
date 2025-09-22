import { useState } from "react";
import Game from "./Game";
import Home from "./Home";

function App() {
  const [started, setstarted] = useState(false);
  const [currentlevel, setcurrentlevel] = useState(1);
  const [gamestatus, setgamestatus] = useState();

  function handlestart() {
    setstarted(true);
  }

  function handlelevel() {
    setcurrentlevel((prev) => prev + 1);
    setgamestatus(undefined);
  }
  return (
    <>
      {!started ? (
        <Home onstart={handlestart} />
      ) : gamestatus === "win" ? (
        
        <div className="win">
          <h2>🎉 YOU WIN!!!! 🎉</h2>
          <button onClick={handlelevel}>Next Level</button>
        </div>
      ) : gamestatus == "gameover" ? (
        currentlevel > 3 ? (
          <div className="win">
          <h2> Game Over!!!! </h2></div> ):
        <div className="win">
          <h2> Game Over!!!! </h2>
        
          <button
            onClick={() => {
              if(currentlevel===3){
                setcurrentlevel(1)
              }else setcurrentlevel(currentlevel);
              setgamestatus(undefined);
            }}
          >
            Try Again
          </button>
        </div>
      ) : (
        <Game
          level={currentlevel}
          
          onfinished={() => setgamestatus("win")}
          ongameover={() => setgamestatus("gameover")}
        ></Game>
      )}
    </>
  );
}

export default App;
