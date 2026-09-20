import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import './notFound.css';

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__content">
        <p className="not-found-page__eyebrow">Error 404</p>
        <h1>Page not found</h1>
        <p className="not-found-page__message">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <div className="not-found-page__actions">
          <Link to={ROUTES.HOME} className="not-found-page__button not-found-page__button--primary">
            Back to home
          </Link>
          <Link to={ROUTES.LOGIN} className="not-found-page__button not-found-page__button--secondary">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
