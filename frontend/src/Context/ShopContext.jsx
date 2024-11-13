import React, { useEffect, useState } from "react";
// import all_product from '../Components/Assets/all_product';
import { createContext } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data));  
        }
    },[])
    
    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    
    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    
    // Method - 1
    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;
    
    //     for(const item in cartItems)
    //     {
    //         if(cartItems[item]>0)
    //         {
    //             let itemInfo = all_product.find((product)=>product.id===Number(item));
    //             totalAmount += itemInfo.new_price * cartItems[item];
    //         }
    //     }
    //     return totalAmount;
    // }
        
    const productLookup = all_product.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
    },{});

    const getTotalCartAmount = () => {
        return Object.keys(cartItems)
        .filter(key => cartItems[key] > 0)
        .map(key => {
            const itemInfo = productLookup[Number(key)];
            return itemInfo.new_price * cartItems[key];
        })
        .reduce((total, current) => total + current, 0);
    };

    // Method - 1(It's not preferred to use this method)
    
    // const getTotalCartItems = () => {
    //     let UniqueItemIds = new Set();
    //     for(const item in cartItems)
    //     {
    //         if(cartItems[item]>0)
    //         {
    //             UniqueItemIds.add(item);
    //         }
    //     }
    //     return UniqueItemIds.size;
    // }    

    const getTotalCartItems = ()=> {
        return Object.keys(cartItems)
        .filter((key)=>cartItems[key]>0)
        .length
    }

    // Method -3 (Refracted method - 1 to match the readability and efficiency of method 2 and the use case of set)

    // const getTotalCartItems = () => {
    //     return new Set(
    //         Object.keys(cartItems).filter(key => cartItems[key] > 0)
    //     ).size;
    // }
    
    const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems };
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
export default ShopContextProvider