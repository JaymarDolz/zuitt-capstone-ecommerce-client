import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function ToggleProduct({productId, isActive, fetchDataFunc}){


	const archive = (id) => {
		// e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/products/${id}/archive`, {
		      method: 'PATCH',
		      headers: {
		        'Content-Type': 'application/json',
		        Authorization: `Bearer ${localStorage.getItem('access')}`
		      }
		    })
		      .then(res => res.json())
		      .then(data => {
		        if (data.message === "Product archived successfully") {
		          Swal.fire({
		            title: 'Success!',
		            icon: 'success',
		            text: 'Product Successfully Updated'
		          });
							fetchDataFunc();

		        } else {
		        	Swal.fire({
		        	  title: 'Error!',
		        	  icon: 'error',
		        	  text: `${data.error}`
		        	})
		        }
		    });
	};



	const activate = (id) => {
		// e.preventDefault();

		// fetch(`${process.env.REACT_APP_API_URL}/courses/${courseId}`, {

		fetch(`${process.env.REACT_APP_API_URL}/products/${id}/activate`, {
		      method: 'PATCH',
		      headers: {
		        'Content-Type': 'application/json',
		        Authorization: `Bearer ${localStorage.getItem('access')}`
		      }
		    })
		      .then(res => res.json())
		      .then(data => {
		        if (data.message === "Product activated successfully") {
		          // Show success message, close modal, and fetch updated data
		          Swal.fire({
		            title: 'Success!',
		            icon: 'success',
		            text: 'Product Successfully Updated'
		          });
							fetchDataFunc();

		        } else {
		        	Swal.fire({
		        	  title: 'Error!',
		        	  icon: 'error',
		        	  text: `${data.error}`
		        	})
		        }
		    });
	};

	return (
	    <>
	      {isActive ? (
	        <Button variant="danger" size="sm" onClick={() => archive(productId)}> Archive </Button>
	      ) : (
	        <Button variant="success" size="sm" onClick={() => activate(productId)}> Activate </Button>
	      )}
	    </>
	)
}