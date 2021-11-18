import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../Styles/Nav.style.css";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function NavbarFn() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    const [state, setState] = useState({
        name: "",
        question: ""
    })

    const handleChange = ({ target: { value, name } }) => {
        setState({ ...state, [name]: value });
    }
    g
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setShow(false);
            const { name, question } = state;
            if (name && question) {
                await axios.post("http://localhost:3001/postquestion", {
                    name,
                    question
                })
                toast.success('Query Raised Successfully');

                setState({ ...state, name: "", question: "" });

            } else {
                toast.error('Fill all the fields');
                setState({ ...state, name: "", question: "" });
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand className="NavHeading">Quora</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link onClick={handleShow}>Add Question</Nav.Link>
                    </Nav>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Question</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="navInputBox">
                                <input type="text" placeholder="Enter your name" name="name" value={state.name} onChange={handleChange} /><br /><br />
                                <textarea rows="5" cols="20" placeholder="Raise your question.." name="question" value={state.question} onChange={handleChange} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button className="addBtn" onClick={handleSubmit}>
                                Added
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search Quora"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button className="searchBtn">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}