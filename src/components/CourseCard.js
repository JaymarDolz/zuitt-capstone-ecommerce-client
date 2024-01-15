import { Card } from 'react-bootstrap';
// import { useState } from 'react';
import {Link} from 'react-router-dom';

// import Button from 'react-bootstrap/Button';

// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';


export default function CourseCard({courseProp}){

	const { _id, name, description, price } = courseProp;
	/*	
	const [count, setCount] = useState(0);
	const [seats, setSeats] = useState(30);

	function enroll() {
	    if (seats === 0) {
	        alert("No more seats.");
	    } else {
	        setCount(count + 1);
	        console.log('Enrollees: ' + (count+1));
	        setSeats(seats - 1);
	        console.log('Remaining seats: ' + (seats - 1));
	    }
	}
	*/


    return (
    	<Card className="mb-3">
		    <Card.Body>
		        <Card.Title>{name}</Card.Title>
		        <Card.Subtitle>Description:</Card.Subtitle>
		        <Card.Text>{description}</Card.Text>
		        <Card.Subtitle>Price:</Card.Subtitle>
		        <Card.Text>{price}</Card.Text>
		        {/*<Card.Subtitle>Enrollees:</Card.Subtitle>
		        <Card.Text>{count}</Card.Text>*/}
		        <Link className="btn btn-primary" to={`/courses/${_id}`}>
		        Details
		        </Link>
		    </Card.Body>
		</Card>
    )
}