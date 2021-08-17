import icons from 'url:../../img/icons.svg';
import View from './view.js';

/*
 <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page 1</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page 3</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </button>
          */

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup(search) {
    const curPage = this._data.page;
    /*
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
    */
    const numPages =
      search.results.length % search.resultsPerPage !== 0
        ? Math.floor(search.results.length / search.resultsPerPage) + 1
        : search.results.length / search.resultsPerPage;

    //page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${
        curPage + 1
      }"  class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //page 1 and there are no other pages
    if (curPage === 1 && curPage === numPages) {
      return '';
    }
    //last page
    if (curPage >= numPages) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline                                pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }
    //In the middle
    if (curPage !== 1 && curPage !== numPages) {
      return ` <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button data-goto="${
      curPage + 1
    }"  class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      if (btn.classList.contains('pagination__btn--next')) {
        this._data.page++;
      } else if (btn.classList.contains('pagination__btn--prev')) {
        this._data.page--;
      }

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
//