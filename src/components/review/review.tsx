import {Review} from '../../types/review-type';
import {getStarsStyle} from '../../common';


type ReviewProps = {
  review: Review;
}

function ReviewItem(props: ReviewProps): JSX.Element {
  const {review} = props;
  const options:Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };
  return(
    <li className="reviews__item" data-testid="review-item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            data-testid="avatar"
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: getStarsStyle(review.rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>
          {new Date(review.date)
            .toLocaleString('en-US', options)}
        </time>
      </div>
    </li>
  );
}
export default ReviewItem;
