import './App.css';
import Welcome        from './Components/Welcome';
import Article        from './Components/Article';
import Comments       from './Components/Comments';
import Card           from './Components/Card';
import FirstCardImg  from './img/card1.png';
import SecondCardImg from './img/card2.png';
import ThirdCardfImg  from './img/card3.png';
function App() {
  const firstCard = {
    title: "React Js",
    text: "React · Declarative React makes it painless to create interactive UIs. · Component-Based Build encapsulated components that manage their own state",
    img: FirstCardImg,
    imgAlt: "React Js"
  }
  const secondCard = {
    title: "Components",
    text: "Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.",
    img: SecondCardImg,
    imgAlt: "Components"
  }
  const thirdCard = {
    title: "Introducing JSX",
    text: "It is called JSX, and it is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like.",
    img: ThirdCardfImg,
    imgAlt: "JSX"
  }
  return (
    <div className="App">
      <div className="welcome">
        <Welcome />
      </div>
     <div className="cards-wrapper">
        <Card title={firstCard.title} text={firstCard.text} img={firstCard.img} imgAlt={firstCard.img} />
        <Card title={secondCard.title} text={secondCard.text} img={secondCard.img} imgAlt={secondCard.img} active={true} />
        <Card title={thirdCard.title} text={thirdCard.text} img={thirdCard.img} imgAlt={thirdCard.img} />
     </div>
       
    </div>
  );
}

export default App;
