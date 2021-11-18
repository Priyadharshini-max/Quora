import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
export default function Answer() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [state, setState] = useState({
        question: "",
        answerDetails: []
    })

    const params = useParams();
    const PostAnswer = () => {
        setShow(false);
        try {
            const { name, answer } = state
            const { data } = axios.post("", {
                name,
                answer
            })
            console.log(params.id)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(async () => {
        try {
            const { data } = await axios.get(`http://localhost:3001/getanswer/${params.id}`)
            console.log("question : ", data.result[0].question);
            setState({ ...state, answerDetails: data.result[0].answersRef })
             setState({ ...state, question: data.result[0].question })
            console.log(state.answerDetails);
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <>
            <div className="mainDiv" style={{ marginTop: ' 40px' }}>
                <Button variant="primary" onClick={handleShow}>
                    Answer
                </Button>
                <h3>{state.question}</h3>
                <p>No of answers : {state.answerDetails.length}</p>
                {state.answerDetails.map((item, index) => {
                    return (
                        <div className="mainQuestion" >
                            <div className="questionDiv">
                                <p>{item.answer}</p>
                            </div>
                            <div className="username">
                                <p>PostedBy - <strong>{item.name}</strong></p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={PostAnswer}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

