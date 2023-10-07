// Theme Button Function
(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();


//Newer Google Sheet App Script Connection
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('myform');
  var url = 'https://script.google.com/macros/s/AKfycbwTVyK2PUBa1wys5WBpD-H81tutzxw6-463RWPFkmtv8OVoN573TEZJYpXESCkm9HlHWw/exec';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var formData = new FormData(form);

    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(function (response) {
      if (response.ok) {
        //Message to alert whether Form is succesfully Submitted
        alert('Form submitted successfully!');
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .catch(function (error) {
      //Error Message if my Form Submittion Fails
      alert('Error submitting the form. Please try again.');
      console.error('Error:', error);
    });
  });
});




//Older Google Sheet App Script Connection
// var $form = $('form#test-form'),
//     url = 'https://script.google.com/macros/s/AKfycbwTVyK2PUBa1wys5WBpD-H81tutzxw6-463RWPFkmtv8OVoN573TEZJYpXESCkm9HlHWw/exec'

// $('#submit-form').on('click', function(e) {
//   e.preventDefault();
//   var jqxhr = $.ajax({
//     url: url,
//     method: "GET",
//     dataType: "json",
//     data: $form.serializeObject()
//   }).success(
//     // do something
//   );
// })