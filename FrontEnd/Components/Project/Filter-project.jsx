import React, { useState } from "react";

export default function Filter_project() {
    const [filterSelectIndex, setSelectionIndex] = useState(0);
    const filterItems = ['All', 'Favorite', 'Personal'];

    function OnSelectionChange(aSelectIndex) {
        setSelectionIndex(aSelectIndex);
    }

    return <div className="filter_project">
        <a className="button_filter" ><img src="../Frontend/Images/icon_filter.svg" onClick={() => { const navbarLinks = document.getElementsByClassName('filter_project_list')[0].classList.toggle("active"); }}/></a>
        <ul className="filter_project_list">
            {filterItems.map((item, index) => <li key={index}
                onClick={() => OnSelectionChange(index)} className={filterSelectIndex === index ? 'filter_selected' : ''}><span>{item}</span></li>
            )}
        </ul>
    </div>
}