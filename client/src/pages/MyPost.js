import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { userPosts, updatePostId } from "../actions/index"
// UPDATE_CURRENT_PAGE, UPDATE_START_END_PAGE
import GoBackButton from "../components/GoBackButton"
import Pagination from "../components/Pagination"

/*
  [수정]
  - 레이아웃
  - 페이네이션 동작
  - 주석 제거
*/

const Outer = styled.div`
  position: relative;
  background-color: var(--page-bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 2rem;

  h2 {
    align-self: flex-start;
    margin: 2rem 0;
  }
  .gobackbuttonContainer {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
  button{
    font-size: 1.5rem;
  }
  .paginationContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-top: 1rem;
  }

  @media screen and (min-width: 1500px) {
    padding-left: 3vh;
    padding-right: 3vh;
  }
  @media screen and (max-width: 375px) {
    padding-top: 2vh;
  }
  @media screen and (max-width: 1081px) {
    .gobackbuttonContainer {
      flex-direction: column;
    }
  }
`

const StyledGoBackButton = styled(GoBackButton)`
  // position: absolute;
  // left: 0;
`;

// 내가 쓴 글 (grid)
const GridArea = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 300px 300px ;
    grid-gap: 1.5rem;
    min-height: 70vh;
    margin: 1rem;
    p{
      font-size: 28px;
    }

    .postItem {
      background-color: rgba(255, 255, 255, 0.6);
      display: flex;
    }
    .postItem:hover {
      border: 1px solid #D5D8DC;
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
      p{
        font-size:20px
      }
    }
    @media screen and (max-width: 375px) {
      height: auto;
    }
`

// 게시물 사진
const PostImg = styled.img`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;

  @media screen and (min-width: 2100px) {
    width: 300px;
    height: 300px;
  }

  @media screen and (max-width: 1081px) {
    // 이미지 크기 수정 필요
  }
`

const url = process.env.REACT_APP_LOCAL_URL

export default function MyPost() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { start, end, current, isLogin, userInfo, postInfo, readPostId } = useSelector((state) => state.itemReducer)

  const [currentPosts, setcurrentPosts] = useState([]);

  useEffect(() => {
    axios({
        url: url + `/mypost?searchID=${userInfo.user_id}`,
        method: "get",
        withCredentials: true,
    }).then((res) => {
        //console.log(res.data)
        setcurrentPosts(res.data)
        dispatch(userPosts(res.data))
    })
  }, [])

  // 페이지네이션 시작
  const [ currentPage, setCurrentPage ] = useState(1);
    // 1페이지로 시작
  const itemsPerPage = 8;
    // 한 페이지에 8개씩 보여준다
  const lastIdx = currentPage * itemsPerPage;
  const firstIdx = lastIdx - itemsPerPage;
  const slicedData = (dataArr) => {
    return dataArr.slice(firstIdx, lastIdx);
  }
  // 페이지네이션 끝

  // 게시물사진 클릭했을 때
  const postClickHandler = (e) => {
    let elem = e.target;
    while(!elem.classList.contains("postItem")) {
        elem = elem.parentNode;
        if(!elem.classList.contains("myPostList")) {
            break;
        }
    }

    dispatch(updatePostId(elem.id));
    history.push({
        pathname: '/postread',
        state: {postId: elem.id}
    });
  }

  return (
    <Outer className="MyPostPage">
      <div className="gobackbuttonContainer">
        <StyledGoBackButton className="gobackButton" />
        <h2>내가 쓴 게시물</h2>
      </div>

      <GridArea className="myPostList">
        { /* 페이지네이션 적용 */
          slicedData(currentPosts).map((el) =>
          <div className={["postItem"]} id={el.id} onClick={postClickHandler} key={el.id}>
            <PostImg src={el.post_photo} alt="posts"/>
          </div>)
        }
      </GridArea>

      {/* 페이지네이션 테스트 */}
      <div className="paginationContainer">
        <Pagination
          dataLength={currentPosts.length}
          itemsPerPage={itemsPerPage}
          numberButtonClickHandler={setCurrentPage}
        />
      </div>
    </Outer>
  )
}