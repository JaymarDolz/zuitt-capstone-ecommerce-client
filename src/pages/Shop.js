import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';

import AdminView from '../components/AdminView';
import UserView from '../components/UserView';



export default function Shop({}){
    const [products, setProducts] = useState([]);
    const { user, setUser } = useContext(UserContext);


    const fetchDataFunc = () => {
        let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_URL}/products/all` : `${process.env.REACT_APP_API_URL}/products/`;

        fetch(fetchUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data) {
            setProducts(data.products);
          } else {
            setProducts([]);
          }
        });
    }
    
    useEffect(() => {
        fetchDataFunc();
      }, []);



    return(
        <>
            {  
              (user.isAdmin) ?
              <AdminView productsData={products} fetchDataFunc={fetchDataFunc}/>
              :
              <UserView productsData={products} fetchDataFunc={fetchDataFunc} />
            }
        </>
    );



}

