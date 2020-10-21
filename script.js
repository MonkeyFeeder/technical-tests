const fetchData = async (url) => {
  let commitList = [];

  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    data.forEach(commitItem => {
      const contentWrapper = document.querySelectorAll('main table.sortable tbody.table-body')[0];

      const newTr = document.createElement('tr');

      const {author, message, url } = commitItem.commit;
      
      // I'm pretty sure I could also create functions for the createElement and createTextNode, but the "simplest" ones were 
      // the appendChildToArray and appendChildToOneElem, so I decided to do them to show you how I'd optimize a JS Code
      const tdAuthor = document.createElement('td');
      const tdDate = document.createElement('td');
      const tdMessage = document.createElement('td');
      const tdUrl = document.createElement('td');

      const tdAuthorText = document.createTextNode(`${author.name}`);
      const tdDateText = document.createTextNode(`${author.date}`);
      const tdMessageText = document.createTextNode(`${message}`);
      const tdUrlText = document.createTextNode(`${url}`);

      const appendChildToArray = (arrayParent, arrayChild) => {
        arrayParent.forEach((parent, index) => {
          parent.appendChild(arrayChild[index]);
        })
      }

      const appendChildToOneElem = (parent, arrayChild) => {
        arrayChild.forEach(elem => {
          parent.appendChild(elem);
        })
      }

      appendChildToArray([tdAuthor, tdDate, tdMessage, tdUrl], [tdAuthorText, tdDateText, tdMessageText, tdUrlText]);
      appendChildToOneElem(newTr, [tdAuthor, tdDate, tdMessage, tdUrl]);

      contentWrapper.appendChild(newTr);
    });
  });
}

fetchData('https://api.github.com/repositories/19438/commits');