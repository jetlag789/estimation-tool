var CommentAdmin = React.createClass({
  render: function() {
    return (
      <div className="commentAdmin">
      <input type="button" value="Show estimation"
        onClick={this.props.onEstimateShow} />
        <input type="button" value="Start new estimation"
          onClick={this.props.onCommentClear} />
      </div>
    );
  }
});
