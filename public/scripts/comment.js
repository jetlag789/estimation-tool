var Comment = React.createClass({
    rawMarkup: function() {
      var md = new Remarkable();
      var rawMarkup = md.render(this.props.children.toString());
      return { __html: rawMarkup };
    },
    render: function() {
      return (
        <div className="comment">
          <div className="commentAuthor">
            {this.props.author}
          </div>
          <div className="commentEstimate">
            {this.props.estimate}
          </div>
          <div className="commentText">
            {this.props.text}
          </div>
        </div>
      );
    }
});
