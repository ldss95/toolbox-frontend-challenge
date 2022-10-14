export async function fetchFiles(nameToSearch, signal) {
    let query = "";
    if (nameToSearch !== '') {
        query = '?fileName=' + nameToSearch
    }

    const res = await fetch("http://localhost:3000/v1/files/data" + query, { signal });
    const data = await res.json();
    if (res.statusText !== 'OK') {
        throw data;
    }

    return data;
}
