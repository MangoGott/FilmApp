class ObservableModel {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    this._observers.push(observer);
  } 

  notifyObservers(changeDetails) {
    this._observers.forEach(observer => {
      console.log(observer);
      observer.update(changeDetails, this);
    });
  }

  removeObserver(observer) {
    this._observers = this._observers.filter(o => o !== observer);
  }
}

export default ObservableModel;
