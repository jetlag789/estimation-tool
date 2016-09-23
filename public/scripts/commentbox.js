var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  checkForExistingComment: function(comments, author) {
    for (var comment of comments) {
      if (comment.author === author) {
        return comment;
      }
    }
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var existingComment = this.checkForExistingComment(comments, comment.author);
    if (existingComment) {
      existingComment.estimate = comment.estimate;
      existingComment.text = comment.text;
    } else {
        comments = comments.concat([{ author: comment.author, id: comment.id}]);
    }
    this.setState({data: comments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentClear: function() {
    $.ajax({
      url: this.props.url + "/clear",
      dataType: 'json',
      cache: false,
      type: 'POST',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleEstimateShow: function() {
    $.ajax({
      url: this.props.url + "/show",
      dataType: 'json',
      cache: false,
      type: 'POST',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Estimation Session</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentAdmin onCommentClear={this.handleCommentClear} onEstimateShow={this.handleEstimateShow}  />
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
