import React, { useState, useEffect } from 'react';

const RankItems = () => {

    const [items, setItems] = useState([]);
    const dataType = 1;

    useEffect(() => {
        //fetch method is used to make an get http request to the server - item is what is declared inside setupProxy context
        fetch('item/'+ dataType)
            .then((results) => {
                return results.json();
            })
            .then(data => {
                setItems(data);
            })
    }, [])

    return (
        <main>
            {
                (items != null) ? items.map((item) => <h3>{item.title}</h3>) : <div>Loading...</div>
            }
        </main>
    )
}

export default RankItems;