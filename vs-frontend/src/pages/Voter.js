import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { Web3Button } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./Constants/addresses";
import { Web3Button } from '@thirdweb-dev/react'



const PatientList = () => {
    // const [patients, setPatients] = useState([]);
    // const navigate = useNavigate();

    // const { contract } = useContract(CONTRACT_ADDRESS);
    // const { data, isLoadingData } = useContractRead(contract, "showOurPatients", []);

    // useEffect(() => {
    //     if (data && !isLoadingData) {
    //         const formattedPatients = data.map((patient) => ({
    //             address: patient.patientAddress,
    //             name: patient.name,
    //             age: patient.age.toString(),
    //         }));

    //         setPatients(formattedPatients);
    //     }
    // }, [data, isLoadingData]);

    // if (!patients) {
    //     return <div>Loading...</div>;
    // }


    const { contract } = useContract(CONTRACT_ADDRESS);
    const { data, isLoading } = useContractRead(contract, "getCandidatesList", []);

    // const parseCandidateList = (candidateString) => {
    //     const candidatesArray = candidateString.split('\n').filter(Boolean); // Split the string by newlines and remove empty strings
    //     return candidatesArray.map(candidate => {
    //         const [name, symbol] = candidate.split(','); // Split each line by comma to get name and symbol
    //         return { name: name.trim(), symbol: symbol.trim() }; // Trim extra whitespace
    //     });
    // };

    const parseCandidateList = (candidateList) => {
        // Assuming candidateList is a string as provided in your example
        // You need to parse it into an array of candidate objects
        // Here is a simplified example:
        const candidatesArray = candidateList
            .split('\n') // Split the string by new line
            .filter(candidate => candidate.trim() !== '') // Filter out any empty strings
            .map(candidate => {
                const [name, symbol] = candidate.split(','); // Assuming name and symbol are separated by a comma
                return { name: name.trim(), symbol: symbol.trim() };
            });
        return candidatesArray;
    };


    return (
        <div className="patient-list">

            <div>
                <header className="header2">
                    <nav className="navbar">
                        <a href="/voter" style={{ background: "gray", borderRadius: "10px", padding: "5px" }}>Home</a>
                        <a href="/" style={{ background: "gray", borderRadius: "10px", padding: "5px" }}>Logout</a>
                    </nav>
                </header>
            </div>


            <div className="background"></div>


            <div className="container2">
                <div className="welcome-doc-div"><h3 className="welcome-doc">Welcome Voter! Use your power, Change the world you live in!</h3></div>
                <h3 className="patient-list-title">Candidate List</h3>
                <div className="candidates-grid-container" style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#6a6a6b', minHeight: '100vh', borderRadius: '30px' }}>
                    <div className="candidates-grid" style={{ width: '80%', maxWidth: '1200px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px' }}>
                        <h2 style={{ color: '#ffffff' }}>Registered Candidates</h2>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            parseCandidateList(data).map((candidate, index) => (
                                <div key={index} className="candidate-card" style={{ width: '100%', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', padding: '30px', backgroundColor: '#fff', marginBottom: '20px' }}>
                                    <h3 style={{ margin: '0', color: '#333', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Name: {candidate.name}</h3>
                                    <div style={{ fontSize: '2rem', color: '#666', marginTop: '10px', fontWeight: 'bold' }}>Symbol: {candidate.symbol}</div>


                                    <Web3Button
                                        contractAddress={CONTRACT_ADDRESS}
                                        action={() => {console.log(candidate.candidateAddress)
                                                        contract.call("vote", [candidate.candidateAddress])}}
                                    >
                                        Vote
                                    </Web3Button>


                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="content2">
                </div>
            </div>
        </div>
    );
};

export default PatientList;