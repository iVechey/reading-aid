import { Component } from "react";

class Home extends Component {
   render() {
        return (
            <h1 className="text-center">{this.props.name}'s homepage</h1>
        )
   }
}

export default Home;