import React, { useState } from "react";
import UnfocusHandler from "../Utility/UnFocusElementHandler";
import DropDownMenu from "../Utility/Dropdown";

export default function Filter_project() {
    const [filterSelectIndex, setSelectionIndex] = useState(0);
    const filterItems = ['All', 'Favorite', 'Personal'];

    function OnSelectionChange(aSelectIndex) {
        setSelectionIndex(aSelectIndex);
    }

    return <div className="filter_project">
        <DropDownMenu items={filterItems} button={<img src="/Frontend/Images/icon_filter.svg" />} OnChange={OnSelectionChange}></DropDownMenu>
    </div>
}
{/* <a className="button_filter" onClick={() => { document.getElementsByClassName('filter_project_list')[0].classList.toggle("active"); }}><img src="../Frontend/Images/icon_filter.svg" /></a>
<ul className="filter_project_list">
    {filterItems.map((item, index) => <li key={index}
        onClick={() => OnSelectionChange(index)} className={filterSelectIndex === index ? 'filter_selected' : ''}><span>{item}</span></li>
    )}
</ul> */}