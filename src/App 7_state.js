import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props) {
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}

function Nav(props) {
  const lis = [ ]
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read'+t.id} onClick={event=>{
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  //const _mode = useState('WELCOME');  // 'WELCOME'은 state의 초기값
  //const mode =_mode[0];               // state의 값은 0번째 index로 읽는다.
  //const setMode = _mode[1];           // state를 바꿀때는 1번째 index의 함수를 사용한다.

  const [mode, setMode] = useState('WELCOME');  // 위 함수의 축약형
  const [id, setId] = useState(null);

  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascriptss', body:'javascript is...'}
  ]

  let content = null;
  if(mode==="WELCOME"){
    content = <Article title="Welcome" body="Hello, web"></Article>
  }
  else if (mode === 'READ') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
    </div>
  );
}

export default App;
