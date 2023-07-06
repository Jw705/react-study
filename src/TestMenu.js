import { useState, useEffect } from 'react';


function TestMenu(props) {
  const [resvList, setResvList] = useState(<p>로딩중</p>);

  //props.choiceDateValue
  if (props.test === "초기값") {
    return (
      <p>예약일을 먼저 선택해 주세요</p>
    );
  }
  else {
    return <>
      <p>예약일을 먼저 선택해 주세요</p>
      <p>예약일을 먼저 선택해 주세요</p>
      <p>예약일을 먼저 선택해 주세요</p>
      <p>예약일을 먼저 선택해 주세요</p>
      <p>예약일을 먼저 선택해 주세요</p>
      <p>예약일을 먼저 선택해 주세요</p>
      <p>예약일을 먼저 선택해 주세요</p>
      <p>예약일을 먼저 선택해 주세요</p>
      <p>예약일을 먼저 선택해 주세요</p>
      <p>예약일을 먼저 선택해 주세요</p>
    </>;
  }
}


export default TestMenu;