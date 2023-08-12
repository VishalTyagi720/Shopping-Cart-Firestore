import React, { useState, useEffect } from "react";

// function hook (){
//     const [email, setEmail] = useState('aa@a.com'); // initial state of our component

//     const [name, setname] = useState('');
    
//     function handlechange (e) {
//         setEmail(e.target.value)
//     }

//     function handlechangename (e) {
//         setname(e.target.value)
//     }

//     return (
//         <div className = "hook" style = {{ padding: 10}}>
//             <input value = {email} onChange = {handlechange}></input>
//             <p> Email: {email} </p>

//             <input value = {email} onChange = {handlechangename}></input>
//             <p> name: {name} </p>
//         </div>
//     );
// }

function app (props) {
    const [userId, setUserId] = useState('1');
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = "https://jsonplaceholder.typicode.com/posts?userId=${userId}";

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log('data', data);
                setData(data);
            });
    }, [userId]);

    return (
        <div className="'app">
            <h1> App </h1>
            <button onClick={() => setUserId('2')}> Change user id to 2</button>
            {data.map((user) => {
                <div>
                    <p>{user.title}</p>
                </div>
            })}
        </div>
    );
}