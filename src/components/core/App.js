import React from 'react';
import Header from './Header';
import ContestList from '../ContestList';
import Contest from '../Contest';
import * as Api from '../../api';

const pushState = (obj, url) => 
  window.history.pushState(obj, '', url);

const onPopState = handler => {
  window.onpopstate = handler;
};

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
    onPopState((event) => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId
      });
    });
  }

  // clean timers, listeners
  componentWillUnmount() {
    onPopState(null);
  }

  fetchContest = (contestId) => {
    pushState(
      { currentContestId: contestId },
      `/contest/${contestId}`
    );
    // lookup the contest 
    Api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest._id,
        contests: {
          ...this.state.contests,
          [contest._id]: contest
        }
      });
    });
  };

  fetchContestList = () => {
    pushState(
      { currentContestId: null },
      '/'
    );
    // lookup the contest 
    Api.fetchContestList().then(contests => {
      this.setState({
        currentContestId: null,
        contests
      });
    });
  };

  fetchNames = (nameIds) => {
    if (nameIds.length === 0) {
      return;
    }
    Api.fetchNames(nameIds).then(names => {
      this.setState({
        names
      });
    });
  };

  addName = (newName, contestId) => {
    Api.addName(newName, contestId)
       .then(response => {
         this.setState({
           contests: {
             ...this.state.contests,
             [response.updatedContest._id]: response.updatedContest
           },
           names: {
             ...this.state.names,
             [response.newName._id]: response.newName
           }
         })
       .catch(console.error);  
       });
  }

  pageHeader() {
    if (this.state.currentContestId) {
      return this.currentContest().contestName;
    }
    return 'Naming Contests';
  }
  
  lookupName = (nameId) => {
    if (!this.state.names || !this.state.names[nameId]) {
      return {
        name: '...'
      };
    }
    return this.state.names[nameId];
  };

  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }

  currentLocation() {
    if (this.state.currentContestId) {
      return <Contest
                contestListClick={this.fetchContestList}
                fetchNames={this.fetchNames}
                lookupName={this.lookupName}
                addName={this.addName}
                {...this.currentContest()}
             />;
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
