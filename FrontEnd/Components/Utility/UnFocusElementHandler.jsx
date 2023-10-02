import React, { useEffect, useRef } from "react";

export default function UnfocusHandler({ OnClickAway ,OnClickInside,children,cName}) {
    const wrapperRef = useRef()
    const HandleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            OnClickAway();
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', HandleClickOutside);

        return () => {
            document.removeEventListener('mousedown', HandleClickOutside);
        };
    }, [])

    return <div className={cName} ref={wrapperRef}>{children}</div>
}