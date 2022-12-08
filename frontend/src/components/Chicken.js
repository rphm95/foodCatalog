import React from 'react';
import { useState} from 'react';

const Chicken = (props) => {

    const [showAddForm, setShowAddForm] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const getEditPage = () => {
        if(showEdit === false) {
          setShowEdit(true)
        } else {
          setShowEdit(false)
        }
      }

    return(
        <div>
             <img src={props.chicken.image} />
              <h2>{props.chicken.name}</h2>
              <h4>From: {props.chicken.location}</h4>
              <p><b>Price:</b> ${props.chicken.price}</p>
              <p><b>Rating:</b> {props.chicken.rating} out of 5</p>
              <p>{props.chicken.description}</p>
              <button onClick={getEditPage}>Edit</button>
              <button onClick={(event) => {
                {props.handleDelete(props.chicken)}
              }}>Delete</button>
              {showEdit ? <div><h2>Editting in session...</h2>
              <form>
                <label>Name:</label>
                <input type="text" defaultValue={props.chicken.name} onChange={props.handleUpdateName}></input><br/>

                <label>Location:</label>
                <input type="text" defaultValue={props.chicken.location} onChange={props.handleUpdateLocation}></input><br/>

                <label>Price:</label>
                <input type="number" defaultValue={props.chicken.price} onChange={props.handleUpdatePrice}></input><br/>

                <label>Image Link:</label>
                <input type="text" defaultValue={props.chicken.image} onChange={props.handleUpdateImage}></input><br/>

                <label>Rating(min 0 - max 5):</label>
                <input type="number" onChange={props.handleUpdateRating} defaultValue={props.chicken.rating}></input><br/>

                <label>Notes:</label>
                <input type="text" onChange={props.handleUpdateDescription} defaultValue={props.chicken.description}></input><br/>

               <button onClick={(event) => {
                {props.handleUpdateForm(props.chicken)}
               }}>Done Editting</button>
              </form>
              </div> : <></>}
        </div>
    )
}

export default Chicken;