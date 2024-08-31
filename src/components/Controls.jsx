import React from "react";
import AddButton from "./AddButton";
import colors from "../assets/colors.json";
import Color from "./Color";
import logout from '../icons/shutdown.png';
import { useAuth } from "../context/AuthContext";
const Controls = () => {
    const {user, logoutUser} = useAuth()
    return (
        <div id="controls">
            <AddButton />
            {colors.map((color) => (
                <Color key={color.id} color={color} />
            ))}
            <div
                className="color"
                onClick={logoutUser}
            >
                <img className="color" src={logout} title="Logout" alt="logout"/>
            </div>
        </div>
    );
};

export default Controls;