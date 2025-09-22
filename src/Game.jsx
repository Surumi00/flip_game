import { useEffect, useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";

function gameStarted({ level, onfinished,ongameover }) {
  const [pieces, setpieces] = useState([]);

  let gameIcons = [];
  const level1icons = ["🐢", "🐥", "🐸"];
  const level2icons = ["🦊", "🦄", "🐧", "🐼"];
  const level3icons = ["🌸", "✨", "😊", "💻", "📚", "🌍", "☕", "🎶"];

  function startgame() {
    if (level === 1) gameIcons = [...level1icons];
    else if (level === 2) gameIcons = [...level2icons];
    else if (level === 3) gameIcons = [...level3icons];
    else {
      ongameover();
      return;
    }

    const duplicateicons = [...gameIcons, ...gameIcons];
    const newgameicon = [];

    while (newgameicon.length < gameIcons.length * 2) {
      const randomindex = Math.floor(Math.random() * duplicateicons.length);
      newgameicon.push({
        emoji: duplicateicons[randomindex],
        flipped: false,
        solved: false,
        position: newgameicon.length,
      });
      duplicateicons.splice(randomindex, 1);
    }
    setpieces(newgameicon);
  }

  useEffect(() => {
    startgame();
  }, [level]);

  function handleclick(data) {
    const flippeddata = pieces.filter((data) => data.flipped && !data.solved);
    if (flippeddata.length === 2) return;

    const newpieces = pieces.map((piece) => {
      if (piece.position === data.position) {
        piece.flipped = !piece.flipped;
      }
      return piece;
    });
    setpieces(newpieces);
  }

  function gamelogicforflipped() {
    const flippeddata = pieces.filter((data) => data.flipped && !data.solved);

    if (flippeddata.length === 2) {
      setTimeout(() => {
        if (flippeddata[0].emoji === flippeddata[1].emoji) {
          setpieces(
            pieces.map((piece) => {
              if (
                piece.position === flippeddata[0].position ||
                piece.position === flippeddata[1].position
              ) {
                piece.solved = true;
              }
              return piece;
            })
          );
        } else {
          setpieces(
            pieces.map((piece) => {
              if (
                piece.position === flippeddata[0].position ||
                piece.position === flippeddata[1].position
              ) {
                piece.flipped = false;
              }
              return piece;
            })
          );
        }
      }, 800);
    }
  }

  const gamefinished = () => {
    if (pieces.every((piece) => piece.solved)) {
      onfinished();
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  useEffect(() => {
    gamelogicforflipped();

    if (pieces.length > 0) {
      gamefinished();
    }
  }, [pieces]);

  return (
    <>
       <div>
              { level===1 ? (<h3 className="levelsmention" >Level 1</h3>) 
              : level===2 ? (<h3 className="levelsmention">level 2</h3>) 
              : (<p></p>) }
            </div>
      <div className={ level===1 ?"container1" : level===2 ? "container2" : "container3"}>
        
        {pieces.map((data, index) => (
          <div
            className={`flip-card ${
              data.flipped || data.solved ? "active" : ""
            } `}
            key={index}
            onClick={() => handleclick(data)}
          >  
           
            <div className="flip-card-inner">
              <div className="flip-card-front">?</div>
              <div className="flip-card-back">{data.emoji}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default gameStarted;
