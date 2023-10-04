import React, { useState } from "react";
import UnfocusHandler from "./UnFocusElementHandler";

export default function DropDownMenu({ items = null, html_items = null, button, OnChange }) {
    const [filterSelectIndex, setSelectionIndex] = useState(0);
    const [bListOpen, setListOpen] = useState(false);
    const [eButton,setButton]=useState(button);
    
    function OnSelectChange(aIndex) {
        setSelectionIndex(aIndex);
        OnChange(aIndex);
        setListOpen(false)
    }

    return <UnfocusHandler cName="dropdown" OnClickAway={()=>setListOpen(false)}>
        <a className="button_dropdownmenu" onClick={() => setListOpen(!bListOpen)}>{button}</a>

        {bListOpen &&
            <div className="dropdownmenu_list">

                {items != null && items.map((item, index) => <div key={index}
                    onClick={() => { OnSelectChange(index) }} className={filterSelectIndex === index ? 'dropDown_item selected' : 'dropDown_item'}><span>{item}</span></div>
                )}
                    
                {items == null && html_items != null && html_items.map((item, index) => <div key={index}
                    onClick={() => { OnSelectChange(index) }} className={filterSelectIndex === index ? 'dropDown_item selected' : 'dropDown_item'}>{item}</div>
                )}
            </div>
        }
    </UnfocusHandler>

}