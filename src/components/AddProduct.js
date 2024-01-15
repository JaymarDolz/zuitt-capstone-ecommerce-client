import Swal from 'sweetalert2';
import { useState, useEffect, useContext } from 'react';
import {Form, Button} from 'react-bootstrap';
import {Navigate} from 'react-router-dom';
import UserContext from "../UserContext"


export default function AddProduct(){

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [isActive, setIsActive] = useState(false);

  const {user} = useContext(UserContext);

  useEffect(()=>{
    if(name !== "" && description !== "" && price !== "")
    { //enable submit button
        setIsActive(true);
    } else {
      setIsActive(false);
    }
  },[name, description, price]);

  const addCourse = (data) => {
    fetch(`http://localhost:4000/courses/`, {
        method: "POST",
        headers: {
          "content-Type" : "application/json",
          Authorization: `Bearer ${localStorage.getItem('access')}`
        },

        body: JSON.stringify({
            name: name,
            description: description,
            price: price
        })
      })
      .then(res => res.json())
      .then(data => {

        if(data){
          Swal.fire({
            title: "Successfully enrolled",
            icon: 'success',
            text: "You have successfully enrolled for this course"
          })
        } else {
          Swal.fire({
            title: "Fail",
            icon: 'error',
            text: "test"
          })
        }
      })
  }



  return(
      (user.isAdmin === true)?
      <Form onSubmit={(event) => addCourse(event) }>
        <h1 className="my-5 text-center">Add Course</h1>
        <Form.Group>
          <Form.Label>Course Name: </Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Course Name" 
            required 
            onChange={event=>{
              setName(event.target.value)
            }}
            value={name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description: </Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter description" 
            required 
            onChange={event=>{
              setDescription(event.target.value)
            }}
            value={description}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price: </Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter Price" 
            required 
            onChange={event=>{
              setPrice(event.target.value)
            }}
            value={price}
          />
        </Form.Group>

        {
          isActive === true ?
          <Button className = "mt-3" variant="primary" type="submit" id="submitBtn">Submit</Button>
          :
          <Button className = "mt-3"  variant="primary" type="submit" id="submitBtn" disabled>Submit</Button>
        }
      </Form>
      :
      <Navigate to="/courses"/>



    )
}
