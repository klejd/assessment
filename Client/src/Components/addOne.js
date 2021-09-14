import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CREATE_PRODUCT } from '../GraphQl/Mutations';
import { useMutation } from '@apollo/client';

const AddOne = () => {

const[dessert,setDessert] = useState("");
const[calories,setCalories] = useState();
const[fat,setFat] = useState();
const[carb,setCarb] = useState();
const[protein,setProtein] = useState();

const [createProduct,{error}] = useMutation(CREATE_PRODUCT);

const addpr = (event)=>{
   // event.preventDefault();   
   //reRendering the proccess to show the data we added if we go back to the list.
    if(error){
        console.log(error);
    }
    createProduct({
        variables:{
            dessert:dessert,
            calories:parseInt(calories),
            fat:parseInt(fat),
            carb:parseInt(carb),
            protein:parseInt(protein)
        }
    }
    );
    // console.log(createProduct);
   
}


return (
<div className="container">
     
            <div className="row">
            <div className="bg-warning"><center><h1>Please fill all the details before you submit</h1></center></div>
            <h1>Form to Add dessert</h1> 
            </div>
<form >
  <div className="mb-3">
    <label htmlFor="Dessert" className="form-label">Dessert Name*</label>
    <input onChange={(event)=>{
        setDessert(event.target.value)
    }} 
        type="text" 
        className="form-control" 
        id="Dessert"  
        aria-describedby="emailHelp" required/>
        
  </div>

  <div className="mb-3">
    <label htmlFor="Calories" className="form-label">Calories*</label>
    <input onChange={(event)=>{
        setCalories(event.target.value)}}
         type="text" 
         id="Calories" 
         className="form-control" required />
  </div>

  <div className="mb-3">
    <label htmlFor="Fat" className="form-label">Fat*</label>
    <input 
    onChange={(event)=>{
    setFat(event.target.value)}}
    type="text" 
    id="Fat" 
    className="form-control" required />
  </div>

  <div className="mb-3">
    <label htmlFor="Carbs" className="form-label">Carbs*</label>
    <input
    onChange={(event)=>{
     setCarb(event.target.value)}}
     type="text"
      id="Carbs"
      className="form-control" required />
  </div>

  <div className="mb-3">
    <label htmlFor="Protein" className="form-label">Protein*</label>
    <input 
    onChange={(event)=>{
    setProtein(event.target.value)}}
    type="text" 
    id="Protein" 
    className="form-control" required />
  </div>
  
  <div>
    <button 
    onClick={addpr}
    
     className="btn btn-primary">Submit</button>
  
    <Link to="/" style={{marginLeft: 10}} className="btn btn-secondary ">Go Back</Link>
          
   </div>
</form>
 
</div>
    
    );
}
 
export default AddOne;