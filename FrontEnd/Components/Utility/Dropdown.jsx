import React, { useState } from "react";
import UnfocusHandler from "./UnFocusElementHandler";

export default function DropDownMenu({ items = null, html_items = null, startIndex = -1, button, OnChange = null }) {
    const [filterSelectIndex, setSelectionIndex] = useState(startIndex);
    const [bListOpen, setListOpen] = useState(false);
    const [eButton, setButton] = useState(button);
    function OnSelectChange(aIndex,event) {
        if (OnChange !== null) {
            OnChange(aIndex,event);
            setListOpen(false)
            setSelectionIndex(aIndex);
        }
    }

    return <UnfocusHandler cName="dropdown" OnClickAway={() => setListOpen(false)}>
        <a className="button_dropdownmenu" onClick={() => setListOpen(!bListOpen)}>{button}</a>

        {bListOpen &&
            <div className="dropdownmenu_list">

                {items != null && items.map((item, index) => <div key={index} 
                    onClick={(event) => { OnSelectChange(index,event) }} className={filterSelectIndex === index ? 'dropDown_item selected' : 'dropDown_item'}><span>{item}</span></div>
                )}

                {items == null && html_items != null && html_items.map((item, index) => <div key={index}
                    onClick={(event) => { OnSelectChange(index,event) }} className={filterSelectIndex === index ? 'dropDown_item selected' : 'dropDown_item'}>{item}</div>
                )}
            </div>
        }
    </UnfocusHandler>

}