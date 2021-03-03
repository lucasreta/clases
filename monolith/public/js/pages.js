var editor = new Quill('article', {
  theme: 'bubble'
});

var form = document.querySelector('.edit-form');

form.onsubmit = function() {
  var bodyInput = document.querySelector('input[name=body]');
  bodyInput.value = editor.root.innerHTML;
  return true;
}

document.querySelector('.delete').addEventListener('click', function(e) {
  e.preventDefault();
  fetch('', {method: 'DELETE'})
    .then(response => window.location = '/admin');
});
