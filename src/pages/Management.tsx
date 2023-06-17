// import { useEffect } from 'react'
// import { Counter, Queue } from '../types/types';
// import {Container, Button, Card, Alert} from 'react-bootstrap';
// import { counterAPI } from '../API/counterAPI';
// import { queueAPI } from '../API/queueAPI';
// import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
// import { setAllCounters, setACounter } from '../redux/counterSlice';
// import { setQueue, dequeue } from '../redux/queueSlice';
// import { socket } from '../socket';
// import '../styles/custom.css';

// function Management() {

//   const dispatch = useAppDispatch();
//   const queue = useAppSelector((state)=>state.queue);
//   const counter = useAppSelector((state)=>state.counter);

//   useEffect(()=>{
//     socket.on("receiveStatus", (data: Counter) => {
//       dispatch(setACounter(data));
//     });

//     socket.on("receiveNext", (data: Counter) => {
//       dispatch(setACounter(data));
//       queueAPI.getQueue()
//       .then((response) => {
//           dispatch(setQueue(response));
//       })
//     });

//     socket.on("receiveQueue", (data: Queue) => {
//       dispatch(setQueue(data));
//     });

//     socket.on("receiveComplete", (data: Counter) => {
//       dispatch(setACounter(data));
//     });
//   }, [socket])



//   useEffect(() => {
//     queueAPI.getQueue()
//               .then((response) => {
//                   dispatch(setQueue(response));
//               })
//               .catch((error) => {
//                   console.log(error);
//               });

//     counterAPI.getCounter()
//         .then((response) => {
//           dispatch(setAllCounters(response));
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//   }, []);

//   //toggle status by calling api
//   const toggleStatus = (ind: number) => {
//     counterAPI.toggleStatus(ind)
//         .then((response) => {
//           dispatch(setACounter(response));
//           socket.emit("updateStatus", response);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
//   }

//   //complete current
//   const completeCurrent = (ind: number) => {
//     counterAPI.completeCurrent(ind)
//     .then((response) => {
//       dispatch(setACounter(response));
//       socket.emit("updateComplete", response);
      
//   })
//   .catch((error) => {
//       console.log(error);
//   });
//   }

//   // call next
//   const callNext = (ind: number) => {
//     dispatch(dequeue())
//     counterAPI.callNext(ind)
//       .then((response) => {
//         dispatch(setACounter(response));
//         socket.emit("callNext", response);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
//   }


//   return (
//   <>
//       <div>
//           <h1>Counter Management</h1>
//       </div>
//       {queue?.tickets && queue.tickets.length < 1 && (
//         <Alert variant="error">
//           <Alert.Heading>No tickets in the waiting queue</Alert.Heading>
//         </Alert>
//       )}
//       <div>
//           <Container>
//                   <div style={{display: 'flex', justifyContent: 'center'}}>
//                   {counter.counters.map((c) => (
//                           <Card 
//                             className={`custom-card${c.status === 'offline' ? ' closed-card' : ''}`} 
//                             key={c.ind}
//                           >
//                               <Card.Body>
//                                   <Card.Text>
//                                     Counter {c.ind}
//                                   </Card.Text>
//                                   <Card.Text>
//                                     {
//                                       c.status === "offline" ? "Closed" : 
//                                       c.status === "online" ? "Open" : `Serving Ticket ${c.currentNumber?.number}`
//                                     }
//                                   </Card.Text>
//                                   <Card.Text>
//                                       <Button 
//                                       variant="primary" 
//                                       disabled={c.status === "serving"}
//                                       onClick={() => toggleStatus(c.ind)}>
//                                         Go {c.status === "offline" ? "Online" : "Offline"}
//                                       </Button>
//                                   </Card.Text>
//                                   <Card.Text>
//                                     {/* button for complete current */}
//                                       <Button 
//                                       variant="primary" 
//                                       disabled={c.status !== "serving"}
//                                       onClick={()=> completeCurrent(c.ind)}>
//                                         Complete Current
//                                       </Button>
//                                   </Card.Text>
//                                   <Card.Text>
//                                       <Button 
//                                       variant="primary" 
//                                       disabled={c.status !== "online" || queue?.tickets && queue?.tickets.length < 1 }
//                                       onClick={() => callNext(c.ind)}>
//                                         Call Next
//                                       </Button>
//                                   </Card.Text>
//                               </Card.Body>
                              
//                           </Card>
//                   ))
//                   }
//                   </div>
//           </Container>

//       </div>
//   </>
//     );
//   }

// export default Management;