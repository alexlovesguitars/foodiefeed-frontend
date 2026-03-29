import "./Home.css";
import PageTransition from "../hooks/pageTransition";


export default function Home() {
  return (
    <div className="main-container">
      <PageTransition>
        <div className="home-content">
          <h1>Welcome to FoodieFeed!</h1>
          <p>Your go-to app for discovering and sharing delicious recipes.</p>
        </div>
      </PageTransition>
    </div>
  );
}
