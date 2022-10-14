import { useState, useEffect, useRef } from "react";
import { handleHookUnmount, handleAbort } from "../helpers";

import { fetchFiles } from "../services/files";

export const useFetchFiles = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const controllerRef = useRef(null);
	const isMounted = useRef(true);

    useEffect(() => {
        load("");

        return () => handleHookUnmount(isMounted, controllerRef)
    }, []);

    async function load(nameToSearch) {
        try {
            setLoading(true);
		    const signal = handleAbort(controllerRef);
            const data = await fetchFiles(nameToSearch, signal);
            if (!isMounted.current) {
                return;
            }

            setFiles(data);
            setError(null);
        } catch (error) {
            if (!isMounted.current || error?.message === 'Fetch is aborted') {
                return;
            }

            let message = error?.message || "Ha ocurrido un error desconocido";
            if (nameToSearch !== "" && !nameToSearch.includes('.csv')) {
              message += ": Asegurate de agregar la extension .csv al final del nombre del archivo";
            }
      
            setError(message);
            setFiles([]);
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }

    return [files, loading, error, load]
}