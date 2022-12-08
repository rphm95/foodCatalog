import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'

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
              <img src={chicken.image} />
              <h2>{chicken.name}</h2>
              <h4>From: {chicken.location}</h4>
              <p><b>Price:</b> {chicken.price}</p>
              <p><b>Rating:</b> {chicken.rating}</p>
              <p>{chicken.description}</p>
            </div>
          )


        })


      }



    </main>
  )
}


export default App;
