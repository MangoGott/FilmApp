import ObservableModel from "./ObservableModel";
import { withCookies} from 'react-cookie';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/60";
const httpOptions = {
  headers: { "X-Mashape-Key": API_KEY }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
   // this.getNumberOfGuests();
    this._menu = [];
  }
 
  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
   // const { cookies } = this.props;
    //cookies.set('numGuest', e.target.value, {path: '/'});
    this._numberOfGuests = num;
    this.notifyObservers("numPeople");
  }

  addToMenu(dish){
    let bool = 0;
    for(var i in this._menu){
      if(this._menu[i] === dish){
        bool=1;
        break;
      }
    }
    if(bool!=1){
      this._menu.push(dish);
    }
    this.notifyObservers("changeMenu");
  }

  removeFromMenu(dish){
    let bool=0;
    for(var i in this._menu){
      if(this._menu[i] === dish){
        this._menu.splice(i,1);
        bool=1;
        break;
      }
    }
    this.notifyObservers("changeMenu");
  }

  getMenu(){
    return this._menu;
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes(type, filter, page) {
    console.log("get all dishes: ", type);
    var params = "";

		if(type !== "all"){
			params = params + "type=" + type + "&";
		}
		if(filter !== null && filter !== "" && filter !== undefined){
			params = params + "query=" + filter + "&";
		}
		if(page !== null && page !== "" && page !== undefined){
			params = params + "offset=" + String(page*10-10);
    }
    
    const url = `${BASE_URL}/recipes/search`;
    return fetch(url + "?" + params, httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default withCookies(modelInstance);
