// tutorial15.js
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: '', estimate: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleEstimateChange: function(e) {
    // this.setState({estimate: parseInt(e.target.value, 10)});
    this.setState({estimate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    // var estimate = parseInt(this.state.estimate, 10);
    var estimate = this.state.estimate.trim();
    if (!author || !estimate) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text, estimate: estimate});
    this.setState({author: this.state.author, text: '', estimate: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Estimate"
          value={this.state.estimate}
          onChange={this.handleEstimateChange}
        />
        <input
          type="text"
          placeholder="Comments..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
