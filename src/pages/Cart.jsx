import React, { useContext, useState } from 'react'
import ProductDetail from './ProductDetail'
import { GlobalContext } from '../context/Context';

export const Cart = (product,counter) => {

    // data store in a context api
      let {state , dispatch} = useContext(GlobalContext);

    // store the cart in the usestate.
    const [cart,setCart] = useState([])

    fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: state.user.id,
          products: [
            {
              id: product.id,
              quantity: counter,
            },
          ]
        })
      })
      .then(res => res.json())
      .then(console.log );

      
    

     // fucntion for add to cart product
     const handleAddToCart=(product)=>
        {
            // the initial value of cart is empty array 
            // here we are using ... for expanding the array and add new product.
            setCart((prevProduct)=>[...prevProduct,product])
        }
    
    
        // function for remove the product to the cart
    
        const handleRemoveFromCart = (product_id) =>
        {
            // filtering the data and set new data.
            const newData = cart.filter((item)=>{
                return item._id!=product_id
            })
            setCart(newData)
        }
    

  return (
    <div>
       
         <div className='w-[80%] mx-auto my-8'>
        <table className='w-full'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item)=>{
                    return (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{counter}</td>
                            <td><button onClick={()=>handleRemoveFromCart(item._id)} className='bg-red-500 rounded-xl p-4 text-white'>Remove</button></td>
                        </tr>
                    )
                })}
                
            </tbody>
        </table>
    </div>
    </div>
  )
}


export default Cart