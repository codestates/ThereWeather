import React, { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { changeMapPage } from "../actions/index"
import FindPwModal from "../components/FindPwModal"

const Outer = styled.div`
    width: 100%;
    height: 100%;
`

const Form = styled.div`
    width: 400px;
    height: auto;
    margin: 4rem auto 0 auto;

    #title {
        font-size: 1.5rem;

    }
`

const Div1 = styled.div`
    margin-bottom: 2rem;
    text-align: center;
`
const Div2 = styled.div`
    ul {
        list-style: none;
    }
    li {
        margin: 1rem 0;
        display: flex;
        padding: 0.5rem 0;
    }
    p {
        width: 100px;
    }
    input {
        width: 200px;
    }
    button {
        margin-left: 1rem;
        width: 4rem;
        background-color: pink;
        &:hover {
            background-color: #ff7f9f;
            color: white;
        }
    }
`
const Button = styled.button`
    display: block;
    margin: 2rem auto 0 auto;
    width: 8rem;
    height: 2rem;
    font-size: 1rem;
    background-color: pink;
        &:hover {
            background-color: #ff7f9f;
            color: white;
    }
`

let url = process.env.REACT_APP_LOCAL_URL

export default function FindPassword(){
    const history = useHistory()
    const dispatch = useDispatch()
    if (!url) {
        url = "https://thereweather.space/api"
    }
    const [isOpen, setIsOpen] = useState(false)
    
    useEffect(() => {
        dispatch(changeMapPage(false))
    }, [])
    
    const closeModal = () => {
        setIsOpen(false)
    }

    const [inputFindInfo, setInputFindInfo] = useState({
        findId: "",
        authEmail: "",
        authCode: "",
    })
    
    const ChangeHanlder = (key) => (e) => {
        setInputFindInfo({
            ...inputFindInfo,
            [key]: e.target.value
        })
    }

    const [inputNewPw, setInputNewPw] = useState({
        newPw: "",
        againPw: "",
    })

    const ChangeHanlderPw = (key) => (e) => {
        setInputNewPw({
          ...inputNewPw,
          [key]: e.target.value
        })
    }
    
    function sendEmail() {
        //console.log("이메일 전송 버튼")
        if(inputFindInfo.findId && !inputFindInfo.authCode){
          axios({
            url: url + "/users/findpw",
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              temporary_id: inputFindInfo.findId,
              email: inputFindInfo.authEmail
            },
            withCredentials: true
          })
          .then((res) => {
              console.log(res)
              if(res.data === "no results"){
                  alert("가입된 정보가 아닙니다.")
              }
              else if(res.data.status === "success"){
                  alert("인증메일을 발송하였습니다. 50초내로 확인해주세요:)")
              }else{
                  alert("인증메일 발송에 실패하였습니다.")
              }   
          })
        }else{
          alert("닉네임과 이메일을 입력해주세요.")
        }
      }

      function verification() {
        //console.log("인증코드 버튼")
        axios({
          url: url + "/users/auth",
          method: "put",
          headers: {
            "Content-Type": "application/json", 
          },
          data: {
            temporary_id: inputFindInfo.findId,
            email: inputFindInfo.authEmail,
            code: inputFindInfo.authCode
          },
          withCredentials: true
        })
        .then((res) => {
          console.log(res.data)
          if(res.data === true){ 
              alert("메일 인증 되었습니다.")
          }else{
              alert("인증코드가 맞지 않습니다. 다시 확인해주세요:)")
          }
        })
      }
      

    //   function findAccountPw() {
    //     //console.log("비밀번호 찾기 버튼")
    //     if(inputFindInfo.findId && inputFindInfo.authEmail && inputFindInfo.authCode){
    //       //console.log("두둥탁")
    //       axios({
    //           url: url + "/findpassword",
    //           method: "post",
    //           headers: {
    //               "Content-Type": "application/json",
    //             },
    //           data: {
    //             user_id: inputFindInfo.findId,
    //             email: inputFindInfo.authEmail,
    //           },
    //           withCredentials: true
    //       })
    //       .then((res) => {
    //           //닉네임, 아이디가 콘솔에 찍힙니닷 
    //           console.log("헤이헤이",res.data)
    //         //   alert(res.data.nickName)
    //       })
    //      }else{
    //          alert("위 모두 사항을 입력해주세요.")
    //      }
    //   }

      function setNewPassword() {
        console.log("비밀번호 찾기 버튼")
        setIsOpen(true)
        if(inputFindInfo.findId && inputFindInfo.authEmail && inputFindInfo.authCode){
            //console.log("두둥탁")
            axios({
                url: url + "/findpassword",
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                  },
                data: {
                  newPw: inputNewPw.newPw,
                  againPw: inputNewPw.againPw,
                },
                withCredentials: true
            })
            .then((res) => {
                //닉네임, 아이디가 콘솔에 찍힙니닷 
                console.log("헤이헤이",res.data)
              //   alert(res.data.nickName)
            })
           }else{
               alert("위 모두 사항을 입력해주세요.")
           }

    }



    return (
        <Outer>
            <Form>
                <Div1>
                    <p id="title">비밀번호 찾기</p>
                    <p>이메일 인증</p>
                </Div1>

                <Div2>
                    <ul>
                        <li>
                            <p>아이디</p>
                            <input type="text" onChange={ChangeHanlder("findId")}></input>
                        </li>
                        <li>
                            <p>이메일</p>
                            <input type="text" onChange={ChangeHanlder("authEmail")}></input>
                            <button onClick={sendEmail}>인증요청</button>
                        </li>
                        <li>
                            <p>인증코드</p>
                            <input type="text" onChange={ChangeHanlder("authCode")}></input>
                            <button onClick={verification}>인증하기</button>
                        </li>
                    </ul>
                </Div2>
                <Button onClick={setNewPassword}>비밀번호 재설정</Button>
                {isOpen?
                    <FindPwModal
                        closeBtn={closeModal}
                    />
                    : null                    
                }
            </Form>
        </Outer>
    )
}