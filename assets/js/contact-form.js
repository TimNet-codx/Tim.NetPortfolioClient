
(function() {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      let thisForm = this;
      let loading = thisForm.querySelector('.loading');
      let errorMessage = thisForm.querySelector('.error-message');
      let sentMessage = thisForm.querySelector('.sent-message');

      // Reset UI state
      if (loading) loading.classList.add('d-block');
      // if (errorMessage) errorMessage.classList.remove('d-block');
      if (errorMessage) {
        errorMessage.classList.remove('d-block');
        errorMessage.innerHTML = ''; // clear old error text too
      }
      if (sentMessage) sentMessage.classList.remove('d-block');

      let formData = new FormData(thisForm);
    // fetch('http://localhost:3000/api/contact'
      fetch('https://tim-netportfolioservernew.onrender.com/api/contact', {
        method: 'POST',
        body: new URLSearchParams(formData), // sends as x-www-form-urlencoded
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(({ status, body }) => {
        if (loading) loading.classList.remove('d-block');

        if (status === 200 && body.sent) {
          if (sentMessage) sentMessage.classList.add('d-block');
          thisForm.reset();
        } else {
          displayError(body.error || 'An error occurred. Please try again.');
        }
      })
      .catch(error => {
        if (loading) loading.classList.remove('d-block');

        displayError('Unable to reach the server. Please try again later.');
        console.error(error);
      });
      

      function displayError(message) {
        if (errorMessage) {
          errorMessage.innerHTML = message;
          errorMessage.classList.add('d-block');
        }
      }
    });
  });

})();