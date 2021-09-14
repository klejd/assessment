import React,{useEffect,useState} from 'react';
import { useQuery } from '@apollo/client';
import { Load_Data } from '../GraphQl/Queries';
import { Link } from 'react-router-dom'
// import { remove_Product } from '../GraphQl/Mutations';
import _ from 'lodash';
import Checkbox from './common/Checkbox';


const GetAll = () => {
    const {error,loading,data}= useQuery(Load_Data,{fetchPolicy: "no-cache"});
    const [sortColumnn,setSort] = useState([]);
    const [datas,setdatas] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [search,setSearch] = useState('');

   // const [deleteProduct,{err}] = useMutation(remove_Product); 
    const handleDataWithoutCache= () =>{
     setdatas(()=>{
       return datas;
     })
    }
 
   
    const handleDeleteBySelection = (event)=>{
      event.preventDefault();
      let desserts = [];
      
     desserts =  datas.filter(e => !isCheck.includes(e.dessert))
     
     setdatas(()=>{
      return desserts;
    })
   
    }


    const handleSelectAll = e => {
      setIsCheckAll(!isCheckAll);
      setIsCheck(datas.map(li => li.dessert));
      if (isCheckAll) {
        setIsCheck([]);
      }
    };


    const handleClick = e => {
      const { id, checked } = e.target;
      setIsCheck([...isCheck, id]);
      if (!checked) {
        setIsCheck(isCheck.filter(item => item !== id));
      }
    };

    console.log(isCheck);
    const sorted =  _.orderBy(datas,[sortColumnn.path],[sortColumnn.order]);
    const onSort =  (path) =>{
    const sortColumn = {...sortColumnn};
    // console.log(datas)
     if(sortColumn.path===path){
       sortColumn.order = (sortColumn.order==='asc')?'desc':'asc';
     }
     else{
       sortColumn.path = path;
       sortColumn.order= 'asc'
     }
    //  console.log(sortColumn)
    
     setdatas(()=>{
      setSort(sortColumn);
       return sorted;
     })
   }


  const handleDelete = dessert => {
    const desserts = datas.filter(a=>a.dessert!==dessert);
    console.log(desserts);
   setdatas(()=>{
     return desserts;
   })
  };


    useEffect(()=>{
      if(error){
        console.log("smth went wrong");
      }
      if(loading){
        console.log("Loading...")
      }
        if(data){
        // console.log(data);  
        setdatas(()=>{
            return data.getAllData;
        });
        }
    },[data]);

   

return (
<>
<div className="container">
        <div className="row">
   <nav className="navbar navbar-light bg-light">
    <div className="container-fluid">
      <a href="/" className="navbar-brand"><h4>Nutrition List</h4></a>
        <form className="d-flex">
            <input onChange={a=>{setSearch(a.target.value)}} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button onClick={handleDataWithoutCache} className="btn btn-success sm form-control me-4" >RESET DATA</button>
        </form>
    </div>
   </nav>
</div>
<div className="row">
   <nav className="navbar navbar-light bg-secondary">
    <div className="container-fluid">
      <p className="navbar-brand text-danger">{isCheck.length} Selected</p>
        <form className="d-flex">
       
           <Link to="/AddOne" className=" btn btn-success sm  form-control me-4  ">
           <i className="fas fa-undo-alt">Add</i></Link>
            <button onClick={handleDeleteBySelection}  className="btn btn-danger sm form-control me-0" >Delete</button>
        </form>
    </div>
   </nav>
</div>
    <table className="table table-striped">
    <thead>
    <tr>
      <th >

      <Checkbox
        type="checkbox"
        name="selectAll"
        id="selectAll"
        handleClick={handleSelectAll}
        isChecked={isCheckAll}
      />

      </th>
      <th onClick={()=>onSort('dessert')} >Dessert(100g serving)</th>
      <th onClick={()=>onSort('calories')} >Calories</th>
      <th onClick={()=>onSort('fat')} >Fat (g)</th>
      <th onClick={()=>onSort('carb')} >Carbs (g)</th>
      <th onClick={()=>onSort('protein')} >Protein (g)</th>
    </tr>
  </thead>
  <tbody>
    
    {datas.filter((val)=>{
      if(val ===""){
        return val;
      }
      else if(val.dessert.toLowerCase().includes(search.toLowerCase())){
        return val
      }
    }).map((data)=>(
        
        <tr key={data.dessert}>
            <td  className="active">
               
      
          <Checkbox
          key={data.dessert}
          type="checkbox"
          name={data.dessert}
          id={data.dessert}
          handleClick={handleClick}
          isChecked={isCheck.includes(data.dessert)}
        />
 
              
            </td>
            <td>{data.dessert}</td>
            <td>{data.fat}</td>
            <td>{data.carb}</td>
            <td>{data.protein}</td>
            <td>{data.calories}</td>
            <td><button onClick={()=>handleDelete(data.dessert)}>Delete</button></td>
        </tr>
    ))}
    
  </tbody>
    </table>
    </div> 
    
    </> );
}
 
export default GetAll;