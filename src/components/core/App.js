import React from 'react';
import Header from './Header';
import ContestList from '../ContestList';
import Contest from '../Contest';
import * as Api from '../../api';

const pushState = (obj, url) => 
  window.history.pushState(obj, '', url);

class App extends React.Component {
  static propTypes = {
    initialData: React.PropTypes.object.isRequired
  }
  state = this.props.initialData;

  // componentDidMount() {
    // axios.get('/api/contests')
    //   .then(response => {
    //     console.log(response);
    //     this.setState({
    //       contests: response.data.contests
    //     });
    //   })
    //   .catch(console.error);
  // }

  // ajax, timers, listeners
  componentDidMount() {

  }

  // clean timers, listeners
  componentWillUnmount() {
  }

  fetchContest = (contestId) => {
    pushState(
      { currentContestId: contestId },
      `/contest/${contestId}`
    );
    // lookup the contest 
    Api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest.id,
        contests: {
          ...this.state.contests,
          [contest.id]: contest
        }
      });
    });
  };

  pageHeader() {
    if (this.state.currentContestId) {
      return this.currentContest().contestName;
    }
    return 'Naming Contests';
  }
  
  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }

  currentLocation() {
    if (this.state.currentContestId) {
      return <Contest {...this.currentContest()} />;
    } else {
      return <ContestList
                onContestClick={this.fetchContest}
                list={this.state.contests} 
              />;
    }
  }

  render () {
    return (
      <div className="App">
        <Header
          headerMessage={this.pageHeader()}
        />
        {this.currentLocation()}
      </div>  
    );
  }
}


App.propTypes = {
  initialData: React.PropTypes.object
};

export default App;
