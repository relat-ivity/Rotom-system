import React from 'react'
import axios from 'axios'
import './Sceneinfo.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { SetStateAction, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Navigate, Routes, useNavigate, useParams } from 'react-router-dom'

const Sceneinfo = () => {
    const navigate = useNavigate()
    const params = useParams()

    useEffect(()=>{console.log(params)},[])

    return (
        <div className='page'>
            {params.scenename}
        </div>
    )
}

export default Sceneinfo;