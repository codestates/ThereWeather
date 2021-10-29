import styled from "styled-components"
import { useState, useEffect } from "react"

// import { Upload, SunFill, CloudyFill, CloudRainFill, Snow, Thermometer, ThermometerHalf, ThermometerHigh } from "@styled-icons/bootstrap"

/* TODO
  [] 업로드된 이미지의 크기 정리를 어떻게 할지
    - 가로, 세로 비율 유지 방법
  [] 날씨 버튼
    - 버튼 아이콘, 스타일
      - [x] 아이콘을 png 파일로 대체하기
      - [x] background-color, padding, height, width
      - [x] button type
    - 필터링을 위한 post 요청
      - [x] 버튼에 name 주기, name을 모으는 state 변수 (배열)
      - [] 등록버튼 누를 때 post 요청에 실어 보낼 수 있을듯
      - [x] 선택된 버튼의 스타일 바꾸기
  [x] 인풋 텍스트 내부의 텍스트 정렬 방법 -> textarea 사용
*/

const Outer = styled.div`
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    /* min-height: var(--mobile-page-height); */
    min-height: 100vh;
    padding: 3rem auto;
    background-color: var(--page-bg-color);
    padding-top: 200px; // Header.js에 가려져서 추가
    padding-bottom: 50px; // MenuBar.js에 가려져서 추가

    @media screen and (min-width: 1081px) {
      flex-direction: row;
      height: var(--desktop-page-height);
      padding: 2rem;
    }
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: ${props => props.round ? '50%' : null};
    background-color: var(--button-bg-normal);
    font-size: 1.25rem;
    padding: ${props => props.round ? '.5rem .5rem' : '.5rem 2rem'};
    margin: ${props => props.round ? '.5rem' : '1rem'};

    & > img {
      height: 1.5rem;
      width: 1.5rem;
    }
`

const PictureSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;

    & > img {
      width: 80%;
      height: 80%;
    }

    @media screen and (min-width: 1081px) {
        justify-content: space-around;
        width: 40vw;
    }
`

const DesktopRight = styled.section`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 1081px) {
        justify-content: space-around;
        width: 40vw;
    }
`

const ButtonsAndSelects = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem;
`

const FlexColumnCenter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;

    & > p {
        margin: 0.5rem;
        font-weight: bold;
    }
`

const FilteringButtons = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const FilteringBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid grey;
  border: ${props => props.active ? '3px solid black' : '3px solid grey'};
  height: 2rem;
  width: 2rem;
  margin: .25rem;
  background-color: white;
  border-radius: .3rem;

  img {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const TextSection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 2rem auto;

    & > .submitButton {
        margin: 2rem auto;
    }
`

const SelectArea = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;

    & > select {
        padding: 0.3rem;
        margin: auto 0.5rem;
    }
`

const WriteInput = styled.textarea`
    width: 80vw;
    min-width: 250px;
    height: 20vh;
    text-align: justify;
    line-height: 1.2rem;
    font-size: 1.2rem;
    margin: 1rem;
    padding: 1rem;

    @media screen and (min-width: 1081px) {
        width: 40vw;
        max-width: 800px;
    }
`

export default function Write() {
  // img src 상태
    // 테스트용 이미지
  const imageUrl = {
    normalLarge: "https://dummyimage.com/1000x750/7e57c2/fff.png&text=dummy(1000x750)",
    normalSmall: "https://dummyimage.com/300x180/000/fff&text=300x180",
    narrowLong: "https://dummyimage.com/400x800/857285/fff.png&text=400x800",
    wideShort: "https://dummyimage.com/800x300/857285/fff.png&text=800x300",
    realImageNormal: "https://cdn.pixabay.com/photo/2020/11/08/13/28/tree-5723734_1280.jpg",
    realImageLong: "https://cdn.pixabay.com/photo/2021/09/03/02/08/skyscrapers-6594833_1280.png"
  }

  // state 변수
  const [ photoSrc, setPhotoSrc ] = useState(imageUrl.realImageNormal);

  // 날씨 버튼
  const weathers = ['sunny', 'cloudy', 'rainy', 'snowy', 'breezy', 'windy', 'strong', 'cold', 'hot'];
    // 날씨 필터링용 state
  const [ clickedWeatherButtons, setClickedWeatherButtons ] = useState([]);
    // 스타일 적용 state
  const [ isFilteringBtnActive, setIsFilteringBtnActive ] = useState({
    sunny: false,
    cloudy: false,
    rainy: false,
    snowy: false,
    breezy: false,
    windy: false,
    strong: false,
    cold: false,
    hot: false
  });

    // 날씨 버튼 handler
  const weatherBtnHandler = (e) => {
    if (e.target.nodeName === 'ARTICLE') return;
    let elem = e.target;

    while (!elem.classList.contains('weatherButton')) {
      elem = elem.parentNode;
      console.log('while - work?', elem.name);

      if (elem.nodeName === 'ARTICLE') {
        elem = null;
        return;
      }
    }

    if (elem && clickedWeatherButtons.includes(elem.name)) {
      setClickedWeatherButtons(arr => [...arr.filter(btnName => btnName !== elem.name)]);
      setIsFilteringBtnActive(btnListObj => {
        return {...btnListObj, [elem.name]: false};
      })
    } else {
      setClickedWeatherButtons(arr => [...arr, elem.name]);
      setIsFilteringBtnActive(btnListObj => {
        return {...btnListObj, [elem.name]: true};
      })
    }
  }

  /* clickedWeatherButtons 상태 확인용 */
  // useEffect (() => { 
  //   console.log('***clickedWeatherButtons: useEffect***', clickedWeatherButtons);
  // },[clickedWeatherButtons]);

  // 상의 더미데이터 (state 변수가 필요하게 될까?)
  const clothesTop = [
    ["default", "상의 선택"],
    ["tshirts", "티셔츠"],
    ["shirts", "셔츠"]
  ];

  // 하의 더미데이터
  const clothesBottom = [
    ["default", "하의 선택"],
    ["shorts", "반바지"],
    ["pants", "긴 바지"]
  ];

  // select 상태 관리 & 이벤트 핸들러
  const [ selectValueTop, setSelectValueTop ] = useState("default");
  const [ selectValueBottom, setSelectValueBottom ] = useState("default");

  const selectTopHandler = (e) => {
    setSelectValueTop(e.target.value);
  }

  const selectBottomHandler = (e) => {
    setSelectValueBottom(e.target.value);
  }

  // 사진 업로드 버튼 이벤트
  const photoUploadButtonHandler = (e) => {
    console.log('사진 업로드 버튼 동작 확인');
    // TODO
      // multer 연결
      // axios 요청
      // 이미지 src 바꾸기
        // setPhotoSrc(res로 받은 src);
  }

  // textarea state & handler
  const [ postText, setPostText ] = useState('');
  const postTextHandler = (e) => {
    setPostText(e.target.value);
  }

  // 등록버튼 이벤트
  const submitButtonHandler = (e) => {
    console.log('등록버튼 동작 확인');
    // TODO
      // axios.post
      // 페이지 이동 : '글 읽기' 페이지로?
  }

  return (
    <Outer className="writePage">
      <PictureSection className="pictureUploadSection writePageLeft">
        <img src={photoSrc} alt="dummy" />
        <Button className="uploadButton" onClick={photoUploadButtonHandler} round>
          <img src={`${process.env.PUBLIC_URL}img/icons-write/upload.png`} />
        </Button>
      </PictureSection>

      <DesktopRight className="writePageRight">
        <ButtonsAndSelects className="buttonsAndSelects">
          <FlexColumnCenter className="smallSection">
            <p>날씨를 선택하세요.</p>
            <FilteringButtons className="filteringButtons" onClick={weatherBtnHandler}>
              {weathers.map((weather, idx) => {
                return (
                  <FilteringBtn
                    key={idx}
                    name={weather}
                    className="weatherButton"
                    type="button"
                    active={isFilteringBtnActive[weather]}
                  >
                    <img src={`${process.env.PUBLIC_URL}img/icons-write/${weather}.png`} />
                  </FilteringBtn>
                );
              })}
            </FilteringButtons>
          </FlexColumnCenter>

          <FlexColumnCenter className="smallSection">
            <p>의상을 선택하세요.</p>
            <SelectArea>
              <select className="top" value={selectValueTop} onChange={selectTopHandler}>
                {
                  clothesTop.map((elem, idx) => {
                    return (<option value={elem[0]} key={idx}>{elem[1]}</option>);
                  })
                }
              </select>
              <select className="bottom" value={selectValueBottom} onChange={selectBottomHandler}>
                {
                  clothesBottom.map((elem, idx) => {
                    return (<option value={elem[0]} key={idx}>{elem[1]}</option>);
                  })
                }
              </select>
            </SelectArea>
          </FlexColumnCenter>
        </ButtonsAndSelects>

        <TextSection>
          <WriteInput type="text" placeholder="글을 입력하세요." value={postText} onChange={postTextHandler} />
          <Button className="submitButton" onClick={submitButtonHandler}>등록</Button>
          {postText}
        </TextSection>
      </DesktopRight>
    </Outer>
  );
}