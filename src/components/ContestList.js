import React from 'react';
import ContestPreview from './ContestPreview';
import { keys } from 'lodash';

const ContestList = ({ list, onContestClick }) => {

  return(
    <div className="ContestList">
      {keys(list).map(contestId => {
        return <ContestPreview
                  key={contestId} 
                  onClick={onContestClick}
                  {...list[contestId]}
              />;
      })}
    </div>
  );
};

ContestList.propTypes = {
  list: React.PropTypes.object.isRequired,
  onContestClick: React.PropTypes.func.isRequired
};

export default ContestList;