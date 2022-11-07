import "./App.css";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

const ProgressBar = (props) => {
  const width = (480 / 5) * props.step;
  return (
    <div className="progress-bar">
      <div className="percent" style={{ width: width }}></div>
    </div>
  );
};
const Question = (props) => {
  const { imgUrl } = props;
  return (
    <div className="img-box">
      <img src={imgUrl} alt="" />
    </div>
  );
};
const Answer = (props) => {
  const { msg, value } = props;
  const navigation = useNavigate();

  const pathName = window.location.pathname;
  const nextPage = parseInt(pathName.charAt(pathName.length - 1)) + 1;

  const { setDispatchType } = React.useContext(StoreContext);

  return (
    <div className="button-box">
      <button
        className="btn"
        type="button"
        onClick={() => {
          setDispatchType({
            code: "답변",
            params: {
              value: { value },
            },
          });
          navigation(`/page${nextPage}`);
        }}
      >
        {msg}
      </button>
    </div>
  );
};

function DefaultPage(props) {
  const { imgUrl, msg1, msg2, step, value1, value2 } = props;
  return (
    <div className="main-app">
      <ProgressBar step={step} />
      <Question imgUrl={imgUrl} />
      <Answer msg={msg1} value={value1} />
      <Answer msg={msg2} value={value2} />
    </div>
  );
}

function Main() {
  const navigation = useNavigate();
  return (
    <div className="main-app">
      <div className="img-box">
        <img
          src="https://kakaofriendsmbti.netlify.app/static/media/00.88f71908.png"
          alt=""
        />
      </div>
      <div className="button-box">
        <button
          className="button-start"
          type="button"
          onClick={() => {
            navigation("/Page1");
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

function Page1() {
  return (
    <DefaultPage
      step={1}
      imgUrl="https://kakaofriendsmbti.netlify.app/images/01-01.png"
      value1="E"
      value2="I"
      msg1="당연하지! 어디서 할지 고민 중이야!"
      msg2="그냥 맛있는거 먹으러 갈까 생각 중이야!"
    />
  );
}
function Page2() {
  return (
    <DefaultPage
      step={2}
      imgUrl="https://kakaofriendsmbti.netlify.app/images/02-01.png"
      value1="S"
      value2="N"
      msg1="영화 완전 재미었어! 너도 한번 봐봐!"
      msg2="좀비가 너무 리얼했어. 실제 상황이면 난 바로 죽었을거야..."
    />
  );
}
function Page3() {
  return (
    <DefaultPage
      step={3}
      imgUrl="https://kakaofriendsmbti.netlify.app/images/03-01.png"
      value1="T"
      value2="F"
      msg1="무슨 꽃 샀어? 향은 좋아?"
      msg2="왜 우울해? 무슨 일 있어?"
    />
  );
}
function Page4() {
  return (
    <DefaultPage
      step={4}
      imgUrl="https://kakaofriendsmbti.netlify.app/images/04-01.png"
      value1="P"
      value2="J"
      msg1="지금 PPT 만드는 중이니까 아마 한 2시간 뒤면 끝날거 같아!"
      msg2="모르겠어. 근데 지금 PPT 만들고 있어!"
    />
  );
}
const StoreContext = React.createContext({});

function App() {
  const [dispatch, setDispatchType] = React.useState({
    code: null,
    params: null,
  });
  React.useEffect(() => {
    console.log(dispatch);
  }, [dispatch]);

  const [mbti, setMbti] = React.useState([
    {
      I: 0,
      E: 0,
    },
    {
      S: 0,
      N: 0,
    },
    {
      T: 0,
      F: 0,
    },
    {
      P: 0,
      J: 0,
    },
  ]);

  <StoreContext.Provider value={{ setDispatchType }} />;
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/Page1" element={<Page1 />} />
      <Route exact path="/Page2" element={<Page2 />} />
      <Route exact path="/Page3" element={<Page3 />} />
      <Route exact path="/Page4" element={<Page4 />} />
    </Routes>
  );
}

export default App;
