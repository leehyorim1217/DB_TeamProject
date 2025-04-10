document.addEventListener("DOMContentLoaded", () => {
    const quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: '내용을 입력하세요...',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['clean']
        ]
      }
    });
    
    document.querySelector('form').addEventListener('submit', function () {
      const content = document.querySelector('#content');
      content.value = quill.root.innerHTML;
    });
  });