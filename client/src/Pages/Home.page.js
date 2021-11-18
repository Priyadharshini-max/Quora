import { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Home.style.css";
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [state, setState] = useState({
        question: [],
        answer: []
    });

    let navigate = useNavigate();

    useEffect(async () => {
        try {
            console.log("data");
            const { data } = await axios.get("http://localhost:3001/getquestion");
            console.log(data);
            setState({ ...state, question: data.result });
            console.log("state", state.question);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const getId = (id) => {
        console.log("GetId", id);
        navigate(`/answer/${id}`);
    }
    
    return (
        <>
            <div className="mainDiv" style={{ marginTop: ' 40px' }}>
                <h3>Questions</h3>
                <p>No of questions : {state.question.length}</p>
                {state.question.map((item, index) => {
                    return (
                        <div className="mainQuestion" onClick={() => { getId(item._id) }}>
                            <div className="questionDiv">
                                <p>{item.question}</p>
                            </div>
                            <div className="username">
                                <p>PostedBy - <strong>{item.name}</strong></p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}