// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

class PostComments {
    constructor(postId) {
      this.postId = postId;
      this.postContainer = $(`#post-${postId}`);
      this.newCommentForm = $(`#post-${postId}-comments-form`);
  
      this.createComment(postId);
  
      let self = this;
      this.postContainer.on('click', ' .delete-comment-button', function (e) {
        self.deleteComment($(this));
      });
     
    }
  
    createComment(postId) {
        let pSelf = this;
      let self = this;
      this.newCommentForm.submit(function (e) {
        e.preventDefault();
  
        $.ajax({
          type: 'POST',
          url: '/comments/create',
          data: $(this).serialize(),
          success: function (data) {
            let newComment = self.newCommentDom(data.data.comment);
            $(`#post-comments-${postId}`).prepend(newComment);
            pSelf.deleteComment($(' .delete-comment-button', newComment));
            
          new ToggleLike($(' .toggle-like-button',newComment));
            new Noty({
              theme: 'relax',
              text: 'Comment published!',
              type: 'success',
              layout: 'topRight',
              timeout: 1500
            }).show();
          },
          error: function (error) {
            console.log(error.responseText);
          }
        });
      });
    }
  
    newCommentDom(comment) {
      return $(`<li class="bord" id="comment-${comment._id}">
        <div class="loc">
          <small id="na">${comment.user.name}</small>
          <small>
          <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}"&type=Comment">
          0 Likes
         </small>
          <small>

            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">delete</a>
          </small>
        </div>
        <p>${comment.content}</p>

      </li>`);
    }
    deleteComment(deleteLink) {
      let self = this; // Store reference to the PostComments instance
      $(this.postContainer).on('click', '.delete-comment-button', function (e) {
        e.preventDefault();
    
        let commentId = $(this).data('comment-id'); // Get the comment ID from the data attribute
    
        $.ajax({
          type: 'GET',
          url: `/comments/destroy/${commentId}`, // Use the comment ID in the URL
          success: function (data) {
            $(`#comment-${data.data.comment_id}`).remove();
    
            new Noty({
              theme: 'relax',
              text: 'Comment Deleted',
              type: 'success',
              layout: 'topRight',
              timeout: 1500
            }).show();
          },
          error: function (error) {
            console.log(error.responseText);
          }
        });
      });
    }
    
    
    }
    
    // Initialize the PostComments class for each post on the page
    $('.post-container').each(function () {
      let postId = $(this).data('post-id');
      new PostComments(postId);
    });
  
  