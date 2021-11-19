import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

export default function Answer() {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setState({ ...state, name: "", answer: "" })
    };
    const handleShow = () => setShow(true);
    const [state, setState] = useState({
        name: "",
        answer: "",
        question: []
    })
    const [answerData, setAnswerData] = useState([]);
    const params = useParams();

    const PostAnswer = async () => {
        setShow(false);
        try {
            const { name, answer } = state;
            if (name && answer) {
                const { data } = await axios.post(`https://quora-api-01.herokuapp.com/postanswer/${params.id}`, {
                    name,
                    answer
                })
                setAnswerData([...answerData, data.result])
                setState({ ...state, name: "", answer: "" });
                toast.success("Answer Posted");
            } else {
                toast.error("Must fill all the fields");
            }


        } catch (error) {
            toast.error("Error");
        }
    }
    const handleChange = ({ target: { name, value } }) => {
        setState({ ...state, [name]: value })
    };

    useEffect(async () => {
        try {
            const { data } = await axios.get(`https://quora-api-01.herokuapp.com/getanswer/${params.id}`)
            setAnswerData(data.result[0].answersRef)
            setState({ ...state, question: data.result[0].question })
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
                <p>No of answers : {answerData.length}</p>
                {answerData.map((item, index) => {
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
                    <Modal.Title>Answer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="navInputBox">
                        <input type="text" placeholder="Enter your name" name="name" value={state.name} onChange={handleChange} /><br /><br />
                        <textarea rows="5" cols="20" placeholder="Raise your question.." name="answer" value={state.answer} onChange={handleChange} />
                    </div>
                </Modal.Body>
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

