import React, { useEffect, useState } from 'react';

import Item from './Item';

const NewCollections = ({ onClick }) => {

  const [NewCollections, setNewCollections] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/newcollections",).then((response) =>response.json()).then((data)=>setNewCollections(data))

  },[])
  return (
    <section className="bg-primary">
      <div className="max_padd_container py-12 xl:py-28 xl:w-[88%]">
        <h3 className="text-center">Latest Products</h3>
        <hr className="h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-16" />
        
        {/* Container for items */}
        <div className="grid grid-cols-1 sx:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {NewCollections.map((item) => (
            <Item
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
            
          />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewCollections;
