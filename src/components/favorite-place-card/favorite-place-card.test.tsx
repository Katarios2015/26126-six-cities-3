import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {withHistory, withStore} from '../../utils/mock-component';
import FavoritePlaceCard from './favorite-place-card';
import {makeFakeStore, makeFakeOfferCard} from '../../utils/moks';
import {APIRoute} from '../../store/const';
import { extractActionsTypes } from '../../utils/moks';
import {AuthorizationStatus} from '../../store/const';
import {postFavoriteAction/*, fetchFavoriteOffersAction*/} from '../../store/api-actions';

describe('Component: FavoritePlaceCard', () => {
  it('should render correct', () => {
    const fakeOffer = makeFakeOfferCard();
    const bookmarkButtonTextTestId = 'bookmark';

    const { withStoreComponent } = withStore(<FavoritePlaceCard offer={fakeOffer}/>, {});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    if(fakeOffer.isPremium){
      expect(screen.getByText('Premium')).toBeInTheDocument();
    }

    const bookmarkSpan = screen.getByTestId(bookmarkButtonTextTestId);

    expect(screen.getByAltText(fakeOffer.type)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
    expect(screen.getByText(fakeOffer.type)).toBeInTheDocument();
    expect(screen.getByRole('button')).toContainElement(bookmarkSpan);
  });

  it('should dispatch postFavoriteAction', async () => {

    const fakeOffer = makeFakeOfferCard();

    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<FavoritePlaceCard offer={fakeOffer}/>, makeFakeStore({ USER: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: null,
      isLoginFormDasabled: false,
      email: ''
    }}));
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${fakeOffer.id}/${fakeOffer.isFavorite ? 1 : 0}`).reply(200, []);

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionsTypes(mockStore.getActions());

    expect(actions).toEqual([
      postFavoriteAction.pending.type,
      postFavoriteAction.rejected.type,
      //fetchFavoriteOffersAction.pending.type
    ]);
  });
});