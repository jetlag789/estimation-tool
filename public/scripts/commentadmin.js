var CommentAdmin = React.createClass({
  openPopupWindow : function() {
    window.open("/",'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=500,height=500'); return false;
  },
  render: function() {
    return (
      <div className="commentAdmin">
        <input type="button" value="Show estimation"
        onClick={this.props.onEstimateShow} />
        <input type="button" value="Start new estimation"
          onClick={this.props.onCommentClear} />
        <div>
          <a className="popupWindowLink" href="/" onClick={this.openPopupWindow}>Open smaller window</a>
        </div>
      </div>
    );
  }
});
