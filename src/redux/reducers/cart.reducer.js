import {
  ADD_TO_CART,
  APPLY_COUPON,
  CLEAR_CART,
  CLOSE_CART,
  COUPON_ERROR,
  LOADING,
  OPEN_CART,
  REMOVE_FROM_CART,
} from "../actions/actionTypes";

const initialState = {
  cartItems: [],
  total: 0,
  count: 0,
  prevCount: 0,
  loading: false,
  discount: null,
  couponError: "",
  isOpen: false,
  //   JSON.parse(localStorage.getItem("userData"))
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, {id: state.count + 1, ...action.payload}],
        count: state.count + 1,
        total: parseFloat((state.total + action.payload.Report_price).toFixed(2)),
        prevCount: state.count
      };
    case REMOVE_FROM_CART:
      const itemToRemove = state.cartItems.find(item => action.payload === item.Country)
      const newItems = state.cartItems.filter(item => action.payload !== item.Country)
      return {
        ...state,
        cartItems: newItems,
        count: state.count - 1,
        total: parseFloat((state.total - itemToRemove.Report_price).toFixed(2)),
        prevCount: state.count
      }
    case CLEAR_CART:
      return {
        ...initialState,
      }
    case APPLY_COUPON:
      const { active, discount, code } = action.payload;
      if(active){
        return {
          ...state,
          discount: {
            ...discount,
            code
          }
        }
      }
      return;
    case COUPON_ERROR:
      return {
        ...state,
        couponError: action.payload,
      }
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case OPEN_CART:
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_CART:
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state;
  }
};

export default cartReducer;
