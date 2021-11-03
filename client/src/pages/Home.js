import React, { useState, useEffect } from "react";
import styled from "styled-components"
import axios from "axios";
// import Loading from "./Loading";

const HomeContainer = styled.div`
display: flex;
flex-direction: row;
background-color: var(--page-bg-color);
`;

const LeftContainer1 = styled.div`
display: flex;
gap: 0.1rem;
flex-direction: row;
width: 50vw;
flex-wrap: wrap;
.weatherInfo {
    text-align: center;
  }
.codiInfo {
  text-align: center;
}
`;


const LeftNav1 = styled.nav`
    text-align: center;
    flex-basis: 310px;
    flex-grow: 1;
    margin: 5px;
    padding: 10px;
`

const LeftNav2 = styled(LeftNav1)``

const LeftNav3 = styled(LeftNav1)``

const RightContainer = styled.div`
  display: grid;
  height:100vh;
  width: 80vw;
  grid-template-rows: 0.5fr 2.3fr 2.3fr 2.3fr 2.3fr;
  grid-template-columns: 1fr 1fr;
  grid-area: 
  "nav nav"
  "main main"
  "main main"
  ;
  grid-gap:0.1rem;
  transition: all 0.01s ease-in-out;
  //(max-width: 1081px)
  @media (max-width: 600px) {
    grid-template-rows: 0.5fr 0.5fr 1.5fr 1.5fr 1.5fr 1.5fr;
    grid-template-columns: 1fr;
    grid-template-areas:
      "nav"
      "main"
  }
  .userPost {
    text-align: center;
  }
`;


const RightNav1 = styled.nav`
    margin-top: 0.8rem;
    text-align: center;
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "nav nav";
    grid-column: 1 / 3;
    grid-row: 1 / 2;
`
// const RightNav2 = styled(RightNav1)``;

const url = process.env.REACT_APP_LOCAL_URL;

export default function Home() {
    // const dispatch = useDispatch()
    // const { userInfo } = useSelector((state) => state.itemReducer)
    // dispatch(changeUser(axiosData))
    const [weatherData, setWeatherData] = useState([])
  useEffect(() => {
    axios.get(url)
    .then((res) =>  
     //console.log(res)
      {
        const { xLocation, yLocation, date, weatherType, weatherValue } = res.data.weatherInfo
        setWeatherData({ xLocation, yLocation, date, weatherType, weatherValue })
      }
    )
  }, [])
   
    // axios.get(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${process.env.REACT_APP_WH_KEY}&numOfRows=10&pageNo=1&base_date=20211102&base_time=1400&nx=55&ny=127`)
    // .then(res => console.log(res))

   
      // axios.get(url)
      // .then((response) => {
      //   console.log(response)
      // })
  


    function getCurrentDate(){ //'20211102' 형식 
      let date = new Date();
      let year = date.getFullYear().toString();
      let month = date.getMonth() + 1;
      month = month < 10 ? '0' + month.toString() : month.toString();
      let day = date.getDate();
      day = day < 10 ? '0' + day.toString() : day.toString();
      return year + month + day ;
    }
    
    function getFormatTime(){ //'1640' 형식
      let date = new Date();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      hour = hour >= 10 ? hour : '0' + hour;
      minutes = minutes >= 10 ? minutes : '0' + minutes; 
      return hour + '' + minutes;
    }


    return (
        <div className="homecontainer">
            {/* <Loading /> */}
            <HomeContainer>
                <LeftContainer1>
                    <LeftNav1>
                        00구 주민예보
                        <div className="weatherInfo"></div>
                    </LeftNav1>
                    <LeftNav2>
                        기상청 일기예보
                        <div className="weatherInfo">
                        <ul>
                          <li>x위치:{weatherData.xLocation}</li>
                          <li>y위치:{weatherData.yLocation}</li>
                          <li>날짜:{weatherData.date}</li>
                          <li>날씨타입:{weatherData.weatherType}</li>
                          <li>날씨:{weatherData.weatherValue}</li>
                        </ul> 
                        </div>
                    </LeftNav2>
                    <LeftNav3>
                        00구 날씨 기반 추천 코디
                        <div className="codiInfo"></div>
                    </LeftNav3>
                </LeftContainer1>

                <RightContainer>
                    <RightNav1>00구 주민예보글</RightNav1>
                    {/* <RightNav2>오른쪽2</RightNav2> */}
                    <div className="userPost">1</div>
                    <div className="userPost">2</div>
                    <div className="userPost">3</div>
                    <div className="userPost">4</div>
                    <div className="userPost">5</div>
                    <div className="userPost">6</div>
                    <div className="userPost">7</div>
                    <div className="userPost">8</div>
                </RightContainer>
            </HomeContainer>
        </div>
    )
}
