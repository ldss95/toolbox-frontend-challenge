import { memo } from "react";
import { Button, Navbar, Container, Form } from "react-bootstrap";

const Header = ({ setSearch, loadData }) => {
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
                    onChange={({ target }) => setSearch(target.value)}
                    />
                    <Button variant="outline-success" onClick={loadData} type="button">Search</Button>
                </Form>
                </Navbar>
            </Container>
        </Navbar>
    )
}

export default memo(Header);
