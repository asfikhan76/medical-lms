import { useEffect, useState } from 'react';

export const useScript = (src) => {
    const [status, setStatus] = useState(src ? "loading" : "idle");

    useEffect(() => {
        if (!src) {
            setStatus("idle");
            return;
        }

        let script = document.querySelector(`script[src="${src}"]`);

        if (!script) {
            script = document.createElement("script");
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        }

        const setAttributeFromEvent = (event) => {
            setStatus(event.type === "load" ? "ready" : "error");
        };

        script.addEventListener("load", setAttributeFromEvent);
        script.addEventListener("error", setAttributeFromEvent);

        return () => {
            if (script) {
                script.removeEventListener("load", setAttributeFromEvent);
                script.removeEventListener("error", setAttributeFromEvent);
            }
        };
    }, [src]);

    return status;
};