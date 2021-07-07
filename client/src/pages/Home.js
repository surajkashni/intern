import React,{useState,useEffect} from 'react';
import firebase from 'firebase';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// import axios from 'axios';

// //  import SingleProduct from "../cards/SingleProduct";
// import {useSelector} from 'react-redux';
// // import ProductCard from '../cards/ProductCard';
// import { Form, FormGroup, Label, Input, FormText,Button } from 'reactstrap';
// import ProductCard from '../components/cards/ProductCard';



const Home = () => {
    let dispatch = useDispatch();
    let { user ,cart} = useSelector((state) => ({ ...state }));
  
    let history = useHistory();
  
    const logout = () => {
        firebase.auth().signOut();
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        history.push("/login");
      };

      return(
          <button onClick={logout}> LogOut</button>
      )
  
}

 

export default Home;
