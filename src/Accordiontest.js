import React, { useState, useRef, useEffect } from 'react';
import './Accordion2.css';
import TestMenu from './TestMenu';

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

export default function Accordion() {

  
  console.log("로드");

  // openIndex : 열려있는 메뉴 번호를 저장하는 state
  const [openIndex, setOpenIndex] = useState(1);  // 1번째 매뉴를 열어놓은 상태로 기본 지정

  const handleToggle = (index) => {
    if (index === openIndex) {  // 클릭한 메뉴가 현재 열려있는 메뉴이면 
      setOpenIndex(null);       // 열려있는 메뉴번호 X ( = 모든 메뉴 닫기 )
    } else {                // 클릭한 메뉴가 현재 열린 메뉴와 다르면
      setOpenIndex(index);  // 열려있는 메뉴번호를 클릭한 메뉴 번호로 지정
    }
  };

  const [nowMonth, setMonth] = useState(new Date(2023, 4));  // 현재 달을 페이지를 로드한 날의 달로 초기화

  
  const [test, setTest] = useState("초기값");  // 현재 달을 페이지를 로드한 날의 달로 초기화

  function greetUser() {
    setTest("클릭");
    console.log("Hi there, user!");
    setOpenIndex(2);    
  }


  return (
    <div>
      <h2>접기/펴기 테스트</h2>
      <AccordionMenu index={1} isOpen={openIndex === 1} onToggle={handleToggle} title="제목 1">
        <button type="button" onClick={greetUser}>버튼</button>
        <p>내용 11 입니다.</p>
      </AccordionMenu>
      <AccordionMenu index={2} isOpen={openIndex === 2} onToggle={handleToggle} title="제목 2">
        <TestMenu test={test}></TestMenu>
        <p>내용 2 입니다.</p>
      </AccordionMenu>
      <AccordionMenu index={3} isOpen={openIndex === 3} onToggle={handleToggle} title="제목 3">
        <p>내용 3 입니다.</p>
      </AccordionMenu>
    </div>
  );
}