import './App.css';
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import './App.css';

const Birthday = () => {

    const [born, updateBorn] = useState([]);

    const fetchBorn = async() => {
        const data = await API.get('cryptoapi', '/born')
        updateBorn(data.born);
    }

    useEffect(() => {
        fetchBorn()
    }, []);

    return (
        <div className="Birthday">
            <h2>
            GitHub user {born.login} was established on {born.created_at}
            </h2>
        </div>
    )
}

export default Birthday