import { useState } from "react";

export const useField = (type,id,required) => {
    const [value,setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue("");
    };

    return {
        reset: reset,
        fieldData: {type,id,value,onChange,required}
    };
};