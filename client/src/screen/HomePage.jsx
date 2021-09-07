import React from 'react'
import Pizza from '../components/Pizza'
import pizzaData from '../pizzadata'

const HomePage = () => {
    return (
        <div className="container">
           <div className="row">
               
               {pizzaData.map(pizza => {
                   return (
                       <div className="col-md-4">
                           <div>
                               <Pizza pizza={pizza}/>
                           </div>
                           
                       </div>
                   )
               })}
               
           </div>
        </div>
    )
}

export default HomePage;