document.getElementById('error').style.display = 'none';

function b64EncodeUnicode(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/g,
    (match, p1) => String.fromCharCode(`0x${p1}`),
  ));
}

document.getElementById('signup').onclick = function () {
  window.location.href = '/register';
};

document.getElementById('login').onsubmit = function (e) {
  e.preventDefault();
  const login = document.getElementById('form1Example13').value;
  const pass = document.getElementById('form1Example23').value;

  const encodedString = b64EncodeUnicode(`${login}:${pass}`);
  fetch('/api/signin', {
    method: 'POST',
    redirect: 'follow',
    headers: {
      Authorization: `Basic ${encodedString}`,
    },
  })
    .then((response) => {
      if (response.status > 400) {
        document.getElementById('error').style.display = 'block';
      } else if (response.redirected) {
        window.location.href = response.url;
      }
    })
    .catch((err) => {
      console.error('something happend', err);
    });
};
