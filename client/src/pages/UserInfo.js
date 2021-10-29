// 로그인 상태에서 뜨는 화면
import styled from "styled-components"

const Outer = styled.div`
  margin: 0 auto;
  border: 1px solid red;
  background-color: #FEF9EF;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`
const InfoBoxes = styled.div`
  margin: 0 auto;
`

const InfoBox = styled.div`
  margin: 0 auto;
  background-color: #FFFFFF;
  border-radius: 10px;
  width: 40vw;
  height: 10vh;
  text-align: center;
  p {
    font-size: 3rem;
    margin: 0;
    line-height: 10vh;
  }
  &:nth-child(2){
    margin-top: 3vh;
  }
  &:hover {
    background-color: #F4B567;
    color: #FFFFFF;
  }

  @media screen and (max-width: 1081px) {
    /* border: 1px solid green; */
  }
`

export default function UserInfo() {
  return (
    <Outer>
      <InfoBoxes>
        <InfoBox><p>마이페이지</p></InfoBox>
        <InfoBox><p>로그아웃</p></InfoBox>
      </InfoBoxes>
    </Outer>
  )
}
