import icons from 'url:../../img/icons.svg';
import View from './view.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again';
  _message = '';

  _generateResult = item => {
    return `
     <li class="preview">
            <a class="preview__link " href="#${item.id}">
               <figure class="preview__fig">
               <img src="${item.imageUrl}" crossorigin="anonymous" alt="${item.title}" />
               </figure>
               <div class="preview__data">
               <h4 class="preview__title">${item.title}</h4>
               <p class="preview__publisher">${item.publisher}</p>
               </div>
            </a>
         </li>
         `;
  };

  _generateMarkup() {
    if (this._data.length > 0)
      return this._data.map(item => this._generateResult(item)).join('');
  }
}

export default new ResultsView();
