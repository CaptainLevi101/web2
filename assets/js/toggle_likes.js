class ToggleLike {
    constructor(toggleElement) {
      this.toggler = toggleElement;
      this.toggleLike();
    }
  
    async toggleLike() {
      $(this.toggler).click(async function (e) {
        e.preventDefault();
        let self = this;
        try {
          let response = await $.ajax({
            type: 'POST',
            url: $(self).attr('href'),
          });
  
          let likesCount = parseInt($(self).attr('data-likes'));
          console.log(likesCount);
  
          if (response.data.deleted == true) {
            likesCount -= 1;
          } else {
            likesCount += 1;
          }
  
          $(self).attr('data-likes', likesCount);
          $(self).html(`${likesCount} Likes`);
        } catch (errData) {
          console.log('Error in completing the request');
        }
      });
    }
  }
  