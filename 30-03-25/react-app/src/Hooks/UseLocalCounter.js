import { useEffect, useState } from "react";

function useLocalCounter(key, initialValue) {
    // Load the initial state from localStorage
    const [count, setCount] = useState(() => {
        const savedValue = localStorage.getItem(key);
        return savedValue !== null ? Number(savedValue) : initialValue;
    });

    // Save the count value in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(key, count);
    }, [count]);

    return [count, setCount];
}

export default useLocalCounter;
