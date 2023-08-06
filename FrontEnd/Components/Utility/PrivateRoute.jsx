import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ bCondition, fallbackRoute, children }) {
    if (bCondition == true) {
        return children;
    } else {
        return <Navigate to={fallbackRoute} replace />
    }

}