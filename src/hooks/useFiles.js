import { useState, useEffect } from "react";

import { fetchFiles } from "../services/files";

export const useFetchFiles = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        load("");
    }, []);

    async function load(nameToSearch) {
        try {
            setLoading(true);
            const data = await fetchFiles(nameToSearch);
            setFiles(data);
            setError(null);
        } catch (error) {
            let message = error?.message || "Ha ocurrido un error desconocido";
            if (nameToSearch !== "" && !nameToSearch.includes('.csv')) {
              message += ": Asegurate de agregar la extension .csv al final del nombre del archivo";
            }
      
            setError(message);
            setFiles([]);
        } finally {
            setLoading(false);
        }
    }

    return [files, loading, error, load]
}