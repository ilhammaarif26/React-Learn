import React from 'react';


function List(props) {
    return (
        <ul>
            {
                // map looping pada react
                props.item.map((item, index) => <li key={index}>{item}</li>)
            }
        </ul>

    )
}

export default List;