import React, { useState } from "react";
import DropDownMenu from "../Utility/Dropdown";

export default function Filter_project() {
    const [filterSelectIndex, setSelectionIndex] = useState(0);
    const filterItems = ['All', 'Favorite', 'Personal'];

    function OnSelectionChange(aSelectIndex) {
        setSelectionIndex(aSelectIndex);
    }

    return <div className="filter_project">
        <DropDownMenu items={filterItems} button={<img src="/client/Images/icon_filter.svg" />} OnChange={OnSelectionChange}></DropDownMenu>
    </div>
}
