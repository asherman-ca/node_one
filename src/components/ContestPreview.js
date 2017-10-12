import React from 'react';

class ContestPreview extends React.Component {
  state = {

  };
  handleClick = () => {
    this.props.onClick(this.props._id);
  };
  render(){
    return(
      <div className="ContestPreview link" onClick={this.handleClick}>
        <div className="category-name">
          {this.props.categoryName}
        </div>
        <div className="contest-name">  
          {this.props.contestName}
        </div>
      </div>  
    );
  }
}

ContestPreview.propTypes = {
  categoryName: React.PropTypes.string.isRequired,
  contestName: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired,
  _id: React.PropTypes.string.isRequired
};

export default ContestPreview;