import { useState, useEffect } from "react";
import { Container, Table, Alert, Spinner } from "react-bootstrap";

import { RenderIf, Header } from "./components"
import { fetchFiles } from "./services/files";

function App() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData()

    // eslint-disable-next-line
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const data = await fetchFiles(search);
      setData(data);
      setError(null);
    } catch (error) {
      let message = error?.message || 'Ha ocurrido un error desconocido';
      if (search !== '' && !search.includes('.csv')) {
        message += ': Asegurate de agregar la extension .csv al final del nombre del archivo';
      }

      setError(message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  function adaptedData() {
    return data
      .map(({ lines, file }) =>
        lines.map(line => ({ ...line, file }))
      )         // Incluye el nombre del archivo dentro de cada linea
      .flat()   // Aplana el array, obteniendo un unico array con todas las propiedades necesarias
  }

  return (
    <div>
      <Header setSearch={setSearch} loadData={loadData} />
      <br />
      <br />

      <Container>
        <RenderIf condition={loading}>
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" />
          </div>
        </RenderIf>
        <br />
        <br />

        <RenderIf condition={error}>
          <Alert variant="danger">{error}</Alert>
        </RenderIf>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Text</th>
              <th>Number</th>
              <th>Hex</th>
            </tr>
          </thead>
          <tbody>
            {adaptedData().map(({ file, text, number, hex }, index) => (
                <tr key={'item-' + index}>
                  <td>{file}</td>
                  <td>{text}</td>
                  <td>{number}</td>
                  <td>{hex}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
