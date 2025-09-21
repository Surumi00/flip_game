import './home.css'

function Home(props){

return(
    <>
    <div className="section">
    <h1 >Memo <br></br> Game</h1>
    <h4 style={{color:"white" , fontFamily: "Comic Sans MS",marginTop:"50px"}}>Test Your Memmory Skills!!</h4>
    <button onClick={props.onstart}>Start Game</button>
    <p style={{color:"white"}}>Tap start to begin - match all the pairs!</p>
    </div>
    </>
)
}

export default Home