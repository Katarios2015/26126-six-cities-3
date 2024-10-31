
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { redirect } from './redirect';
import browserHistory from '../../browser-history';
import { AnyAction } from '@reduxjs/toolkit';
import { redirectToRoute } from '../action';
import { AppRoute } from '../../components/app/const';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;
  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<AnyAction>(middleware);
    store = mockStoreCreator();
  });
  beforeEach(() => {
    browserHistory.push('');
  });
  it('should redirect to "/" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Main);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Main);
  });
  it('should not redirect to "/*" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.NotFound };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Main);
  });
});
