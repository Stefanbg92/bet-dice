import React, {useState, useEffect} from 'react';
import './App.css';



const App = () => {

  const[balance, setBalance] =useState(100)
 
  const [number, setNumber] =useState(1);
  const [bet, getBet] = useState(3);
  const [dice, getDice] = useState();
  const [count, setCount] = useState(1);
  const [win, setWin] = useState();

  let text;

  switch(dice) {
    case 1:
      text = "1.png";
      break;
      case 2:
        text = "2.png";
        break;
        case 3:
          text="3.png";
          break;
          case 4:
            text="4.png";
            break;
            case 5:
              text="5.png";
              break;
              case 6:
                text="6.jpg"; 
                break;
                default:
                  text ="1.png"    
  }


  let winChance = bet/6*100;
  let winChanceDec = winChance.toFixed(2) 


  const handleChange = (event) => {
    event.preventDefault();
    setNumber(event.target.value);
  }

  const handleChangeSlider = (e) => {
    getBet(e.target.value)
  }

  const divideBet = () => {
    number > 1 ? setNumber(number/2) : setNumber(1)
  }

  const maxBet = () => {
     setNumber(balance);
  };

  if(number>balance) {
    setNumber(balance);
  }

  const payout = 
  100 / winChance ;

  const payoutDec = payout.toFixed(2)

  const payoutOnWin = number * payout;
  const payoutWin = payoutOnWin.toFixed(2)

  

  const increaseBalance = () => {
    setBalance(balance + payoutOnWin - number);
  } 

  const decreaseBalance = () => {
    setBalance(balance - number);
  };

  if(number<1) {
    setNumber(1);
  }

  useEffect(() => {
    if(bet >= dice) {
      increaseBalance(); 
     setWin('YOU WON!');
    }
    else if (bet <= dice) { 
      decreaseBalance();
      setWin('YOU LOST!');
    }
  },[count]);

  if (balance<=0){
    alert('you lost all coins, press ok to start again with 100 new coins');
    setBalance(100);
  }


  return (
    <div className='dice-container'>
      <div className='row1'>
      <div className='bet-amount'>
      <div className='title-one'><h3>bet amount</h3></div>
      <div>
      <input className='bet-size' type='number' min="1" value={number} onChange={handleChange}></input>
      <button className='btn-half' onClick={divideBet}>1/2</button>
      <button className='btn-double' onClick={() => setNumber(number * 2)}>2x</button>
      <button className='btn-max' onClick={maxBet}>MAX</button>
      </div>
      </div> 
      <div className='payout'><h3 className='title-two'>payout on win</h3>
      <div className='pay-on-win'>
      {payoutWin}
      </div>
    
      </div>
      </div>
      <div className='row2'>
      <div className='roll-under'>
      <div className='title-roll-under'>ROLL UNDER OR EQUAL TO WIN</div>
      <div className='content'>{bet}</div>
      </div>
      <div className='payout'>
      <div className='title-roll-under'>PAYOUT</div>
      <div className='content'>{payoutDec}</div>
      </div>
      <div className='win-chance'>
      <div className='title-roll-under'>WIN CHANCE</div>
      <div className='content'>{winChanceDec}%</div>
      </div>
      </div>
      <div className='prog-bar'>
        <div className='my-progress'>
         <div className='level1'>
         <input type="range" onChange={handleChangeSlider} id="bet" name="bet"
         min="1" max="5" defaultValue='3'></input>
         <output for='bet' onforminput="value = bet.valueAsNumber;"></output>
         </div>
       </div>
      </div>
      <div className='btn-roll-container'>
      <button className='btn-roll' onClick={() => {
        getDice(Math.floor(Math.random() * 6)+1);
        setCount(count+1);
      }}
        >ROLL</button>
      </div>
      <div className='dice'>
      <img src={text} alt='3' height='100px' width='100px'/>
      <div className='won'>{win}</div>
      <div className='balance'>my balance: {balance}</div>
      </div>
      </div>
  );
}

export default App;
