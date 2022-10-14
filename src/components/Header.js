import { memo, useContext, useState } from "react";
import { Button, Navbar, Container, Form } from "react-bootstrap";

import FilesContext from "../context/files/context";

const Header = () => {
    const { setSearch } = useContext(FilesContext);
    const [_search, _setSearch] = useState('');

    return (
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
                        onChange={({ target }) => _setSearch(target.value)}
                    />
                    <Button variant="outline-success" onClick={() => setSearch(_search)} type="button">Search</Button>
                </Form>
                </Navbar>
            </Container>
        </Navbar>
    )
}

export default memo(Header);
