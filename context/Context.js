'use client'

import { coursesData } from "@/data/courses";
import { events } from "@/data/events";
import { productData } from "@/data/products";
import React from "react";
import { useContext ,useState } from "react";
const dataContext = React.createContext();
export const useContextElement = () => {

    return useContext(dataContext);
  };

  export default function Context({ children }) {
    const [cartProducts, setCartProducts] = useState([])
  
    const [cartCourses, setCartCourses] = useState([])
    const [cartEvents, setCartEvents] = useState([])
    const addCourseToCart = (id)=>{

        if (!cartCourses.filter((elm)=>elm.id == id)[0]) {

           const item = {...coursesData.filter(elm=>elm.id == id)[0],quantity:1}
           setCartCourses(pre=>[...pre,item])
            
        }

    }
    const isAddedToCartCourses = (id)=>{
        if (cartCourses.filter((elm)=>elm.id == id)[0]) {
            return true
         }
         return false

    }
    const addProductToCart = (id)=>{

        if (!cartProducts.filter((elm)=>elm.id == id)[0]) {

           const item = {...productData.filter(elm=>elm.id == id)[0],quantity:1}
           setCartProducts(pre=>[...pre,item])
            
        }

    }
    const isAddedToCartProducts = (id)=>{
        if (cartProducts.filter((elm)=>elm.id == id)[0]) {
            return true
         }
         return false

    }
    const addEventToCart = (id)=>{

        if (!cartEvents.filter((elm)=>elm.id == id)[0]) {

           const item = {...events.filter(elm=>elm.id == id)[0],quantity:1}
           setCartEvents(pre=>[...pre,item])
            
        }

    }
    const isAddedToCartEvents = (id)=>{
        if (cartEvents.filter((elm)=>elm.id == id)[0]) {
            return true
         }
         return false

    }

    const contextElement = {
        
        cartProducts,
        setCartProducts,
        addProductToCart,
        isAddedToCartProducts,


        addCourseToCart,
        isAddedToCartCourses,
        cartCourses,
        setCartCourses,


        cartEvents,
        setCartEvents,
        addEventToCart,
        isAddedToCartEvents

      };
    return (
        <dataContext.Provider value={contextElement}>{children}</dataContext.Provider>
      );
  }