function removeAllCookies() {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

document.getElementById('logout').onclick = (e) => {
  e.preventDefault();
  removeAllCookies();
  window.location.replace('/login');
};

document.getElementById('searchInput').oninput = (e) => {
  function addItemToList(itemText) {
    const listItem = document.createElement('a');
    listItem.className = 'dropdown-item';
    listItem.innerText = itemText;
    document.getElementById('searchDropdown').appendChild(listItem);
  }
  function clearResults() {
    const dropdown = document.getElementById('searchDropdown');

    if (dropdown.childElementCount > 1) {
      Array.prototype.slice.call(dropdown.children).forEach((child, idx) => {
        if (idx !== 0) {
          dropdown.removeChild(child);
        }
      });
    }
  }
  clearResults();
  $('#searchInput').dropdown('hide');
  const trimmedInput = e.target.value.trim().replace(/ /g, '');
  if (trimmedInput.length > 2) {
    $('#searchInput').dropdown('show');
    fetch(`/api/pages/search?text=${trimmedInput}`)
      .then((r) => r.json())
      .then((pages) => {
        if (pages.length === 0) {
          addItemToList('Не удалось никого найти :(');
        }
        pages.forEach(({ user }) => {
          addItemToList(`${user.firstName} ${user.lastName} - ${user.userName}`);
        });
      })
      .catch(console.error);
  }
};
