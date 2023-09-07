import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ CheckCondition, bCondition = null, fallbackRoute, children }) {
    let bValue=false;
    if (bCondition === null)
        bValue = CheckCondition();
    else
        bValue = bCondition;

    if (bValue === true) {
        return children;
    } else {
        return <Navigate to={fallbackRoute} replace />
    }

}