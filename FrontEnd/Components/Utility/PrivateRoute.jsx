import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

/**
 * 
 * @param {function} CheckCondition  For condition evaluated on the fly.
 * @param {Promise} PromisedCondition Pass in a promise object if the condition takes time to evaluate. 
 * @param {boolean} bCondition Pre-evaluated value of a condition.
 * @param {boolean} bCondition Pre-evaluated value of a condition.
 * @returns 
 */
export default function PrivateRoute({ CheckCondition, PromisedCondition, bCondition, fallbackRoute, children }) {
    const [bResult, setBResult] = useState(-1);
    useEffect(() => {

        if (bCondition === undefined) {

            if (CheckCondition !== undefined) {

                const result = CheckCondition();

                if (typeof result === "boolean")
                    setBResult(result);
                else
                    ThrowWrongRetunTypeError();
            } else if (PromisedCondition !== undefined)
                CheckAsyncCondition()
        }
        else {
            if (typeof bCondition === "boolean")
                setBResult(bCondition);
            else
                ThrowWrongRetunTypeError();
        }

    }, [])

    async function CheckAsyncCondition() {

        const result = await PromisedCondition

        if (typeof result === "boolean") {
            setBResult(result);
        }
        else
            ThrowWrongRetunTypeError();
    }

    function ThrowWrongRetunTypeError() {
        throw new Error("Fatal error: Make sure condition checking functions returns only boolean.");
    }

    if (bResult === -1) {
        return <label>Loading...</label>
    } else if (bResult === true) {
        return children;
    } else if (bResult === false) {
        return <Navigate to={fallbackRoute} replace />
    }

}