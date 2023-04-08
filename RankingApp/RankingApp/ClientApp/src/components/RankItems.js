import React, { useState, useEffect } from 'react';
import MovieImageArr from './MovieImages.js';

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
            <div className = "items-not-ranked">
            {
                    (items.length > 0) ? items.map((item) =>
                    <div className = "unranked-cell">
                        <img id={'item-{item.id'} src={MovieImageArr.find(o => o.id === item.imageId)?.image} />
                    </div>
                    ) : <div>Loading...</div>
            }
            </div>
        </main>
    )
}

export default RankItems;