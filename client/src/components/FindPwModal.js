// 비밀번호 찾기 모달
import React from 'react';
import styled from "styled-components"


const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--modal-bg-color);
  z-index: 200;
`
const Popup = styled.div`
  align-items: center;
  width: 50vw;
  min-width: 300px;
  max-width: 500px;
  height: 40vw;
  min-height: 200px;
  max-height: 300px;
  background-color: var(--modal-confirm-bg);
  font-size: 1.5rem;
  border-radius: 1.5rem;
  text-align: center;

`
const Div1 = styled.div`
  margin: 1rem auto 0 auto;
  height: 2rem;
  width: 90%;
  text-align: end;
`
const Div2 = styled.div`
  p {
    font-size: 1.3rem;
  }

  #info {
    font-size: 1rem;
  }
`
const Div3 = styled.div`
  margin: 1rem 0;
  input {
    margin: 0 auto 1rem auto;
    display: block;
  }
  p {
    font-size: 0.8rem;
  }
`
const Div4 = styled.div`
`
const Button = styled.button`
  font-size: 1.2rem;
  height: 3rem;
  padding: 0 1rem;
  background-color: pink;
  border-radius: 10px;
  &:hover {
    background-color: #ff7f9f;
    color: white;
  }
`

export default function FindPwModal({closeBtn}) {
  const closeButtonClick = () => {
    closeBtn();
  }

  // 비밀번호 입력 같은지 확인
  function isMatch (pwd1, pwd2) {
    return pwd1 === pwd2
  }

  return (
    <Outer>
      <Popup>
        <Div1><button onClick={closeButtonClick}>X</button></Div1>
        <Div2>
          <p>인증이 완료되었습니다.</p>
          <p id="info">새로운 비밀번호를 입력해주세요.</p>
        </Div2>
        <Div3>
        {/* 최소 6자 이상하면서, 알파벳과 숫자 및 특수문자(@$!%*#?&) 는 하나 이상 포함 */}
          <input placeholder="비밀번호 입력"></input>
          <input placeholder="비밀번호 재입력"></input>
          <p>6자 이상, 알파벳과 숫자 포합, 특수문자(@$!%*#?&) 하나 이상 포함</p>
        </Div3>
        <Div4>
          <Button>비밀번호 변경</Button>
        </Div4>
      </Popup>
    </Outer>
  )
}