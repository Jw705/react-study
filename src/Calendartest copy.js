import React, { useState, useRef, useEffect } from 'react';
import './Calendartest.css';



function AccordionMenu(props) {
  const contentRef = useRef(null);
  // 아래 ref={contentRef} → content div 요소가 참조 변수인 contentRef에 연결

  const toggleAccordion = () => {
    props.onToggle(props.index);
  };

  useEffect(() => {  // 아코디언 메뉴의 isOpen이 변경될때마다 실행
    if (props.isOpen) {   // 해당 메뉴가 열려있는 상태면
      contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";  // 내용 펼치기
    } else {              // 메뉴가 닫혀있는 상태면
      contentRef.current.style.maxHeight = "0px";   // 내용 닫기
    }
  }, [props.isOpen]);

  return (
    <div>      
      <button
        type="button"
        className={`collapsible ${props.isOpen ? "active" : ""}`} // 해당 메뉴가 열린 상태이면 class에 "active" 추가
        onClick={toggleAccordion} // 클릭하면 handleToggle 실행 (toggleAccordion->onToggle->handleToggle)
      >
        {props.title}
      </button>

      <div className="content" ref={contentRef}>  
        {props.children}
      </div>

    </div>
  );
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
  if (value < 10) {
      value = "0" + value;
      return value;
  }
  return value;
}


let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화
let todayPlus14 = new Date();
todayPlus14.setDate(todayPlus14.getDate() + 14);    

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function Calendar() {


  
    let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
    let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

    //let tbody_Calendar = document.querySelector(".Calendar > tbody");
    //document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
    //document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

    //while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
        //tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
    // }

/*
    let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

    for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
        let nowColumn = nowRow.insertCell();        // 열 추가
    }

    for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

        let nowColumn = nowRow.insertCell();        // 새 열을 추가하고

        let newDIV = document.createElement("p");
        newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
        nowColumn.appendChild(newDIV);

        if (nowDay.getDay() == 6) {                 // 토요일인 경우
            nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
        }

        if (nowDay < today || nowDay > todayPlus14) {   // 지난날 or 14일 이후는 선택 비활성화
            newDIV.className = "pastDay";
        }
        else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
            newDIV.className = "today";
            newDIV.onclick = function () { choiceDate(this); }
        }
        else {                                      // 미래인 경우
            newDIV.className = "futureDay";
            newDIV.onclick = function () { choiceDate(this); }
        }
    }
  */

  return (
    <table className="Calendar">
      <thead>
        <tr>
          <td onClick="prevCalendar();" className="style3">&#60;</td>
          <td colspan="5">
            <span id="calYear">{nowMonth.getFullYear()}</span>년 <span id="calMonth">{leftPad(nowMonth.getMonth() + 1)}</span>월
          </td>
          <td onClick="nextCalendar();" className="style3">&#62;</td>
        </tr>
        <tr>
          <td>일</td>
          <td>월</td>
          <td>화</td>
          <td>수</td>
          <td>목</td>
          <td>금</td>
          <td>토</td>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}




export default function Calendartest() {
  // openIndex : 열려있는 메뉴 번호를 저장하는 state
  const [openIndex, setOpenIndex] = useState(1);  // 1번째 매뉴를 열어놓은 상태로 기본 지정

  const handleToggle = (index) => {
    if (index === openIndex) {  // 클릭한 메뉴가 현재 열려있는 메뉴이면 
      setOpenIndex(null);       // 열려있는 메뉴번호 X ( = 모든 메뉴 닫기 )
    } else {                // 클릭한 메뉴가 현재 열린 메뉴와 다르면
      setOpenIndex(index);  // 열려있는 메뉴번호를 클릭한 메뉴 번호로 지정
    }
  };

  return (
    <div class="background">
      <h2>접기/펴기 테스트</h2>
      <AccordionMenu index={1} isOpen={openIndex === 1} onToggle={handleToggle} title="제목 1">
        <Calendar></Calendar>
        <p className="style4">예약 희망일 14일전부터 예약할 수 있습니다.</p>
      </AccordionMenu>
      <AccordionMenu index={2} isOpen={openIndex === 2} onToggle={handleToggle} title="제목 2">
        <p id="dateChoiceMenu2">예약일을 먼저 선택해 주세요</p>
      </AccordionMenu>
      <AccordionMenu index={3} isOpen={openIndex === 3} onToggle={handleToggle} title="제목 3">
        <p className="style5">  1. 연습실(지하 1층 다목적실)은 08:00부터 22:00까지 사용할 수 있습니다. </p>
        <p className="style5">  2. 일주일(월~일)에 최대 5시간까지 예약할 수 있습니다. </p>
        <p className="style5">  3. 이미 예약된 시간에 함께 연주하고 싶으시면 예약하신 분과 연락하여 협의하시면 됩니다. </p>
      </AccordionMenu>
    </div>
  );
}