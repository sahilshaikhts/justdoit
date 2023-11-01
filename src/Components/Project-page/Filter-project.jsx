import React, { useState } from "react";
import DropDownMenu from "../Utility/Dropdown";
import icon_filter from '../../Images/icon_filter.svg'

export default function Filter_project() {
    const [filterSelectIndex, setSelectionIndex] = useState(0);
    const filterItems = ['All', 'Favorite', 'Personal'];

    function OnSelectionChange(aSelectIndex) {
        setSelectionIndex(aSelectIndex);
    }

    return <div className="filter_project">
        <DropDownMenu items={filterItems} button={<img src={icon_filter}/>} OnChange={OnSelectionChange}></DropDownMenu>
    </div>
}
