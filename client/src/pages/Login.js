import { useState } from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

/*
  TODO
  [x] 여러개의 Input 상태 관리
  [] 유효성 검사
    - [x] ul, li 추가
    - [] 함수로 구현
      - [x] input이 없는 경우
      - [] 등록되지 않은 정보인 경우 (버튼과 연결?)
        - [] 악시오스
        - [] 모달? alert? 페이지에 렌더링?
*/

const Outer = styled.section`
    position: relative;
    width: 100vw;
    height: var(--mobile-page-height);
    background-color: var(--page-bg-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    @media screen and (min-width: 1081px) {
        height: calc(100vh - 125px);
    }
`

const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const InputAndTitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;

    h3 {
        font-size: 1.4rem;
        margin: 1rem;
        font-weight: bold;
    }
`

const InputText = styled.input`
    min-width: 150px;
    width: 30vw;
    font-size: 1.2rem;
    padding: 0.5rem;
`

const ValidationListBox = styled.ul`
    list-style: none;
    padding: 0 1.5rem;
    font-size: 1rem;

    li {
        height: 1.2rem;
        padding: 0 1.5rem;
        color: var(--font-validation-negative);
    }
`

const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 3rem auto;
`

const Button = styled.button`
    width: 50vw;
    min-width: 100px;
    max-width: 300px;
    margin: 1rem;
    padding: 0.8rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: white;
    background-color: ${(props) => (props.google ? "#EA4335" : "#419300")};
    border-radius: 1rem;

    > span {
        margin: 0.25rem;
    }
`

export default function Login() {
    // input 상태 관리, 유효성 검사
    const [idInput, setIdInput] = useState("")
    const [pwInput, setPwInput] = useState("")
    const [idInputMessage, setIdInputMessage] = useState("아이디를 입력하세요.")
    const [pwInputMessage, setPwInputMessage] = useState("비밀번호를 입력하세요.")

    const idOnChangeHanlder = (e) => {
        setIdInput((prevInput) => e.target.value)

        if (e.target.value.length === 0) {
            setIdInputMessage((prevText) => "아이디를 입력하세요.")
        } else {
            setIdInputMessage((prevText) => "")
        }
    }

    const pwOnChangeHandler = (e) => {
        setPwInput((prevInput) => e.target.value)

        if (e.target.value.length === 0) {
            setPwInputMessage((prevText) => "비밀번호를 입력하세요.")
        } else {
            setPwInputMessage((prevText) => "")
        }
    }

    const loginButtonHandler = (e) => {
        if (idInput.length === 0 && pwInput.length === 0) {
            console.log("모든 항목을 입력해야 합니다.")
        }
    }

    const googleLoginButtonHandler = (e) => {
        console.log("구글 로그인 버튼 동작 확인")
    }

    return (
        <Outer className="loginPageComponent">
            <h2>로그인</h2>
            <div className="Login--center">
                <StyledArticle className="id">
                    <InputAndTitle className="inputIdSection">
                        <h3>아이디</h3>
                        <InputText type="text" name="idInput" placeholder="아이디를 입력하세요" value={idInput} onChange={idOnChangeHanlder} />
                    </InputAndTitle>
                    <ValidationListBox className="idValidationList">
                        <li>{idInputMessage}</li>
                    </ValidationListBox>
                </StyledArticle>

                <StyledArticle className="password">
                    <InputAndTitle className="inputPwSection">
                        <h3>비밀번호</h3>
                        <InputText type="password" name="pwInput" placeholder="비밀번호를 입력하세요" value={pwInput} onChange={pwOnChangeHandler} />
                    </InputAndTitle>
                    <ValidationListBox className="pwValidationList">
                        <li>{pwInputMessage}</li>
                    </ValidationListBox>
                </StyledArticle>
            </div>

            <Buttons className="login--buttons">
                <Button onClick={loginButtonHandler}>로그인</Button>

                {/* 소셜로그인 */}
                <Button onClick={googleLoginButtonHandler} google>
                    <FontAwesomeIcon icon={faGoogle} />
                    <span>구글 로그인</span>
                </Button>
            </Buttons>
        </Outer>
    )
}
