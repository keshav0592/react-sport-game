class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shots: 0,
      score: 0,
    };

    this.shotSound = new Audio("./audio/shoot.mp3");
    this.scoreSound = new Audio("./audio/goal.mp3");
  }

  shotHandler = () => {
    let score = this.state.score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 100);
    }

    this.setState((state, props) => ({
      shots: state.shots + 1,
      score,
    }));
  };

  render() {
    let shotPercentageDiv;

    if (this.state.shots) {
      const shotPercentage = Math.round((this.state.score / this.state.shots) * 100);

      shotPercentageDiv = (
        <div>
          <strong>shooting %: {shotPercentage}</strong>
        </div>
      );
    }

    return (
      <div className="Team">
        <h2>{this.props.name}</h2>

        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>

        <div>
          <strong>shots:</strong> {this.state.shots}
        </div>

        <div>
          <strong>score:</strong> {this.state.score}
        </div>

        {shotPercentageDiv}

        <button onClick={this.shotHandler}>shoot!</button>
      </div>
    );
  }
}

function Game(props) {
  return (
    <div className="Game">
      <h1>Welcome to {props.venue}</h1>
      <div className="stats">
        <Team name={props.visitingTeam.name} logo={props.visitingTeam.logoSrc} />
        <div className="versus">
          <h1>VS</h1>
        </div>
        <Team name={props.homeTeam.name} logo={props.homeTeam.logoSrc} />
      </div>
    </div>
  );
}

function App(props) {
  const columbus = {
    name: "Columbus Crew",
    logoSrc: "./images/columbus.bmp",
  };

  const maimi = {
    name: "Inter Maimi",
    logoSrc: "./images/maimi.bmp",
  };

  const barca = { name: " FC Barcelona", logoSrc: "./images/barca.jpg" };

  const madrid = {
    name: "Real Madrid",
    logoSrc: "./images/madrid.png",
  };
  return (
    <div className="App">
      <Game venue="Soccer road 11" homeTeam={maimi} visitingTeam={columbus} />
      <Game venue="Camp Nou" homeTeam={barca} visitingTeam={madrid} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
