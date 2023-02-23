import React from 'react';
import { useEffect,useState } from 'react';
import "./product.css";
import Buttonz from './Buttonz';


const Product = () => {

  const [pdata, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage, setPostPerpage] = useState(10);


  const lastIndex = page * postPerPage;
  const firstIndex = lastIndex - postPerPage;


  const fetchProduct = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
    setData(data);

  }



  useEffect(() => {
    fetchProduct();

  }, [])



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

      <div>Total Record: {pdata.length}</div>
      <div className="tableItem">
        <table width="100%" border="1" style={{ borderCollapse: "collapse", borderColor: "black" }}>
          <thead>
            <tr>
              <th>id</th>
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
              return <tr style={{ borderbackgroundColor: "black" }}>
                <td>{element.id}</td>
                <td>{element.title}</td>
                <td>{element.body}</td>

              </tr>
            })}
          </tbody>
        </table>
      </div>


      <Buttonz length={pdata.length} postPerPage={postPerPage} pagesetting={pageSetting} />

    </>
  )
}

export default Product;