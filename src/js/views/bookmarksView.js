import PreviewView from './previewView';
import View from './view';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it!';
  _message = '';

  _generateMarkup() {
    if (this._data.length > 0)
      return this._data
        .map(bookmark => PreviewView.render(bookmark, false))
        .join('');
  }
}

export default new BookmarksView();
//