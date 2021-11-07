import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import ModalConfirm from "../components/ModalConfirm"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { changeIsLogin } from "../actions/index"
import GoBackButton from  "../components/GoBackButton";

const Outer = styled.div`
    background-color: var(--page-bg-color);
    width: 100vw;
    /* height: auto; */
    min-height: 100vh;
    position: relative;
    display: flex;
    padding-bottom: 100px;

    @media screen and (max-width: 1081px) {
        flex-direction: column;
    }
`
/* 프로필 정보 */
const ProfileArea = styled.div`
    width: 30%;
    padding: 20vh 1vw 1vh 1vw;
    text-align: center;

    span {
        display: flex;
        margin: 2vh 2vw;
        justify-content: center;
        font-size: 1.5rem;
    }

    button {
        color: #336fc9;
        font-size: 1.5rem;
        margin-top: 1vh;
    }

    @media screen and (max-width: 1081px) {
        border-bottom: 1px solid #aaa;  // 구분선 추가
        margin: 0 auto;
        margin-top: 4vh;
        width: 50%;
        padding: 0 0 3vh 0;

        span {
            display: flex;
            margin-top: 2vh;
            justify-content: center;
        }
    }

    @media screen and (max-width: 375px) {
        padding-bottom: 4vh;
        span{
            font-size: 1rem;
            margin: 1vh 1vw;
        }
        button{
            font-size: 1rem;
        }
    }    
`
/* 프로필 사진 */
const ProfileImg = styled.img`
    width: 200px;
    height: 200px;
    padding: 10px 10px;
    border-radius: 50%;
    background-color: #ffffff;

    @media screen and (max-width: 375px) {
        width: 7rem;
        height: 7rem;
    }
`

/* 비밀번호수정, 탈퇴 */
const ButtonArea = styled.div`
    height: 10vh;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    text-decoration: none;

    button {
        font-size: 1.2rem;
    }

    @media screen and (max-width: 1081px) {
        width: 50vw;
        align-items: center;
        height: 10vh;
        position: absolute;
        bottom: 0;
    }
    @media screen and (max-width: 375px) {
        height: 20vh;
        justify-content: space-between;
        button{
            font-size: 1rem;
        }
    }
`

// 내가 쓴 예보 (grid)
const GridArea = styled.div`
    width: 100vw;
    padding: 2vh 3vw 2vh 5vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 200px 1fr 1fr;

    row-gap: 10px; /* row의 간격을 10px로 */
    column-gap: 20px; /* column의 간격을 20px로 */

    .item:nth-child(1) {
        background-color: #fef9ef;
        border: none;
        grid-column: 1 / 4;
        grid-row: 1 / 2;
    }

    div {
        background-color: rgba(255, 255, 255, 0.5); // 추가
    }
    div:hover {
        border: 1px solid #a2d2ff;
    }
    img{
        width: 100%;
        height: 100%;
    }
    .more {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
    p {
        font-size: 3rem;
        margin: 0 auto;
        font-weight: bold;
    }
    .moreView {
        font-size: 1.5rem;
        color: #336fc9;
        width: 5vw;
    }

    @media screen and (max-width: 1380px) {
        .moreView {
            font-size: 1.4rem;
            width: 6vw;
        }
    }

    @media screen and (max-width: 1081px) {
        margin: 0 auto;
        margin-bottom: 10vh;
        padding: 0;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 150px 300px 300px;
        row-gap: 5px;
        column-gap: 3px;

        p {
            font-size: 3rem;
        }
        .item {
            margin: 0.5vh;
        }
        .moreView {
            width: 7vw;
        }
    }

    @media screen and (max-width: 375px) {
        padding-left: 2vw;
        padding-right: 2vw;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 80px 150px 150px 150px;
        .item:nth-child(1) {
            background-color: #fef9ef;
            border: none;
            grid-column: 1 / 3;
            grid-row: 1 / 2;
        }
        p {
            font-size: 1.8rem;
        }
        .moreView {
            font-size: 1rem;
            width: 15vw;
            height: 3rem;
        }
    }
`
let url = process.env.REACT_APP_LOCAL_URL

export default function MyPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { isLogin } = useSelector((state) => state.itemReducer)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [removeUser, setremoveUser] = useState(false)
    if (!url) {
        url = "https://thereweather.space"
    }

    const [currentPosts, setcurrentPosts] = useState([])
    // 게시물 데이터 조회
    useEffect(() => {
        axios({
            url: url + "/mypage",
            method: "get",
            withCredentials: true,
        }).then((res) => {
            setcurrentPosts(res.data)
            console.log(currentPosts);
        }) 
    }, [])

    const removeUserInfo = () => {
        setIsModalOpen(true)
    }

    const modalYesButtonHandlers = () => {
        //console.log('회원탈퇴 완료');
        const token = JSON.parse(localStorage.getItem("ATOKEN"))
        axios
            .delete(url + "/removeuser", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `token ${token}`,
                },
                withCredentials: true,
            })
            .then((res) => {
                localStorage.clear(token)
                dispatch(changeIsLogin(false))
                history.push("/")
            })
        //setIsModalOpen(false)
    }

    const modalNoButtonHandler = () => {
        setIsModalOpen(false)
    }
    const modalCloseButtonHandler = () => {
        setIsModalOpen(false)
    }

    // 게시물사진 클릭했을 때
    const postClickHandler = () => {
        //test
        history.push("/postread")
        // 해당 게시물의 id, user_id
    }

    // 더보기
    const moreViewHandler = () => {
        history.push("/mypost")

    }

    return (
        <Outer>
            <GoBackButton/>
            <ProfileArea>
                <ProfileImg src="img/default-user.png" />
                <span>{"김코딩"}</span>
                <span>성별 : {"남성"}</span>
                <span>나의 위치 : {"서울시 종로구"}</span>
                <button>정보수정</button>
                <ButtonArea>
                    <button onClick={() => history.push("/editpassword")}>
                        비밀번호 수정
                    </button>
                    <button onClick={removeUserInfo}>회원탈퇴</button>
                    {isModalOpen === false ? null : (
                        <ModalConfirm
                            yesHandler={modalYesButtonHandlers}
                            noHandler={modalNoButtonHandler}
                            closeHandler={modalCloseButtonHandler}
                        >
                            <p>탈퇴하시겠습니까?</p>
                            <p>이유를 선택해 주세요</p>
                            <select name="pets" id="pet-select">
                                <option value="">선택</option>
                                <option value="notUseful">
                                    사용을 많이 하지 않음
                                </option>
                                <option value="inconvenientDesign">
                                    디자인이 불편함
                                </option>
                                <option value="otherOptions">
                                    다른 앱을 이용하기 위해
                                </option>
                                <option value="andSoForth">기타</option>
                            </select>
                        </ModalConfirm>
                    )}
                </ButtonArea>
            </ProfileArea>

            <GridArea>
                <div className="item more">
                    <p>내가 쓴 예보</p>
                </div>
                <div className="item" onClick={postClickHandler}>
                    <img src={`${process.env.PUBLIC_URL}img/sky.png`} alt="weather"/>
                </div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                <div className="item"></div>
                {}
                <button
                    className="moreView"
                    onClick={moreViewHandler}
                >
                    더 보기
                </button>
            </GridArea>
        </Outer>
    )
}
