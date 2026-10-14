import { EMAIL, PHONE, PHONE_HREF } from '../contact';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span className="nav__mark">
          <span className="nav__mark-dot" />
          Sidak Mann
        </span>
        <p>North Scottsdale, AZ. Websites for local businesses, built and hosted end to end.</p>
        <span className="footer__contact">
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={PHONE_HREF}>{PHONE}</a>
        </span>
        <span className="footer__year">&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
