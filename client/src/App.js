import React, { useState, useEffect } from "react"
import { Switch, Route, Redirect, useHistory, Router } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import "./App.css"
import Map from "./pages/Map"
import Home from "./pages/Home"
import BookMark from "./pages/BookMark"
import Header from "./components/Header"
import MenuBar from "./components/MenuBar"
import UserInfo from "./pages/UserInfo"
import More from "./pages/More"
import MyPage from "./pages/MyPage"
import Login from "./pages/Login"
import PasswordEdit from "./pages/PasswordEdit"
import SignUp from "./pages/SignUp"
import MyPost from "./pages/MyPost"
import Write from "./pages/Write"
import PostRead from "./pages/PostRead"
import PostEdit from "./pages/PostEdit"
import styled from "styled-components"
// import { faRoute } from "@fortawesome/free-solid-svg-icons"

export default function App() {
    const isInput = true
    const { isLogin } = useSelector((state) => state.itemReducer)
    return (
        <>
            <Header isInput={isInput} />
            <Switch>
                <Route exact path="/map">
                    <Map></Map>
                </Route>
                <Route exact path="/home">
                    <Home></Home>
                </Route>
                <Route exact path="/bookmark">
                    <BookMark></BookMark>
                </Route>
                <Route exact path="/userinfo">
                    <UserInfo></UserInfo>
                </Route>
                <Route exact path="/more">
                    <More></More>
                </Route>
                <Route exact path="/mypage">
                    <MyPage></MyPage>
                </Route>
                <Route exact path="/login">
                    <Login></Login>
                </Route>
                <Route exact path="/signup">
                    <SignUp></SignUp>
                </Route>
                <Route exact path="/editpassword">
                    <PasswordEdit></PasswordEdit>
                </Route>
                <Route exact path="/write">
                    <Write></Write>
                </Route>
                <Route exact path="/mypost">
                    <MyPost></MyPost>
                </Route>
                <Route exact path="/postread">
                    <PostRead></PostRead>
                </Route>
                <Route exact path="/editpost">
                    <PostEdit></PostEdit>
                </Route>
                <Route exact path="/">
                    {isLogin ? <Redirect to="/home" /> : <Redirect to="/map" />}
                </Route>
            </Switch>
            <MenuBar></MenuBar>
        </>
    )
}
