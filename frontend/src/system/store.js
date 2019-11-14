import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

export default function configureStore() {
  const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['post', 'comment', 'statistic', 'model', 'user', 'data']
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    applyMiddleware(thunk, createLogger())
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
