import api from './api';

import './style.css';

class App {
  constructor() {
    this.repositories = [];

    this.formEl = document.getElementById('repo-form');
    this.inputEl = document.querySelector('input[name=repository]');
    this.listEl = document.getElementById('repo-list');

    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepositorie(event);
  }

  setLoader(loading = true) {
    if (loading === true) {
      let loadingParentEl = document.getElementById('loading');

      let loadingEl = document.createElement('span');
      loadingEl.appendChild(document.createTextNode('Carregando...'));
      loadingEl.setAttribute('id', 'loading');

      loadingParentEl.appendChild(loadingEl);
    }
    else {
      document.getElementById('loading').innerText = '';
    }
  }

  async addRepositorie(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0)
      return;

    this.setLoader();

    try {
      const response = await api.get(`/repos/${repoInput}`);

      const { name, description, html_url, owner: { avatar_url } } = response.data;

      this.repositories.push({
        name,
        description,
        avatar_url,
        html_url
      });

      this.inputEl.value = '';

      this.render();
    } catch (err) {
      alert('O repositório não existe!');
    }

    this.setLoader(false);
  }

  render() {
    this.listEl.innerHTML = '';

    this.repositories.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);

      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name));

      let descriptionEl = document.createElement('p');
      descriptionEl.appendChild(document.createTextNode(repo.description));

      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', 'blank');
      linkEl.setAttribute('href', repo.html_url);
      linkEl.appendChild(document.createTextNode('Acessar'));

      let listItemEl = document.createElement('li');
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(descriptionEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);
    })
  }
}


new App();