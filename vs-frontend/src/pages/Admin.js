import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import ManVoters from "./ManVoters";
import voters from "../admin-images/voters.png";
import candidates from "../admin-images/candidates.png";

import { useContract, useContractWrite, useContractRead } from "@thirdweb-dev/react";
import { Web3Button } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "./Constants/addresses";



const Admin = () => {

    const { contract } = useContract(CONTRACT_ADDRESS);
    const { mutateAsync: setStatus, isLoading: writeLoading } = useContractWrite(contract, "setStatus");
    // const { data: statusData, isLoading: readLoading } = useContractRead(contract, "status"); 

    // const status = statusData?.status ?? "NotStarted";

    const start_elections = async () => {
        try {
            const data = await setStatus({ args: [] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    // function Status({ status }) {
    //     return (
    //         <div>
    //             Status: {status === 0 ? "Not Started" : status === 1 ? "Running" : "Completed"}
    //         </div>
    //     );
    // }

return (
    <div>
        <div>
            <header className="header1">
                <nav className="navbar">
                    <a href="/manage-candidates">Manage Candidates</a>
                    <a href="/manage-voters">Manage Voters</a>
                    <a className="logout-but" href="/">Logout</a>
                </nav>
            </header>
        </div>

        <div className="background"></div>

        <div className="container1">
            <div className="content1">
                <div className="card1">
                    <img src={candidates}></img>
                    <div className="intro">
                        <div className="inner-card">
                            <h4>Manage Candidates</h4>
                            <p>Add, Delete and Update Candidates</p>
                            <button><NavLink className="link" to="/manage-candidates">Go<i className='bx bxs-right-arrow' ></i></NavLink></button>
                        </div>
                    </div>
                </div>
                <div className="card1">
                    <img src={voters}></img>
                    <div className="intro">
                        <div className="inner-card">
                            <h4>Manage Voters</h4>
                            <p>Add, Delete and Update Voters</p>
                            <button><NavLink className="link" to="/manage-voters">Go<i className='bx bxs-right-arrow' ></i></NavLink></button>
                        </div>
                    </div>
                </div>
                <div className="elec-buttons">
                    <Web3Button
                        contractAddress={CONTRACT_ADDRESS}
                        action={start_elections}
                        disabled={writeLoading}
                    >
                        Start Elections
                    </Web3Button>

                    {/* <Status status={status} /> */ }

                    <button className="close-button">Close Elections</button>
                    {/*<Web3Button
                        contractAddress={CONTRACT_ADDRESS}
                        action={close_elections}
                        disabled={writeLoading}
                    >
                        Start Elections
                    </Web3Button> */}
                </div>
            </div>
        </div>
    </div>
);
};

export default Admin;
