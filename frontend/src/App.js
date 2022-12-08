import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'
import Chicken from './components/Chicken';


const App = () => {
  // ---------------
  //  HOOKS
  // ----------------
  // new food
  const [food, setFood] = useState([])
  const [newName, setNewName] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newPrice, setNewPrice] = useState()
  const [newImage, setNewImage] = useState('')
  const [newRating, setNewRating] = useState()
  const [newDescription, setNewDescription] = useState('')


  //edit hooks
  const [updateName, setUpdateName] = useState()
  const [updateLocation, setUpdateLocation] = useState()
  const [updatePrice, setUpdatePrice] = useState()
  const [updateImage, setUpdateImage] = useState()
  const [updateRating, setUpdateRating] = useState()
  const [updateDescription, setUpdateDescription] = useState()

  // show
  const [showAddForm, setShowAddForm] = useState(false)


  // ---------------
  // GET FUNCTIONS
  // ---------------
  const getAddForm = () => {
    setShowAddForm(!showAddForm)
  }


  // ---------------
  // HANDLE NEW FOOD
  // -----=----------
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewLocation = (event) => {
    setNewLocation(event.target.value)
  }

  const handleNewPrice = (event) => {
    setNewPrice(event.target.value)
  }

  const handleNewImage = (event) => {
    setNewImage(event.target.value)
  }

  const handleNewRating = (event) => {
    setNewRating(event.target.value)
  }

  const handleNewDescription = (event) => {
    setNewDescription(event.target.value)
  }

   // handle form

   const handleForm = (event) => {
    event.preventDefault()
    axios.post(
      'http://localhost:3000/fastfood',
      {
        name: newName,
        location: newLocation,
        price: newPrice,
        image: newImage,
        rating: newRating,
        description: newDescription
      }
    ).then(() => {
      axios
        .get('http://localhost:3000/fastfood')
        .then((response) => {
          setFood(response.data)
        })
    })
    setShowAddForm(false)
  }


   // ---------------
  // HANDLE UPDATE FOOD
  // -----=----------
  const handleUpdateName = (event) => {
    setUpdateName(event.target.value)
  }

  const handleUpdateLocation = (event) => {
    setUpdateLocation(event.target.value)
  }

  const handleUpdatePrice = (event) => {
    setUpdatePrice(event.target.value)
  }

  const handleUpdateImage = (event) => {
    setUpdateImage(event.target.value)
  }

  const handleUpdateRating = (event) => {
    setUpdateRating(event.target.value)
  }

  const handleUpdateDescription = (event) => {
    setUpdateDescription(event.target.value)
  }

  //handle update form
  const handleUpdateForm = (chickenData) => {
    axios
        .put(`http://localhost:3000/fastfood/${chickenData._id}`, 
        {
          name: updateName,
          location: updateLocation,
          price: updatePrice,
          image: updateImage,
          rating: updateRating,
          description: updateDescription
        }).then((response) => {
          axios
              .get('http://localhost:3000/fastfood')
              .then((response) => {
                setFood(response.data)
              })
        })
  }

   // ---------------
  // HANDLE DELETE
  // -----=----------
  const handleDelete = (chickenData) => {
    axios
        .delete(`http://localhost:3000/fastfood/${chickenData._id}`)
        .then(() => {
          axios
              .get('http://localhost:3000/fastfood')
              .then((response) => {
                setFood(response.data)
              })

        })
  }

  useEffect(() => {
    axios
      .get('http://localhost:3000/fastfood')
      .then((response) => {
        // console.log(response.data)
        setFood(response.data)
      })
  }, [])



  return (
    <main>
      <h1>FAST FOOD RATINGS</h1>
      <button onClick={getAddForm}>ADD RATING</button>


      {showAddForm ? <section>
        <form onSubmit={handleForm}>
          <label>Name:</label>
          <input type="text" onChange={handleNewName}></input><br/>

          <label>Location:</label>
          <input type="text" onChange={handleNewLocation}></input><br/>

          <label>Price:</label>
          <input type="number" onChange={handleNewPrice}></input><br/>

          <label>Image Link:</label>
          <input type="text" onChange={handleNewImage}></input><br/>

          <label>Rating(min 0 - max 5):</label>
          <input type="number" onChange={handleNewRating}></input><br/>

          <label>Notes:</label>
          <input type="text" onChange={handleNewDescription}></input><br/>

          <input type="submit" value="add new rating" />
        </form>
      </section> : null }
      
      {
        food.map((chicken) => {

          return (
            <div>
             <Chicken chicken={chicken} handleUpdateForm={handleUpdateForm} handleDelete={handleDelete} handleUpdateDescription={handleUpdateDescription} handleUpdateRating={handleUpdateRating} handleUpdateImage={handleUpdateImage} handleUpdatePrice={handleUpdatePrice} handleUpdateLocation={handleUpdateLocation} handleUpdateName={handleUpdateName}></Chicken>
            </div>
          )


        })


      }



    </main>
  )
}


export default App;
