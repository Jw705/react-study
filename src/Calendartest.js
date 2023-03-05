import React, { useState } from 'react';
import './Calendartest.css';

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
  if (value < 10) {
      value = "0" + value;
      return value;
  }
  return String(value);
}

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function Calendar() {

  const [nowMonth, setMonth] = useState(new Date());  // 현재 달을 페이지를 로드한 날의 달로 초기화

  let today = new Date();     // 페이지를 로드한 날짜를 저장
  today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화
  let todayPlus14 = new Date();
  todayPlus14.setDate(todayPlus14.getDate() + 14);    
  
  const [choiceDay, setChoiceDay] = useState("");
  
  // 이전달 버튼 클릭
  const prevCalendar = () => {
    setChoiceDay();
    setMonth(new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate()));   // 현재 달을 1 감소
    console.log(nowMonth);
  };
  // 다음달 버튼 클릭
  const nextCalendar = () => {
    setChoiceDay();
    setMonth(new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate()));   // 현재 달을 1 감소
    console.log(nowMonth);
  };
  const choiceDate = (date) => {
    setChoiceDay(date)
    //setChoiceDay(date)
    /*
    if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
    }
    newDIV.classList.add("choiceDay");           // 선택된 날짜에 "choiceDay" class 추가
    var choiceDateValue = nowMonth.getFullYear() + "-" + leftPad(nowMonth.getMonth() + 1) + "-" + newDIV.innerHTML;
    document.getElementById("dateChoiceMenu").innerText = "예약일자 : " + choiceDateValue;
    document.getElementById("dateChoiceMenu2").innerText = choiceDateValue;
    document.getElementById("dateChoiceMenu2").style.color = "black";
   
    window.location.assign(`./${choiceDateValue}`);     // 날짜 선택시 해당 날짜 페이지로 이동
    */

  }
  const clickHandler = (date) => {
    setChoiceDay(date)
  }


  let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
  let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

  const calendar = [];

  let idCnt=1;
  let nowWeek = [];
  for (let j = 0; j < firstDate.getDay(); j++) { // 이번달 1일의 요일만큼
    nowWeek.push({
      id: idCnt,
      date: "",
      class: "",
    }); // 빈 칸 추가
    idCnt++;
  }

  for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {
    let dateObj = {
      id: idCnt,
      date: leftPad(nowDay.getDate()),
      class: "",
    }
    idCnt++;
    
    // 오늘과 비교해서 class 부여
    if (leftPad(nowDay.getDate()) === choiceDay) {  // 선택된 날짜인 경우
      dateObj.class = "choiceDay";
    }
    else if (nowDay < today) {                      // 지난날인 경우
      dateObj.class = "pastDay";
    }
    else if (nowDay.getFullYear() === today.getFullYear() && nowDay.getMonth() === today.getMonth() && nowDay.getDate() === today.getDate()) { // 오늘인 경우           
      dateObj.class = "today";
    }
    else {                                      // 미래인 경우
      dateObj.class = "futureDay";
    }

    nowWeek.push(dateObj);

    if (nowDay.getDay() === 6) {    // 토요일인 경우
      calendar.push(nowWeek);       // 완성된 일주일 push하고
      nowWeek = [];                 // 배열 초기화
    }
  }

  // 마지막 주차에서 빈칸 만들기
  if (nowWeek.length !== 0) {
    for (let i = nowWeek.length; i < 7; i++) {  // 남은 요일만큼
      nowWeek.push({
        id: idCnt,
        date: "",
        class: "",
      }); // 빈 칸 추가
      idCnt++;
    }
    calendar.push(nowWeek);   // 완성된 마지막 주차 push
  }
  

  // 완성된 한달 데이터를 가지고 table 만들기
  const calendarTable = calendar.map((weekData, i) => (
    <tr key={i}>{weekData.map((data, j) => (
      <td key={data.id}>
        <p className={data.class} onClick={(data.class !== "pastDay") ? () => { choiceDate(data.date) } : undefined}>
          {data.date}
        </p>
      </td>
    ))}
    </tr>
  ));


  return (
    <table className="Calendar">
      <thead>
        <tr>
          <td onClick={prevCalendar} className="style3">&#60;</td>
          <td colSpan="5">
            <span id="calYear">{nowMonth.getFullYear()}</span>년 <span id="calMonth">{leftPad(nowMonth.getMonth() + 1)}</span>월
          </td>
          <td onClick={nextCalendar} className="style3">&#62;</td>
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

      <tbody>
        {calendarTable}     
      </tbody>
    </table>
  );
}




export default function Calendartest() {
  return (
      <Calendar></Calendar>
  );
}