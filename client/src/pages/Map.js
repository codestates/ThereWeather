import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { changeUser } from "../actions/index"
import MapBox from "../components/MapBox"

const Container = styled.div`
    // background-color: #f1319e;
    width: 100%;

    @media screen and (min-width: 1081px) {
        background-color: yellow;
        // max-width: 100%;
        width: 100%;
    }
`
const Container2 = styled.img`
    // background-color: pink;

    @media screen and (min-width: 1081px) {
        // width: 100%;
        // max-width: 100%
        // background-color: blue;
        display: block;
        // width: 100%;
    }
`

export default function Map() {
    // const dispatch = useDispatch()
    // const { userInfo } = useSelector((state) => state.itemReducer)
    // dispatch(changeUser(axiosData))
    // {/* <Container2 src="/img/fhd.png" /> */}

    return (
        <Container className="mapcontainer">
            <MapBox></MapBox>
        </Container>
    )
}
