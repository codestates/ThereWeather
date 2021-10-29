import React, { useState } from "react";
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import ModalConfirm from "../components/ModalConfirm"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { changeIsLogin } from "../actions/index"


const Outer = styled.div`
  background-color: var(--page-bg-color);
  width: 100vw;
  /* height: auto; */
  min-height: 100vh;
  position: relative;
  display: flex;
  padding-top: 200px; // Header.js에 가려져서 추가함
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

  span{
    display: flex;
    margin: 2vh;
    justify-content: center;
    font-size: 1.5rem;
  }

  button{
    color: #336FC9;
    font-size: 1.5rem;
    margin-top: 1vh;
  }
  
  @media screen and (max-width: 1081px) {
    margin: 0 auto;
    margin-top: 4vh;
    width: 50%;
    padding: 0;

    span{
      display: flex;
      margin-top: 2vh;
      justify-content: center;
    }
  }

`
/* 프로필 사진 */
const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  padding: 10px 10px;
  border-radius: 50%;
  background-color: #FFFFFF;
`

/* 비밀번호수정, 탈퇴 */
const ButtonArea = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  text-decoration: none;

  button{
    font-size: 1.2rem;
  }

  @media screen and (max-width: 1081px) {
    width: 50vw;
    align-items: center;
    height: 30vh;
    position: absolute;
    bottom: 0;
  }
`

// 내가 쓴 예보 (grid)
const GridArea = styled.div`
  width: 100vw;
  padding: 2vh 2vw 2vh 7vw;
  display: grid;
  grid-template-columns: 400px 400px 400px;
  grid-template-rows: 200px 400px 400px;

  row-gap: 10px;    /* row의 간격을 10px로 */
  column-gap: 20px;   /* column의 간격을 20px로 */

  .item:nth-child(1) {
    background-color: #FEF9EF;
    border: none;
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }

  div{
    border: 1px solid black;
  }
  div:hover{
    border: 1px solid #A2D2FF;
  }

  .more {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  p{
    font-size: 3rem;
    margin: 0 auto;
    font-weight: bold;
  }
  .moreView{
    font-size: 1.5rem;
    color: #336FC9;
    width: 5vw;
  }

  @media screen and (max-width: 1081px) {
    margin: 0 auto;
    margin-bottom: 7vh;
    padding: 0;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 150px 300px 300px;
    p{
      font-size: 3rem;
    }
    .item{
      margin: 0.5vh;
    }
    .moreView{
      margin-left: 1vw;
      width: 10vw;
    }
  }
`

export default function MyPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isLogin } = useSelector((state) => state.itemReducer)
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [removeUser, setremoveUser] = useState(false);

  const removeUserInfo = () => {
    setIsModalOpen(true)
  }

  const modalYesButtonHandlers = () => {
    //console.log('회원탈퇴 완료');
    const token = JSON.parse(localStorage.getItem("ATOKEN"))
      axios.delete("http://localhost/removeuser", 
      { 
        headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`,
      },
       withCredentials: true })
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



  return (
    <Outer>
      <ProfileArea>
        <ProfileImg src='img/default-user.png'/>
        <span>{'김코딩'}</span>
        <span>성별 : {'남성'}</span>
        <span>나의 위치 : {'서울시 종로구'}</span>
        <button>정보수정</button>
        <ButtonArea>
          <button onClick={() => history.push('/editpassword')}>비밀번호 수정</button>
          <button onClick={removeUserInfo}>회원탈퇴</button>
          {
            isModalOpen === false ? null : (
              <ModalConfirm
                yesHandler={modalYesButtonHandlers}
                noHandler={modalNoButtonHandler}
                closeHandler={modalCloseButtonHandler}
              >
                <p>탈퇴하시겠습니까?</p>
                <p>이유를 선택해 주세요</p>
                <select name="pets" id="pet-select">
                  <option value="">선택</option>
                  <option value="notUseful">사용을 많이 하지 않음</option>
                  <option value="inconvenientDesign">디자인이 불편함</option>
                  <option value="otherOptions">다른 앱을 이용하기 위해</option>
                  <option value="andSoForth">기타</option>
                </select>
              </ModalConfirm>
            )
          }
        </ButtonArea>
      </ProfileArea>

      <GridArea>
        <div className="item more">
          <p>내가 쓴 예보</p>
        </div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
        <button className="moreView" onClick={() => history.push('/mypost')}>더 보기</button>
      </GridArea>
    </Outer>
  )
}