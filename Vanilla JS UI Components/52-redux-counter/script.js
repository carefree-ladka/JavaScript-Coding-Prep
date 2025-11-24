// Minimal Redux Implementation (fixed)
class Redux {
  constructor(reducer, initialState) {
    this.reducer = reducer;
    this.state = initialState;
    this.listeners = [];

    // base dispatch (applies reducer)
    this._baseDispatch = (action) => {
      this.state = this.reducer(this.state, action);
      this.listeners.forEach((listener) => listener());
      return action;
    };

    // initial dispatch is the base one; applyMiddleware will override this.dispatch
    this.dispatch = this._baseDispatch;
  }

  getState() {
    return this.state;
  }

  // subscribe returns an unsubscribe function
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // apply middleware once and replace this.dispatch with the enhanced dispatch
  applyMiddleware(...middlewares) {
    // store API exposed to middlewares: getState + a dispatch function that calls the current dispatch
    const storeAPI = {
      getState: this.getState.bind(this),
      dispatch: (action) => this.dispatch(action), // will refer to enhanced dispatch after composition
    };

    // create chain: each mw(storeAPI) => next => action => ...
    const chain = middlewares.map((mw) => mw(storeAPI));

    // compose chain around base dispatch (right-to-left)
    this.dispatch = chain.reduceRight(
      (next, mw) => mw(next),
      this._baseDispatch
    );
  }
}

// Thunk middleware (unchanged)
const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    // pass the (enhanced) dispatch and getState to the thunk
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

// Action Types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";
const SET_LOADING = "SET_LOADING";

// Action Creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const reset = () => ({ type: RESET });
const setLoading = (loading) => ({ type: SET_LOADING, payload: loading });

// Async Action Creator (Thunk)
const asyncIncrement = () => (dispatch) => {
  dispatch(setLoading(true));
  setTimeout(() => {
    dispatch(increment());
    dispatch(setLoading(false));
  }, 1000);
};

// Reducer
const counterReducer = (state = { count: 0, loading: false }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case RESET:
      return { ...state, count: 0 };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Create Store
const store = new Redux(counterReducer, { count: 0, loading: false });
store.applyMiddleware(thunk);

// --- UI hookup (same as yours) ---
const countElement = document.getElementById("count");
const loadingElement = document.getElementById("loading");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");
const asyncBtn = document.getElementById("async-increment");

const updateUI = () => {
  const state = store.getState();
  countElement.textContent = state.count;
  loadingElement.textContent = state.loading ? "Loading..." : "";
  [incrementBtn, decrementBtn, resetBtn, asyncBtn].forEach((btn) => {
    if (btn) btn.disabled = state.loading;
  });
};

store.subscribe(updateUI);

incrementBtn.addEventListener("click", () => store.dispatch(increment()));
decrementBtn.addEventListener("click", () => store.dispatch(decrement()));
resetBtn.addEventListener("click", () => store.dispatch(reset()));
asyncBtn.addEventListener("click", () => store.dispatch(asyncIncrement()));

updateUI();
