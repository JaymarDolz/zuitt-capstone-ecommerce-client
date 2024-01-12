import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { NavLink } from 'react-router-dom';


export default function Banner({error}){

	const {title, content, destination, label} = error;

	return(
			<Row>
				<Col className="p-5 text-center">
					<>
						<h1>{title}</h1>
						<p>{content}</p>
						<NavLink to={destination}>
							<Button variant="primary">{label}</Button>
						</NavLink>
					</>				
				
				</Col>
			</Row>	

	)
}
