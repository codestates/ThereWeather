import { useEffect, useState } from "react";
import styled from "styled-components"

const PaginationContainer = styled.div.attrs({
  className: "pagination"
})`
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 50vw;
  color: #A1A1A1;
  font-weight: bold;
`;

const PageNumbersList = styled.ul.attrs({
  className: "pageNumbersList"
})`
  border: 1px solid red;
  // width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style-type: none;
  padding: 0 1rem;
`;

const ArrowButton = styled.span.attrs({
  className: "arrow"
})`
  &:hover {
    color: black;
  }
`;

const PageNumberItem = styled.li.attrs({
  className: "pageNumberItem"
})`
  padding: 0 1rem;
  &:hover {
    color: black;
  }
`;

export default function Pagination({dataLength, unit, numberButtonClickHandler}) {
  const numberOfPages = Math.ceil(dataLength / unit);
  const numberArr = new Array(numberOfPages).fill(0).map((el, idx) => idx + 1);
  const [startIdx, setStartIdx] = useState(0);
  const [lastIdx, setLastIdx] = useState(unit);
  const cutArrInit = new Array(unit).fill(0).map((el, idx) => idx + 1);
  const [cutArr, setCutArr] = useState(cutArrInit);

  const prevHandler = () => {
    if(startIdx === 0) return;
    console.log('**prev**');
    setStartIdx(prev => prev - unit);
    setLastIdx(prev => prev - unit);
  }

  const nextHandler = () => {
    let tempIdxEnd = Math.ceil(numberArr.length/unit) * unit;
    if(lastIdx === tempIdxEnd) return;
    console.log('**next**');
    setStartIdx(prev => prev + unit);
    setLastIdx(prev => prev + unit);
  }

  useEffect(()=>{
    let tempIdxEnd = Math.ceil(numberArr.length/unit) * unit;

    if(startIdx >= unit || lastIdx <= tempIdxEnd) {
      const result = numberArr.slice(startIdx, lastIdx);
      setCutArr(prev => result);
    }
  }, [startIdx, lastIdx])

  return (
    <PaginationContainer>
      <ArrowButton className="prevButton" onClick={prevHandler}>
        ⬅️
      </ArrowButton>
      <PageNumbersList>
        {
          cutArr.map(number => {
            return (
              <PageNumberItem
                key={number}
                id={number}
                onClick={() => {
                  numberButtonClickHandler(number);
                }}
              >
                {number}
              </PageNumberItem>
            );
          })
        }
      </PageNumbersList>
      <ArrowButton className="nextButton" onClick={nextHandler}>
        ➡️
      </ArrowButton>
    </PaginationContainer>
  );
}