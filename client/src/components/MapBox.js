import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
    changeSearchword,
    changeCurLocation,
    updatePostId,
} from "../actions/index"
import $ from "jquery"
import axios from "axios"
import { Doughnut, Bar } from "react-chartjs-2"
import LoadingSpinner from "./LoadingSpinner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { useHistory } from "react-router-dom"

const ImgContainer = styled.div`
    position: relative;
    width: 100%;
    height: var(--mobile-page-height);

    @media screen and (min-width: 1081px) {
        height: var(--desktop-page-height);
    }
`
const PostListModal = styled.div`
    // border: 1px solid black;

    background-color: white;
    z-index: 999;
    // position: absolute;
    position: fixed;
    right: 0;
    bottom: 115px;
    width: 100%;
    height: 50%;
    overflow: auto;
    padding: 0.5rem;
    @media screen and (min-width: 1081px) {
        background-color: white;
        z-index: 999;
        position: absolute;
        right: 0;
        bottom: 70px;
        width: 35.3%;
        height: 75%;
        overflow: auto;
    }
`
const SlideModal = styled.div`
    // border: 1px solid black;
    background-color: white;
    z-index: 9999;
    // position: absolute;
    position: fixed;
    right: 0;
    // top: 0px;
    bottom: 70px;
    // bottom: 130%;
    // bottom: ${(props) => props.bottom || "52.9%"};
    width: 100%;
    height: 4%;
    overflow: auto;
    display: flex;
    justify-content: center;
    @media screen and (min-width: 1081px) {
        background-color: white;
        z-index: 9999;
        position: absolute;
        // position: fixed;
        // right: 1%;

        bottom: 70px;
        // bottom: ${(props) => props.bottom || "52.9%"};
        width: 35.3%;
        height: 4%;
        overflow: auto;
        display: flex;
        justify-content: center;
    }
`
const GraphModal = styled.div`
    // border: 1px solid black;
    width: 50%;
    display: flex;

    @media screen and (min-width: 1081px) {
        // border: 1px solid pink;
    }
`

const GraphTitle = styled.div`
    // border: 1px solid black;
    width: 100%;
    display: flex;
    flex-direction: row;
    font-weight: bold;

    @media screen and (min-width: 1081px) {
    }
`
const GraphTitleDiv = styled.div`
    // border: 1px solid black;
    // margin: 1px;
    // margin-top: 0.5rem;
    // margin-bottom: 0.5rem;
    width: 100%;
    text-align: center;
    // font-size: 0.8rem;
    background-color: pink;

    @media screen and (min-width: 1081px) {
        // border: 1px solid pink;
    }
`
const GraphTitleDiv2 = styled.div`
    // border: 1px solid black;
    // margin: 1px;
    width: 100%;
    text-align: center;
    font-size: 0.8rem;

    @media screen and (min-width: 1081px) {
        // border: 1px solid pink;
    }
`
const BarGraphFlex = styled.div`
    // border: 1px solid black;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    // @media screen and (min-width: 1081px) {
    //     border: 1px solid pink;
    // }
`
const BarGraphchild = styled.div`
    // border: 1px solid black;
    width: 100%;

    // @media screen and (min-width: 1081px) {
    //     border: 1px solid pink;
    // }
`

let url = process.env.REACT_APP_LOCAL_URL
if (!url) url = "https://thereweather.space"

export default function Location({ bottom }) {
    const { searchWord, weatherFilter } = useSelector(
        (state) => state.itemReducer
    )

    const [isLoading, setisLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const { kakao } = window
    const [weatherCount, setWeatherCount] = useState({
        sunny: 0,
        cloudy: 0,
        rainy: 0,
        snowy: 0,
    }) //????????? ?????????
    const [weatherApi, setweatherApi] = useState(0)

    const [postList, setPostList] = useState([
        {
            bottom_id: "",
            createdAt: "Z",
            id: null,
            post_content: "",
            post_photo: "",
            post_title: "????????? ?????? ?????? ?????????.",
            temp: "",
            top_id: "",
            updatedAt: "",
            user_id: "",
            weather: "",
            wind: "",
            xLocation: null,
            yLocation: null,
        },
    ])
    console.log(weatherFilter)
    //---------------
    useEffect(() => {
        var container = document.getElementById("map")
        var options = {
            center: new kakao.maps.LatLng(37.5642135, 127.0016985),
            level: 3,
        }
        var map = new kakao.maps.Map(container, options) //????????? ??????
        var zoomControl = new kakao.maps.ZoomControl() //???????????? ??????
        map.addControl(zoomControl, kakao.maps.ControlPosition.LEFT) //???????????? ?????? ??????
        // HTML5??? geolocation?????? ????????? ??? ????????? ???????????????
        if (navigator.geolocation) {
            // GeoLocation??? ???????????? ?????? ????????? ???????????????
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude, // ??????
                    lon = position.coords.longitude // ??????

                var locPosition = new kakao.maps.LatLng(lat, lon), // ????????? ????????? ????????? geolocation?????? ????????? ????????? ???????????????
                    message =
                        '<div style="font-align:center;"> ?????? ?????? ??????</div>' // ?????????????????? ????????? ???????????????

                // ????????? ?????????????????? ???????????????
                displayMarker(locPosition, message)
                console.log(locPosition)

                console.log(lat) //??????
                console.log(lon) //??????
                dispatch(changeCurLocation(lat, lon))
            })
        } else {
            // HTML5??? GeoLocation??? ????????? ??? ????????? ?????? ?????? ????????? ??????????????? ????????? ???????????????

            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                message = "geolocation??? ???????????? ?????????.."

            displayMarker(locPosition, message)
        }
        // ????????? ????????? ?????????????????? ???????????? ???????????????

        function displayMarker(locPosition, message) {
            // ????????? ???????????????
            var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition,
            })

            var iwContent = message, // ?????????????????? ????????? ??????
                iwRemoveable = true

            // ?????????????????? ???????????????
            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable,
            })

            // ?????????????????? ???????????? ???????????????
            infowindow.open(map, marker)

            // ?????? ??????????????? ??????????????? ???????????????
            map.setCenter(locPosition)
        }

        // ??????-?????? ?????? ????????? ???????????????
        var geocoder = new kakao.maps.services.Geocoder()

        // ????????? ????????? ???????????????
        geocoder.addressSearch(searchWord, function (result, status) {
            // ??????????????? ????????? ???????????????
            if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x)

                // ??????????????? ?????? ????????? ????????? ???????????????
                // var marker = new kakao.maps.Marker({
                //     map: map,
                //     position: coords,
                // })
                // console.log(arguments)
                // ?????????????????? ????????? ?????? ????????? ???????????????
                // var infowindow = new kakao.maps.InfoWindow({
                //     content: `<div style="width:150px;text-align:center;padding:6px 0;">${arguments[0][0].road_address.address_name} ??????</div>`,
                // })
                // infowindow.open(map, marker)

                // ????????? ????????? ??????????????? ?????? ????????? ??????????????????
                dispatch(changeSearchword(searchWord))
                map.setCenter(coords)
            }
        })

        //??????????????? ??????
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
            // ????????? ??????, ?????? ????????? ???????????????
            var latlng = mouseEvent.latLng
            // ?????? ????????? ????????? ????????? ????????????
            // marker.setPosition(latlng)
            //????????? ?????? ?????? ????????? ???????????? ?????? ??????
            var message = "????????? ????????? ????????? " + latlng.getLat() + " ??????, "
            message += "????????? " + latlng.getLng() + " ?????????"
            console.log(message)
        })
        //////////////////////////////////////////??????-hoon/////////////////////////////////////////

        var clusterer = new kakao.maps.MarkerClusterer({
            map: map, // ???????????? ??????????????? ???????????? ????????? ?????? ??????
            averageCenter: true, // ??????????????? ????????? ???????????? ?????? ????????? ???????????? ?????? ????????? ??????
            minLevel: 9, // ???????????? ??? ?????? ?????? ??????
        })

        // ???????????? ???????????? ?????? jQuery??? ???????????????
        // ???????????? ????????? ????????? ???????????? ??????????????? ????????? ???????????????
        $.get(
            url + `/post/location?weather=${weatherFilter.weatherFilter}`,
            function (data) {
                // ??????????????? ?????? ?????? ????????? ????????? ???????????????
                // ?????? ?????????????????? ????????? ?????? ????????? ????????? ??? ?????? ????????? ???????????? ????????????
                // console.log(data)
                // console.log($(data.positions))
                // console.log($(data.positions[0]))

                var markers = $(data.positions).map(function (i, position) {
                    return new kakao.maps.Marker({
                        position: new kakao.maps.LatLng(
                            position.xLocation,
                            position.yLocation
                        ),
                    })
                })
                console.log(markers)
                console.log($(data.positions)[0])
                $(data.positions).map((n, idx) => {
                    console.log($(data.positions))
                    // $(data.positions).map((el) => {
                    //     console.log(el)
                    //     if ($(data.positions)[el].weather === "sunny") {
                    //         setWeatherCount({
                    //             ...weatherCount,
                    //             sunny: weatherCount.sunny + 1,
                    //         })
                    //     } else if ($(data.positions)[el].weather === "cloudy") {
                    //         setWeatherCount({
                    //             ...weatherCount,
                    //             cloudy: weatherCount.cloudy + 1,
                    //         })
                    //     } else if ($(data.positions)[el].weather === "rainy") {
                    //         setWeatherCount({
                    //             ...weatherCount,
                    //             rainy: weatherCount.rainy + 1,
                    //         })
                    //     } else if ($(data.positions)[el].weather === "snowy") {
                    //         setWeatherCount({
                    //             ...weatherCount,
                    //             snowy: weatherCount.snowy + 1,
                    //         })
                    //     }
                    // })

                    var iwContent = `
                <container style="border:3px solid pink; padding:5px; height:20rem; width:15rem; display:flex; flex-direction: row; overflow: auto;">
                    <box style="">
                        <h3>${$(data.positions)[n].post_title}</h3>
                            <box style="display:flex; flex-direction: row;">
                            
                        ${
                            $(data.positions)[n].weather === "sunny"
                                ? "<img src='img/icons-write/sunny.png' style='width:2rem;'/>"
                                : $(data.positions)[n].weather === "cloudy"
                                ? "<img src='img/icons-write/cloudy.png' style='width:2rem;'/>"
                                : $(data.positions)[n].weather === "rainy"
                                ? "<img src='img/icons-write/rainy.png' style='width:2rem;'/>"
                                : $(data.positions)[n].weather === "snowy"
                                ? "<img src='img/icons-write/snowy.png' style='width:2rem;'/>"
                                : null
                        }
                        ${
                            $(data.positions)[n].wind === "breezy"
                                ? "<img src='img/icons-write/breezy.png' style='width:2rem;'/>"
                                : $(data.positions)[n].wind === "windy"
                                ? "<img src='img/icons-write/windy.png' style='width:2rem;'/>"
                                : $(data.positions)[n].wind === "strong"
                                ? "<img src='img/icons-write/strong.png' style='width:2rem;'/>"
                                : null
                        }
                        ${
                            $(data.positions)[n].temp === "cold"
                                ? "<img src='img/icons-write/cold.png' style='width:2rem;'/>"
                                : $(data.positions)[n].temp === "hot"
                                ? "<img src='img/icons-write/hot.png' style='width:2rem;'/>"
                                : null
                        }
                        ${
                            $(data.positions)[n].outer_id === "?????????"
                                ? "<img src='img/codi/?????????.png' style='width:2rem;'/>"
                                : $(data.positions)[n].outer_id === "??????"
                                ? "<img src='img/codi/??????.png' style='width:2rem;'/>"
                                : $(data.positions)[n].outer_id === "????????????"
                                ? "<img src='img/codi/????????????.png' style='width:2rem;'/>"
                                : $(data.positions)[n].outer_id === "???????????????"
                                ? "<img src='img/codi/???????????????.png' style='width:2rem;'/>"
                                : $(data.positions)[n].outer_id === "??????"
                                ? "<img src='img/codi/??????.png' style='width:2rem;'/>"
                                : $(data.positions)[n].outer_id === "default"
                                ? "<img src='img/codi/default.png' style='width:2rem;'/>"
                                : null
                        }
                        ${
                            $(data.positions)[n].top_id === "??????"
                                ? "<img src='img/codi/??????.png' style='width:2rem;'/>"
                                : $(data.positions)[n].top_id === "??????"
                                ? "<img src='img/codi/??????.png' style='width:2rem;'/>"
                                : $(data.positions)[n].top_id === "?????????"
                                ? "<img src='img/codi/?????????.png' style='width:2rem;'/>"
                                : $(data.positions)[n].top_id === "??????"
                                ? "<img src='img/codi/??????.png' style='width:2rem;'/>"
                                : $(data.positions)[n].top_id === "??????"
                                ? "<img src='img/codi/??????.png' style='width:2rem;'/>"
                                : null
                        }
                        ${
                            $(data.positions)[n].bottom_id === "?????????"
                                ? "<img src='img/codi/?????????.png' style='width:2rem;'/>"
                                : $(data.positions)[n].bottom_id === "?????????"
                                ? "<img src='img/codi/?????????.png' style='width:2rem;'/>"
                                : null
                        }
                        </box>
                        <img src=${
                            $(data.positions)[n].post_photo
                        } style="padding:5px; max-height:100%; max-width:100%;"></img>
                        <div>${$(data.positions)[n].post_content}</div>
                    </box>
                </container>


                             `, // ?????????????????? ????????? ???????????? HTML ??????????????? document element??? ???????????????
                        iwRemoveable = true // removeable ????????? ture ??? ???????????? ?????????????????? ?????? ??? ?????? x????????? ???????????????

                    // ?????????????????? ???????????????
                    var infowindow = new kakao.maps.InfoWindow({
                        content: iwContent,
                        removable: iwRemoveable,
                    })
                    kakao.maps.event.addListener(
                        markers[n],
                        "click",
                        function () {
                            // ?????? ?????? ?????????????????? ???????????????
                            infowindow.open(map, markers[n])
                        }
                    )
                })

                clusterer.addMarkers(markers)
            }
        )

        let timer
        // ????????? ??????, ??????, ????????? ?????? ??????????????? ???????????? ????????? ??????????????? ????????? ????????? ??????????????? ???????????? ???????????????
        kakao.maps.event.addListener(map, "idle", function () {
            setisLoading(false)
            if (timer) {
                clearTimeout(timer)
            }

            timer = setTimeout(function () {
                console.log("?????? ????????? ?????? ??? ????????? API??????")
                // setWeatherCount({
                //     sunny: 0,
                //     cloudy: 0,
                //     rainy: 0,
                //     snowy: 0,
                // })
                // ?????? ??????????????? ???????????????
                var bounds = map.getBounds()

                // ??????????????? ????????? ????????? ???????????????
                var swLatlng = bounds.getSouthWest()

                // ??????????????? ????????? ????????? ???????????????
                var neLatlng = bounds.getNorthEast()

                var message =
                    "??????????????? ????????? ??????, ?????????  " +
                    swLatlng.toString() +
                    "??????"
                message +=
                    "????????? ??????, ?????????  " + neLatlng.toString() + "????????? "

                // setTimeout(() => {
                console.log(message)
                console.log(swLatlng)
                console.log(neLatlng)
                axios({
                    url:
                        url +
                        `/post/list?top=${neLatlng.La}&bottom=${swLatlng.La}&left=${swLatlng.Ma}&right=${neLatlng.Ma}`,
                    // url: url + "/signup",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        // "Content-Type": "text/plain",
                    },
                    withCredentials: true,
                }).then((res) => {
                    console.log(res.data)
                    setPostList(res.data)
                    console.log(postList)
                    let sunny = 0
                    let cloudy = 0
                    let rainy = 0
                    let snowy = 0
                    for (let n = 0; n < res.data.length; n++) {
                        if (res.data[n].weather === "sunny") {
                            sunny = sunny + 1
                        } else if (res.data[n].weather === "cloudy") {
                            cloudy++
                        } else if (res.data[n].weather === "rainy") {
                            rainy++
                        } else if (res.data[n].weather === "snowy") {
                            snowy++
                        }
                    }
                    setWeatherCount({
                        sunny: sunny,
                        cloudy: cloudy,
                        rainy: rainy,
                        snowy: snowy,
                    })
                })

                //?????????????????? ???????????? ????????? ???????????? ??????????????? -hoon
                var latlng = map.getCenter()

                axios({
                    url: url + `/map2?lat=${latlng.Ma}&lon=${latlng.La}`,
                    // url: url + "/signup",
                    method: "get",
                    headers: {
                        "Content-Type": "application/json",
                        // "Content-Type": "text/plain",
                    },
                    withCredentials: true,
                }).then((res) => {
                    console.log(res.data)
                    setweatherApi(res.data.fcstValue)
                })
            }, 1000)
            setisLoading(true)
        })
    }, [
        kakao.maps.LatLng,
        kakao.maps.Marker,
        kakao.maps.event,
        kakao.maps.Map,
        searchWord,
        weatherFilter,
    ])

    const Box = styled.div`
        // display: flex;
        // flex-direction: row;
        width: 50%;
        // height: 50%;
        // border: 1px solid black;
        @media screen and (min-width: 1081px) {
        }
    `
    const Box2 = styled.div`
        // display: flex;
        // flex-direction: row;
        // width: 10000px;

        width: 50%;

        @media screen and (min-width: 1081px) {
        }
    `
    const EmoticonBox = styled.div`
        display: flex;
        flex-direction: row;

        @media screen and (min-width: 1081px) {
        }
    `
    const PostTitle = styled.div`
        // display: flex;
        // flex-direction: row;

        // border: 1px solid black;
        text-align: center;
        background-color: pink;
        border-radius: 10%;

        @media screen and (min-width: 1081px) {
        }
    `
    const PostContent = styled.div`
        // display: flex;
        // flex-direction: row;

        @media screen and (min-width: 1081px) {
        }
    `
    const PostBox = styled.div`
        display: flex;
        flex-direction: row;
        width: 100%;

        padding: 0.5rem;

        &:hover {
            background-color: #f5f5f5;
        }

        @media screen and (min-width: 1081px) {
        }
    `
    const PostImg = styled.img`
        width: 100%;
        border-radius: 20%;

        @media screen and (min-width: 1081px) {
        }
    `
    const IconImg = styled.img`
        width: 20%;
        cursor: pointer;
        @media screen and (min-width: 1081px) {
        }
    `
    const LoadingBoxDiv = styled.div`
        // margin-top: 50%;
        display: flex;
        justify-content: center;
        align-item: center;
        width: 100%;
        // border: 1px solid black;
        flex-direction: column;
        @media screen and (min-width: 1081px) {
            width: 100%;
            display: flex;
            justify-content: center;
            align-item: center;
            width: 100%;
            border: 1px solid black;
            flex-direction: column;
        }
    `
    const Button = styled.button`
        background-color: ${(props) => (props.bgGrey ? "#E0E0E0" : "white")};
        color: ${(props) => (props.bgGrey || props.isText ? "black" : "grey")};
        font-size: ${(props) => (props.isText ? "1.2rem" : "1.6rem")};
        margin: 0.1rem;
        // border: 1px solid black;
    `
    console.log(weatherCount)
    const data = {
        labels: ["??????", "??????", "???", "???"],
        datasets: [
            {
                data: [
                    weatherCount.sunny,
                    weatherCount.cloudy,
                    weatherCount.rainy,
                    weatherCount.snowy,
                ],
                backgroundColor: ["#FF6384", "gray", "#36A2EB", "silver"],
                hoverBackgroundColor: ["yellow", "black", "blue", "#d9d9d9"],
            },
        ],
    }
    const data2 = {
        labels: ["?????? ??????", "?????????"],
        datasets: [
            {
                label: "?????? ??????",
                backgroundColor: "#697cfa",
                borderColor: "#0022ff",
                borderWidth: 1,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                data: [
                    ((weatherCount.rainy + weatherCount.snowy) /
                        (weatherCount.sunny +
                            weatherCount.cloudy +
                            weatherCount.rainy +
                            weatherCount.snowy)) *
                        100,
                    weatherApi,
                ],
            },
        ],
    }

    const [isOnOff, setisOnOff] = useState(true)

    // postbox??? ???????????? postread??? ???????????????
    const postBoxHandler = (e) => {
        let elem = e.target

        while (!elem.classList.contains("postbox")) {
            elem = elem.parentNode
            if (elem.classList.contains("mapModal")) {
                elem = null
                return
            }
        }

        // console.log('**mapbox click id**',elem.id);
        dispatch(updatePostId(elem.id))
        history.push({
            pathname: "/postread",
            state: { postId: elem.id },
        })
    }
    // postbox??? ???????????? postread??? ???????????????

    return (
        <>
            <ImgContainer id="map"></ImgContainer>
            {isOnOff ? (
                <SlideModal>
                    <Button>
                        <FontAwesomeIcon
                            onClick={() => setisOnOff(false)}
                            icon={faChevronDown}
                        />
                    </Button>
                </SlideModal>
            ) : (
                <SlideModal bottom={"70px;"}>
                    <Button>
                        <FontAwesomeIcon
                            onClick={() => setisOnOff(true)}
                            icon={faChevronUp}
                        />
                    </Button>
                </SlideModal>
            )}
            {isOnOff ? (
                <PostListModal>
                    {!isLoading ? (
                        <LoadingBoxDiv>
                            <LoadingSpinner size={"100%;"} />
                        </LoadingBoxDiv>
                    ) : (
                        <div className="mapModal">
                            <GraphTitleDiv>???????????? ????????????</GraphTitleDiv>
                            <GraphTitle>
                                <GraphTitleDiv2>
                                    ?????? ?????? ?????? ??????
                                </GraphTitleDiv2>
                                <GraphTitleDiv2>
                                    ?????? ?????? vs ???????????????
                                </GraphTitleDiv2>
                            </GraphTitle>
                            <GraphModal>
                                <Doughnut data={data} />
                                <BarGraphFlex>
                                    <BarGraphchild>
                                        <Bar data={data2} />
                                    </BarGraphchild>
                                </BarGraphFlex>
                            </GraphModal>
                            <GraphTitleDiv>?????? ??????</GraphTitleDiv>
                            {postList.map((post) => {
                                return (
                                    // <PostBox onClick={() => console.log(post)}>
                                    <PostBox
                                        className="postbox"
                                        onClick={postBoxHandler}
                                        key={post.id}
                                        id={post.id}
                                    >
                                        <Box className="box">
                                            <PostImg
                                                className="postImage"
                                                src={`${post.post_photo}`}
                                            />
                                            <EmoticonBox>
                                                <IconImg
                                                    src={`/img/icons-write/${post.weather}.png`}
                                                />
                                                <IconImg
                                                    src={`/img/icons-write/${post.wind}.png`}
                                                />
                                                <IconImg
                                                    src={`/img/icons-write/${post.temp}.png`}
                                                />
                                                <IconImg
                                                    src={`/img/codi/${post.outer_id}.png`}
                                                />
                                                <IconImg
                                                    src={`/img/codi/${post.top_id}.png`}
                                                />
                                                <IconImg
                                                    src={`/img/codi/${post.bottom_id}.png`}
                                                />
                                            </EmoticonBox>
                                        </Box>
                                        <Box2>
                                            <PostTitle>{`${post.post_title}`}</PostTitle>
                                            <PostContent>{`${post.post_content}`}</PostContent>
                                        </Box2>
                                    </PostBox>
                                )
                            })}
                        </div>
                    )}
                </PostListModal>
            ) : (
                <></>
            )}
        </>
    )
}
