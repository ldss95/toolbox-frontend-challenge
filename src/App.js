import { useState, useEffect } from "react";
import { Button, Navbar, Container, Form, Table, Alert, Spinner } from "react-bootstrap";

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
      const query = (search !== '')
        ? '?fileName=' + search
        : '';

      const res = await fetch('http://localhost:3000/v1/files/data' + query);
      const data = await res.json();
      if (res.statusText !== 'OK') {
        let message = data?.message || 'Ha ocurrido un error desconocido';
        if (search !== '' && !search.includes('.csv')) {
          message += ': Asegurate de agregar la extension .csv al final del nombre del archivo';
        }

        setError(message);
        return;
      }

      setData(data);
      setError(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">React Test App</Navbar.Brand>
          <Navbar id="navbarScroll">
            <Form className="d-flex" onSubmit={(event) => event.preventDefault()}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={({ target }) => setSearch(target.value)}
              />
              <Button variant="outline-success" onClick={loadData} type="button">Search</Button>
            </Form>
          </Navbar>
        </Container>
      </Navbar>
      <br />
      <br />

      <Container>
        {loading && (
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" />
          </div>
        )}
        <br />
        <br />

        {error && (
          <Alert variant="danger">{error}</Alert>
        )}

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
            {data
              .map(({ lines, file }) => lines.map(line => ({ ...line, fileName: file })))
              .flat()
              .map(({ fileName, text, number, hex }, index) => (
                <tr key={'item-' + index}>
                  <td>{fileName}</td>
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
