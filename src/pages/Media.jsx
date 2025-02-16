import axios from 'axios'
import React, { useEffect } from 'react'

export const Media = () => {

    useEffect(() => {
          axios.get(`https://gist.github.com/jsturgis/3b19447b304616f18657.js`).then((response) => {
              console.log("response" , response.data)
            //   setProducts(response.data.products);
          }).catch((error) => {
              console.log("Error", error);
          })
      }, [])
  return (
    <div>Media</div>
  )
}
