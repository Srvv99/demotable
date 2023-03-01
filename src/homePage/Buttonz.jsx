import React from 'react';

const Buttonz = ({length,postPerPage,pagesetting}) => {
 const c=length/postPerPage;
  let arr=[];
 for(let i= 0; i<Math.ceil(c);i++){
  arr.push(i);
 }

// console.log(arr);
  return (
    <>
    {arr.map((current,index)=>{
      return <button className="buttonz" key={index} onClick={()=>pagesetting(index+1)}>{index+1}</button>
    })}
    
    </>
  )
}

export default Buttonz;