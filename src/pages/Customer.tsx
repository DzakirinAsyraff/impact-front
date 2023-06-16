import { useEffect } from 'react'
import { Counter, Queue } from '../types/types';
import {Container, Button, Card} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { counterAPI } from '../API/counterAPI';
import { queueAPI } from '../API/queueAPI';
import '../styles/custom.css';
import { socket } from '../socket';
import { setAllCounters, setACounter } from '../redux/counterSlice';
import { setQueue } from '../redux/queueSlice';

function Customer() {

    const dispatch = useAppDispatch();
    const queue = useAppSelector((state)=>state.queue);
    const counter = useAppSelector((state)=>state.counter);

    useEffect(()=>{
        socket.on("receiveStatus", (data: Counter) => {
            dispatch(setACounter(data));
        });

        socket.on("receiveNext", (data: Counter) => {
            dispatch(setACounter(data));
            queueAPI.getQueue()
            .then((response) => {
                dispatch(setQueue(response));
            })
          });

        socket.on("receiveQueue", (data: Queue) => {
            dispatch(setQueue(data));
          });

        socket.on("receiveComplete", (data: Counter) => {
            dispatch(setACounter(data))
          });

      }, [socket])

    useEffect(() => {
        queueAPI.getQueue()
            .then((response) => {
                dispatch(setQueue(response));
            })
            .catch((error) => {
                console.log(error);
            });
        counterAPI.getCounter()
            .then((response) => {
                dispatch(setAllCounters(response))
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //take a new number function
    const enqueue = () => {
        queueAPI.takeTicket()
            .then((response) => {
                dispatch(setQueue(response));
                socket.emit("updateQueue", response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

  return (
    <>
        <div>
            <h1>Customer View</h1>
        </div>
        <div>
            <Card className='custom-card'>
                <Card.Body>
                    <Card.Text>
                        Now Serving: {queue?.front?.number ?? "none"}
                    </Card.Text>
                    <Card.Text>
                        Last Number: {queue?.rear?.number ?? "none"}
                    </Card.Text>
                    <Card.Text>
                        <Button variant="primary" onClick={enqueue}>Take a Number</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Container>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    {counter.counters.map((counter) => (
                            <Card className={`custom-card${counter.status === 'offline' ? ' closed-card' : ''}`}>
                                <div style={{position: 'relative'}}>
                                <div className={`${counter.status === 'serving' ? 'dot-serving' : counter.status === 'offline' ? 'dot-offline' : 'dot'}`}></div>
                                <Card.Body>
                                    <Card.Text>
                                       Counter {counter?.ind}
                                    </Card.Text>
                                    <Card.Text>
                                        {counter?.status === "offline" ? "Offline" : counter?.currentNumber?.number}
                                    </Card.Text>
                                    <Card.Text>
                                    </Card.Text>
                                </Card.Body>
                                </div>
                            </Card>
                    ))
                    }
                    </div>
            </Container>

        </div>
    </>
  );
}

export default Customer;
