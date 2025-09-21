import { useState } from "react"
import Game from './Game';
import Home from './Home';

function App() {
 const [started,setstarted]=useState(false);

 return(<>
       {started ? 
          <Game/> :
          <Home onstart={()=>setstarted(true)}/>}
 
       
       </>
 );

}

export default App
