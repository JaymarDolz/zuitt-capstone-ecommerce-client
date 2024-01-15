import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useParams,useNavigate, Link } from 'react-router-dom';
// npm install sweetalert2
import Swal from "sweetalert2";
import UserContext from "../UserContext"


export default function CourseView(){
	
	// get the value from the url
	const { courseId } = useParams();

	const [name, setName] = useState("");
	const [description, setdescription] = useState("");
	const [price, setPrice] = useState(0);

	useEffect(() => {
		fetch(`http://localhost:4000/courses/${courseId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.name);
			setdescription(data.description);
			setPrice(data.price);
		})
	}, [courseId])


	const {user} = useContext(UserContext);

	const enroll = (courseId) => {
		fetch(`http://localhost:4000/users/enroll`, {
				method: "POST",
				headers: {
					"content-Type" : "application/json",
					Authorization: `Bearer ${localStorage.getItem('access')}`
				},

				body: JSON.stringify({
					courseId: courseId
				})
			})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				if(data.message === "Enrolled Successfully."){
					// alert("Enrolled Successfully");
					Swal.fire({
						title: "Successfully enrolled",
						icon: 'success',
						text: "You have successfully enrolled for this course"
					})
				} else if (data === "Action Forbidden"){
					Swal.fire({
						title: "Admin enrollment error",
						icon: 'error',
						text: "Admin is not allowed to enroll"
					})


				} else {
					Swal.fire({
						title: "Something went wrong",
						icon: 'error',
						text: "Please try again"
					})
				}
			})
	}


	return(
		<Container className="mt-5">
					<Row>
						<Col lg={{ span: 6, offset: 3 }}>
							<Card>
								<Card.Body className="text-center">
									<Card.Title>{name}</Card.Title>
									<Card.Subtitle>Description:</Card.Subtitle>
									<Card.Text>{description}</Card.Text>
									<Card.Subtitle>Price:</Card.Subtitle>
									<Card.Text>PhP {price}</Card.Text>
									<Card.Subtitle>Class Schedule</Card.Subtitle>
									<Card.Text>8 am - 5 pm</Card.Text>
									{ user.id !== null ? 
											<Button variant="primary" block="true" onClick={() => enroll(courseId)}>Enroll</Button>
										: 
											<Link className="btn btn-danger btn-block" to="/login">Log in to Enroll</Link>
									}
								</Card.Body>		
							</Card>
						</Col>
					</Row>
				</Container>


		)
}