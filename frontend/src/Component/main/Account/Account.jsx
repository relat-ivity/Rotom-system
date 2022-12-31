import React from 'react'
import axios from 'axios'
import './Account.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom'

const Account = () => {
    const navigate = useNavigate()

    return (
        <div className='page'>
            Account
        </div>
    )
}

export default Account;