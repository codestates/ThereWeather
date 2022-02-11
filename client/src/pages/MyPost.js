import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { userPosts, updatePostId, curPageAction } from "../actions/index";
// UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE
import GoBackButton from "../components/GoBackButton";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //리액트에서 사용가능하게 해줌
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons"; //내가 사용할 아이콘을 불러오기

const Outer = styled.div`
  position: relative;
  background-color: var(--page-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 99.3vw;
  min-height: 100vh;
  padding: 2rem;

  h2 {
    align-self: flex-start;
    margin: 2rem 0;
    font-family: "Gowun Dodum", sans-serif;
  }

  button {
    font-size: 1.5rem;
    font-family: "Gowun Dodum", sans-serif;
  }

  @media screen and (min-width: 1500px) {
    // 제일 큰 사이즈
    padding-left: 3vh;
    padding-right: 3vh;
  }
  @media screen and (max-width: 375px) {
    padding-top: 2vh;
  }
  @media screen and (max-width: 1081px) {
    // 1080이하
  }
`;

// 내가 쓴 글 (grid)
const GridArea = styled.div`
  // border: 1px solid blue;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 300px 300px;
  grid-gap: 1.5rem;
  min-height: 70vh;
  margin: 1rem;
  p {
    font-size: 28px;
    font-family: "Gowun Dodum", sans-serif;
  }

  .postItem {
    background-color: rgba(255, 255, 255, 0.6);
    display: flex;
  }
  .postItem:hover {
    border: 1px solid #d5d8dc;
  }
  @media screen and (min-width: 2100px) {
    height: 50vh;
    width: 300px;
  }
  @media screen and (max-width: 1081px) {
    padding-left: 5vw;
    padding-right: 5vw;
    height: auto;
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (max-width: 600px) {
    padding-left: 2vw;
    padding-right: 2vw;
    p {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 375px) {
    height: auto;
  }
`;
const FlexArea = styled.div`
  display: flex;
  flex-direction: column;
`;
const FlexArea2 = styled.div`
  display: flex;
  flex-direction: row;
`;
const FlexArea3 = styled.div`
  display: flex;
  flex-direction: row;
`;
const PhotoArea = styled.div`
  width: 300px;
  height: 300px;
`;
const FSArea = styled.div`
  margin: 5px;
  & :hover {
    color: red;
  }
`;

// 게시물 사진
const PostImg = styled.img`
  // border: 1px solid red;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  @media screen and (min-width: 2100px) {
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: 1081px) {
    // 이미지 크기 수정 필요
  }
`;

//   @media screen and (max-width: 1081px) {
//     padding: 1vh 2vw 2vh 2vw;
//     font-size: 1.5rem;
//   }
//   @media screen and (max-width: 375px) {
//     font-size: 1rem;
//     padding-left: 3vw;
//   }
// `

// 페이지네이션
const Page = styled.div`
  display: flex;
  justify-content: center;
  li {
    /* margin: 3px; */
    list-style: none;
    padding: 3px;
    /* border: 1px solid red; */
  }
  button {
    margin: 0 1vw;
    padding: 1rem 1.5rem;
    border-radius: 50%;
  }
  button:focus {
    background-color: var(--modal-bg-color);
  }
  #prev,
  #next {
    background: none;
  }
  @media screen and (max-width: 1081px) {
    margin-top: 10rem;
    padding-bottom: 5rem;
  }

  @media screen and (max-width: 375px) {
    margin-top: 3rem;
    padding-bottom: 3rem;
    li {
      /* margin: 0 1vw; */
      /* margin: 1vh; */
      padding: 0;
    }
    button {
      /* margin: 0 1.5vw; */
      font-size: 1.5rem;
      margin: 0;
      padding: 1px 7px;
    }
  }
`;
const CurPage = styled.button`
  color: pink;
  margin: 5px;

  // width: 30px;
`;
const Button1 = styled.button`
  margin: 5px;
  color: black;
  &:hover {
    margin: 5px;
    color: red;
  }
`;

let url = process.env.REACT_APP_LOCAL_URL;
if (!url) url = "https://thereweather.space/api";

export default function MyPost() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    start,
    end,
    current,
    isLogin,
    userInfo,
    postInfo,
    readPostId,
    curPage,
  } = useSelector((state) => state.itemReducer);
  const [listLength, setListLength] = useState([]);
  //배열의 총 길이만 담고있는 변수
  const [currentPosts, setcurrentPosts] = useState([]);
  //현재 포스트를 모두 담고 있는 변수
  //   const [curPage, setCurPage] = useState(1);
  //현재 페이지
  const [dividNum, setDividNum] = useState(6);
  //한페이지에 보여줄 포스트의 개수
  useEffect(() => {
    axios({
      url:
        url +
        `/mypost?searchID=${userInfo.user_id}&page=${curPage}&capa=${dividNum}`,
      method: "get",
      withCredentials: true,
    }).then((res) => {
      setListLength(res.data.length);
      setcurrentPosts(res.data.data);
      dispatch(userPosts(res.data));
    });
  }, [userInfo]);

  useEffect(() => {
    axios({
      url:
        url +
        `/mypost?searchID=${userInfo.user_id}&page=${curPage}&capa=${dividNum}`,
      method: "get",
      withCredentials: true,
    }).then((res) => {
      setListLength(res.data.length);
      setcurrentPosts(res.data.data);
      dispatch(userPosts(res.data));
    });
  }, [curPage]);

  // // 페이지네이션 시작
  // const [currentPage, setCurrentPage] = useState(1)
  // // 1페이지로 시작
  // const itemsPerPage = 8
  // // 한 페이지에 8개씩 보여준다
  // const lastIdx = currentPage * itemsPerPage
  // const firstIdx = lastIdx - itemsPerPage
  // const slicedData = (dataArr) => {
  //     return dataArr.slice(firstIdx, lastIdx)
  // }
  // // 페이지네이션 끝

  //게시물의 총 수량

  // 총 페이지 수 = Math.ceil(전체 개수/ 한 페이지에 나타낼 데이터 수);

  // 화면에 보여질 페이지 그룹 = Math.ceil(현재 페이지/ 한 화면에 나타낼 페이지 수);
  // const curPage = Math.ceil(1 / 10)
  // 화면에 보여질 첫번째 페이지
  // 화면에 보여질 마지막 페이지

  // 게시물사진 클릭했을 때
  const postClickHandler = (e) => {
    let elem = e.target;
    while (!elem.classList.contains("postItem")) {
      elem = elem.parentNode;
      if (!elem.classList.contains("myPostList")) {
        break;
      }
    }

    dispatch(updatePostId(elem.id));
    history.push({
      pathname: "/readpost",
      state: { postId: elem.id },
    });

  return (
    <Outer className="MyPostPage">
      <div>
        <GoBackButton className="gobackButton" />
        <h2>내가 쓴 게시물</h2>
      </div>

      {/* <GridArea className="myPostList">
                {slicedData(currentPosts).map((el) => (
                    <div
                        className={["postItem"]}
                        id={el.id}
                        onClick={postClickHandler}
                        key={el.id}
                    >
                        <PostImg src={el.post_photo} alt="posts" />
                    </div>
                ))}
            </GridArea> */}
      <FlexArea>
        <FlexArea3>
          {currentPosts.slice(0, 3).map((el) => (
            <PhotoArea
              className={["postItem"]}
              id={el.id}
              key={el.id}
              onClick={postClickHandler}
            >
              <PostImg src={el.post_photo} alt="posts" />
            </PhotoArea>
          ))}
        </FlexArea3>
        <FlexArea3>
          {currentPosts.slice(3, 7).map((el) => (
            <PhotoArea
              // className={["postItem"]}
              className={["item", "postItem"]}
              id={el.id}
              key={el.id}
              onClick={postClickHandler}
            >
              <PostImg src={el.post_photo} alt="posts" />
            </PhotoArea>
          ))}
        </FlexArea3>
      </FlexArea>
      <FlexArea2>
        <div onClick={() => dispatch(curPageAction(1))}>
          <FSArea>
            <FontAwesomeIcon icon={faAngleDoubleLeft} size="2x" />
          </FSArea>
        </div>
        <div
          onClick={() => {
            if (curPage !== 1) {
              dispatch(curPageAction(curPage - 1));
            }
          }}
        >
          <FSArea>
            <FontAwesomeIcon icon={faAngleLeft} size="2x" />
          </FSArea>
        </div>

        {listLength.map((number, idx) =>
          idx + 1 === curPage ? (
            <CurPage onClick={() => dispatch(curPageAction(idx + 1))}>
              {idx + 1}
            </CurPage>
          ) : (
            <Button1 onClick={() => dispatch(curPageAction(idx + 1))}>
              {idx + 1}
            </Button1>
          )
        )}

        <div
          onClick={() => {
            if (curPage !== listLength.length) {
              dispatch(curPageAction(curPage + 1));
            }
          }}
        >
          <FSArea>
            <FontAwesomeIcon icon={faAngleRight} size="2x" />
          </FSArea>
        </div>
        <div onClick={() => dispatch(curPageAction(listLength.length))}>
          <FSArea>
            <FontAwesomeIcon icon={faAngleDoubleRight} size="2x" />
          </FSArea>
        </div>
      </FlexArea2>
    </Outer>
  );
}
//