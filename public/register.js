const errorBlock = document.getElementById('error');
errorBlock.style.display = 'none';
document.getElementById('signup').onsubmit = function (e) {
  const inputs = Array.from(e.target.elements);
  inputs.pop();
  const signupBody = {};

  inputs.forEach((el) => {
    signupBody[el.name] = el.value;
  });

  e.preventDefault();

  const { pass1, pass2, ...filteredBody } = signupBody;
  if (pass1 !== pass2) {
    errorBlock.style.display = 'block';
    errorBlock.innerHTML += "Passwords doesn't match!";
    return;
  }
  filteredBody.password = pass1;

  fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(filteredBody),
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
    .then(async (response) => {
      if (response.status >= 400) {
        const r = await response.json();
        errorBlock.style.display = 'block';
        errorBlock.innerHTML += r.message;
      } else {
        window.location.href = '/login';
      }
    })
    .catch((err) => {
      errorBlock.style.display = 'block';
      errorBlock.innerHTML += err.message;
    });
};
