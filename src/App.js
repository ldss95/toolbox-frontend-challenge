import { useEffect, useContext } from "react";
import { Container, Table, Alert, Spinner } from "react-bootstrap";

import { RenderIf, Header } from "./components"
import FilesContext from "./context/files/context";
import { useFetchFiles } from "./hooks/useFiles";

function App() {
  const { search } = useContext(FilesContext);
  const [files, loading, error, reload] = useFetchFiles();

  useEffect(() => {
    reload(search);

    // eslint-disable-next-line
  }, [search]);

  function adaptedData() {
    return files
      .map(({ lines, file }) =>
        lines.map(line => ({ ...line, file }))
      )         // Incluye el nombre del archivo dentro de cada linea
      .flat()   // Aplana el array, obteniendo un unico array con todas las propiedades necesarias
  }

  return (
    <div>
      <Header />
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
