import React, { useState } from "react";

export default function Filter_project() {
    const [filterSelectIndex, setSelectionIndex] = useState(0);
    const filterItems = ['All', 'Favorite', 'Personal'];

    function OnSelectionChange(aSelectIndex) {
        setSelectionIndex(aSelectIndex);
    }

    return <div className="filter_project">
        <ul>
            {filterItems.map((item, index) => <li key={index}
                onClick={() => OnSelectionChange(index)} className={filterSelectIndex === index ? 'filter_selected' : ''}><span>{item}</span></li>
            )}
        </ul>
    </div>
}