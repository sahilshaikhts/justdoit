import React from "react";

export default function ProjectDetailsSideBar() {

    function ToggleElementActive(className) {
        const element = document.getElementsByClassName(className)[0];
        if (element)
            element.classList.toggle("active");
    }

    return <div className="details-sidebar">
        <div className="button-closeSideBar"><span>Project details</span><img src="/FrontEnd/Images/icon_cross.svg" onClick={() => ToggleElementActive('details-sidebar')} /></div>

        <div className="details">
            <div className="list_userStatus">
                <div className="card-header" onClick={() => ToggleElementActive('list_userStatus')}>
                    <h2>You(admin): 3/7</h2>
                    <img src="/FrontEnd\Images\icon_arrow_down.svg" /></div>
                <ul>
                    <li>Tasks completed : 3</li>
                    <li>Total tasks : 7</li>
                </ul>
            </div>
            <div className="list_memebers" onClick={() => ToggleElementActive('list_memebers')}>
                <div className="card-header"><h2>Members</h2>
                    <img src="/FrontEnd\Images\icon_arrow_down.svg" /></div>
                <ul >
                </ul>
            </div>
        </div>
        <div className="button-leave"><button><img src="/FrontEnd\Images\icon_exit.svg" /><h2>Leave project</h2></button></div>
    </div>
}