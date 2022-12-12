import React from 'react'
import axios from 'axios'
import './LoginPage.css'
import Login from '../../Component/Loginbox/Login';
import Regi from '../../Component/Regibox/Regi';
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div className='loginpage'>
            <div className='logbox'>
                <Routes>
                    <Route path='' element={<Login />} />
                    <Route path='regi' element={<Regi />} />
                    <Route path='*' element={<Navigate to='' />} />
                </Routes>
            </div>
        </div>
    )
}

export default LoginPage