$(function(){
  function buildHTML(message){
    if (message.image){
      let html = `<div class="main-chat__message-list">
      <div class="message-field">
      <div class="message-field__information">
      <div class="user-name">
      ${message.user_name}
      </div>
      <div class="created-at">
      ${message.created_at}
      </div>
      </div>
      <div class="message-field__content">
      <p class="Message__content">
      ${message.content}
      </p>
      <img class="Message__image" src="${message.image}">
      </div>
      </div>
      </div>`
    return html;
    } else {
      let html = `<div class="main-chat__message-list">
      <div class="message-field">
      <div class="message-field__information">
      <div class="user-name">
      ${message.user_name}
      </div>
      <div class="created-at">
      ${message.created_at}
      </div>
      </div>
      <div class="message-field__content">
      <p class="Message__content">
      ${message.content}
      </p>
      </div>
      </div>
      </div>`
      return html;
    };
  }

  $('.footer').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.send-button').prop('disabled',false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
});