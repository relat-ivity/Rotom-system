import React from 'react'
import axios from 'axios'
import './Login.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes } from 'react-router-dom'

const Login = () => {
    return(
        <div>
            <div className='loghead'>
                <p>智能家居管理系统</p>
            </div>
            <div className='logform'>

            </div>

        </div>
    )
}

export default Login;