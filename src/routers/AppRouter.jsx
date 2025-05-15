import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import MainLayout from '../layouts/MainLayout'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Homepage />}></Route>
                </Route>

                    <Route path="/" element={<Homepage />}></Route>
            </Routes>


        </BrowserRouter>
    )
}

// task
//in login page
// make 2 link
// go back- routes to homepage
//register 