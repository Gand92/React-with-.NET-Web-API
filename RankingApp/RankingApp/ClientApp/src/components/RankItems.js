﻿import React, { useState, useEffect } from 'react';
import MovieImageArr from './MovieImages.js';
import RankingGrid from './RankingGrid.js';

const RankItems = () => {

    const [items, setItems] = useState([]);
    const dataType = 1;

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        const targetElm = ev.target;
        if (targetElm.nodeName === "IMG") {
            return false;
        }
        if (targetElm.childNodes.length === 0) {
            var data = parseInt(ev.dataTransfer.getData("text").substring(5));
            const transformedCollection = items.map(item => (item.id === parseInt(data)) ?
                                                {...item, ranking: parseInt(targetElm.id.substring(5))} : {...item, ranking:item.ranking});
            setItems(transformedCollection);
        }
    }

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
            <RankingGrid items={items} imgArr={MovieImageArr} drag={drag} allowDrop={allowDrop} drop={drop}/>
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