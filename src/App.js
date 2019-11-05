import React, {useState, useEffect} from 'react';
import './App.css';

function App(){

  const [input, setInput] = useState('');
  const [inputCount, setInputCount] = useState(0);
  const [inputIsOper, setInputIsOper] = useState(false);
  const [negateInput, setNegateInput] = useState(false);
  
  const [regions, setRegions] = useState({
      A:  false,
      B:  false, 
      IN: false, 
      ALL:false
  });

  useEffect(()=>{
    if(inputCount == 3)
        calculate();
    else if(inputCount > 3){
      clearInput();
    }
  }, [inputCount]);

  const handleInput = (e)=>{
    const value = e.target.innerHTML;

    setInput(input + value);
    setInputIsOper(!inputIsOper);
    setInputCount(inputCount + 1);
  }

  const clearInput = ()=>{
      setInput('');
      setInputCount(0);
      setInputIsOper(false);
      setRegions({
        A:  false,
        B:  false, 
        IN: false, 
        ALL:false
      })
  }

  const calculate = ()=>{
    
    let isUnion = true;
    let pos = input.indexOf('∪');

    if(pos === -1){
      pos = input.indexOf('∩');
      isUnion = false;
    }

    const LeftSide = input.slice(0, pos);
    const RightSide = input.slice(pos+1);

    if(isUnion){
      ShadeRegion(LeftSide);
      ShadeRegion(RightSide);
    }else{
      ShadeRegion(LeftSide);
      ShadeRegionIfShaded(RightSide);
    }
  }

  const ShadeRegion = (Symbol)=>{
    switch(Symbol){
      case 'A':   setRegions(prevReg => ({...prevReg, A: true, IN: true})); break;
      case 'B':   setRegions(prevReg => ({...prevReg, B: true, IN: true})); break;
      case 'A\'': setRegions(prevReg => ({...prevReg, B: true, ALL: true})); break;
      case 'B\'': setRegions(prevReg => ({...prevReg, A: true, ALL: true})); break;
      default: alert(`Err! recieved an unhandled symbol: ${Symbol}`);
    }
  }

  const ShadeRegionIfShaded = (Symbol)=>{
    switch(Symbol){
      case 'A':   setRegions(prevReg => ({A: true && prevReg.A, IN: true && prevReg.IN})); break;
      case 'B':   setRegions(prevReg => ({B: true && prevReg.B, IN: true && prevReg.IN})); break;
      case 'A\'': setRegions(prevReg => ({B: true && prevReg.B, ALL: true && prevReg.ALL})); break;
      case 'B\'': setRegions(prevReg => ({A: true && prevReg.A, ALL: true && prevReg.ALL})); break;
      default: alert(`Err! recieved an unhandled symbol: ${Symbol}`);
    }
  }


  return (
    <div className='App'>
        <div className={'VDiagram' + (regions.ALL ? ' Shaded' : '')}>
        <div className={'Circle2' + (regions.B ? ' Shaded' : '')}> </div>
          <div className={'Circle1' + (regions.A ? ' Shaded' : '')}> 
            <div className={'OvalMiddle' + (regions.IN ? ' Shaded' : '')}> </div>
          </div>
          
          
        </div>


        <div className='InputField'>{input}</div>

        <div className='Controls'>

          <Button Name="¬" Method={()=>setNegateInput(!negateInput)} isDisabled={false}/>
          <Button Name={negateInput ? "A'" : "A"} Method={(e)=>handleInput(e)} isDisabled={inputIsOper}/>
          <Button Name={negateInput ? "B'" : "B"} Method={(e)=>handleInput(e)} isDisabled={inputIsOper}/>
          
          
          <Button Name="∪" Method={(e)=>handleInput(e)} isDisabled={!inputIsOper}/>
          <Button Name="∩" Method={(e)=>handleInput(e)} isDisabled={!inputIsOper}/>
          <button className='clear' onClick={()=>clearInput()}>CLR</button>
          
        </div>

    </div>
  )
}
  
const Button = ({Name, Method, isDisabled})=>{
  return (
      <button disabled={isDisabled} className='btn' onClick={(e)=>Method(e)}>{Name}</button>
    )
}


export default App;
  