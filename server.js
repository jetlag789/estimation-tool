/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var database = {
  showEstimates : false,
  comments : []
};

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

function sendResponseWithComments(jsonData, res) {
  if(jsonData.showEstimates) {
    res.json(jsonData.comments);
  } else {
    res.json(jsonData.comments.map(function(comment) {
      return { author: comment.author, id: comment.id, text: "" }
    }));
  }
}

app.get('/api/comments', function(req, res) {
  sendResponseWithComments(database, res);
});

function checkForExistingComment(author) {
  for (var comment of database.comments) {
    if (comment.author === author) {
      return comment;
    }
  }
}

app.post('/api/comments', function(req, res) {
    var existingComment = checkForExistingComment(req.body.author);
    if (existingComment) {
      existingComment.text = req.body.text;
      existingComment.estimate = req.body.estimate;
    } else {
      var newComment = {
        id: Date.now(),
        author: req.body.author,
        text: req.body.text,
        estimate: req.body.estimate
      };
      database.comments.push(newComment);
    }
    sendResponseWithComments(database, res);
});


app.post('/api/comments/clear', function(req, res) {
    database.comments = [];
    database.showEstimates = false;
    res.json(database.comments);
});

app.post('/api/comments/show', function(req, res) {
  database.showEstimates = true;
  res.json(database.comments);
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
