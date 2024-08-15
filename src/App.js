import React, { useState, useRef } from "react";
import "./App.css";

const DraggableResizableBox = () => {

  const boxRef = useRef(null);
  const [boxStyle, setBoxStyle] = useState({
    width: 200,
    height: 200,
    top: 100,
    left: 100,
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [show, setShow] = useState(false);
  
 

  const startDrag = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const startResize = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const onMouseMove = (e) => {
    if (isDragging && !isResizing) {
      setBoxStyle((prevStyle) => ({
        ...prevStyle,
        top: e.clientY - boxRef.current.offsetHeight / 2,
        left: e.clientX - boxRef.current.offsetWidth / 2,
      }));
    } 

   //  resizer
    if (isResizing) {
    setBoxStyle((prevStyle) => ({
      ...prevStyle,
      width: e.clientX - prevStyle.left / 2,
      height: e.clientY - prevStyle.top / 2,
    }));
    }
   
    
  };

  const stopActions = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

// data example
  const data =[
    {
      id: 0,
      name: "Variables",
      para: "Global Variables: A global variable has global scope which means it can be defined anywhere in your JavaScript code. Local Variables: A local variable will be visible only within a function where it is defined. Function parameters are always local to that function."
    },
    
  ];

  // read more
  const showReadmore = () =>{
    setShow(true)
  
  }
  const NotshowReadmore = () =>{
    setShow(false)
  
  }

  
  return (
  <div className="container">
    <div> 
    {data.map((item)=>{
      return(<>
        <div className="card"
        key={item.id}
        ref={boxRef}
        style={{
          width: boxStyle.width,
          height: boxStyle.height,
          top: boxStyle.top,
          left: boxStyle.left,
        }}
        onMouseDown={startDrag}
        onMouseMove={onMouseMove}
        onMouseUp={stopActions}
        onMouseLeave={stopActions}>
          <h1 key={item.id}>{item.name}</h1>
          <p>{show?(item.para):`${(item.para.substring(1,30))}...`}
           {show?
            <button className="btn"  onClick={NotshowReadmore} >Less</button>
            :
            <button className="btn"  onClick={showReadmore} >Read more</button>}
            </p>
         <div className="resizer"
        style={{
          width: 10,
          height: 10,
          background: "black",
          position: "absolute",
          right: 0,
          bottom: 0,
          cursor: "se-resize",
        }}
        onMouseDown={startResize}
      >
        <span >↘️</span>
        </div>
        </div>
      </>
      )
    })}
      
    </div>
    
    </div>
  );
};

export default DraggableResizableBox;
