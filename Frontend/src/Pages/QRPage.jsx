import React from "react";
import {QRCodeSVG} from 'qrcode.react';
import {Link} from "react-router-dom";
import AdminIcon from '../assets/Admin.png';

const QRPage=()=>{
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-purple-800">
        <h1 className="text-2xl font-bold mb-4">Scan to View Menu</h1>
        <QRCodeSVG value="https://qr-task-chi.vercel.app/menu" size={200} className="mb-6" />
        <Link to="/admin/login" className="text-black text-lg">
        Admin Login
        <img className="size-10 mx-auto" src={AdminIcon} alt="" />
        </Link>
        </div>
    )
}

export default QRPage;
