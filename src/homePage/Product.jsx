import React from 'react';
import { useEffect, useState } from 'react';
import "./product.css";
import Buttonz from './Buttonz';


const Product = () => {

  const [pdata, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerpage] = useState(5);
  const [show, setShow] = useState(false);


  const lastIndex = page * postPerPage;
  const firstIndex = lastIndex - postPerPage;


  const fetchProduct = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
    // setData(data);
    /////
    if (show) {
      let x = data.sort((a, b) => {
        return b.id - a.id
      });
//add this line
//add another line
      setData(x);
    }
    
    if (!show){
      
        let y = data.sort((a, b) => {
          return a.id - b.id
        });

        setData(y);
      }
  }



  useEffect(() => {
    fetchProduct();

  }, [show])

  

  function pageSetting(selectedpage) {
    setPage(selectedpage);
  }

  const inputhandler = (e) => {

    const filterdata = pdata.filter((curr) => {

      console.log(e.target.value);
      return curr.title.includes(e.target.value);

    })



    if (e.target.value === "") {
      setData([]);
    } else {
      setData(filterdata);

    }

    console.log("filter data is", filterdata);

  }

  const inputhandler2 = (e) => {

    const filterdata = pdata.filter((curr) => {

      console.log(e.target.value);
      return curr.body.includes(e.target.value);

    })


    setData(filterdata);
    console.log("filter data is", filterdata);

  }


  const inputhandler3 = (e) => {

    const filterdata = pdata.filter((curr) => {

      console.log(e.target.value);
      return curr.id.toString().includes(e.target.value);
      // console.log(curr.id);

    })

    setData(filterdata);

    // console.log("filter data is", filterdata);
  }

  let currentdatapage = pdata.slice(firstIndex, lastIndex);



  return (
    <>
    <div className="allwrapper">
      <div className="wrapper">
        <div className="recordlist">Total Record: {pdata.length}</div>

        <div className="dataperpage">
          <span>Data per Page:</span>
          <select onChange={e => setPostPerpage(e.target.value)}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>
      <div className="tableItem">
        <table width="100%" border="1" style={{ borderCollapse: "collapse", borderColor: "black" }}>
          <thead>
            <tr>
              <th onClick={() => setShow(!show)}>id</th>
              <th>title</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><input type="text" placeholder="search ID here..." onChange={inputhandler3}></input></th>
              <th><input type="text" placeholder="search Title here..." onChange={inputhandler}></input></th>
              <input type="text" placeholder="search Description here..." onChange={inputhandler2}></input>
            </tr>
            {currentdatapage.map((element) => {
              return <tr style={{ borderbackgroundColor: "black"}}>
                <td>{element.id}</td>
                <td>{element.title}</td>
                <td>{element.body}</td>

              </tr>
            })}
          </tbody>
        </table>

      </div>

<div classname="buttondiv"><Buttonz length={pdata.length} postPerPage={postPerPage} pagesetting={pageSetting} /></div>
      
      </div>
    </>
  )
}

export default Product;