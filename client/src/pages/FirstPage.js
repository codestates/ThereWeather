import { useState, useEffect } from "react";
import styled from "styled-components";
import One from "../components/FirstPage/One";
import Two from "../components/FirstPage/Two";
import Three from "../components/FirstPage/Three";
import Four from "../components/FirstPage/Four";

// TODO
 // 각 컴포넌트의 offset 프롭스 적용
 // 아래로 갈수록 locationY / (assignedHeight + a)
  // 더하기? 곱하기?

const FirstPageContainer = styled.div`
  background: linear-gradient(#fff, #FEF9EF, #FFF5DC, #D7F9FF, #AAF2FF);
`;

export default function FirstPage() {
  const assignedHeight = window.innerHeight * 0.9;
  console.log(assignedHeight);
  const [ locationY, setLocationY ] = useState(0);
  console.log(locationY);
  const scrollHandler = () => {
    setLocationY(window.pageYOffset);
  }

  useEffect(()=>{
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  return (
    <FirstPageContainer className="firstPageWhole">
      <One opacityOffset={`${ locationY / assignedHeight}`} />
      <Two
        opacityOffsetTitle={`${ locationY / (assignedHeight * 2)}`}
        opacityOffsetOne={`${ locationY / (assignedHeight * 2.2)}`}
        opacityOffsetTwo={`${ locationY / (assignedHeight * 3.5)}`}
      />
      <Three />
      <Four />
    </FirstPageContainer>
  );
}