import { useState } from 'react'
import './ParabankHome.css'

import clearGif from './assets/clear.gif'
import logoGif from './assets/logo.gif'

/* parabank-home — rebuild of https://parabank.parasoft.com/parabank/index.htm
   Spec: final-playwright/outputs/parabank-home/spec/UI_SPEC.md
   DOM structure mirrors the legacy page so the parity spec's nth-of-type
   selectors resolve as well as the data-testid keys. */

/* UI_SPEC §5 — TopPanel.
   The two anchors carry no layout box of their own (0x0 in the capture): their
   only child is absolutely positioned, so the inline `a` collapses. That, not a
   display toggle, is why facts §12 reports them hidden — see §13 Q1 in README. */
function TopPanel() {
  return (
    <div id="topPanel">
      <a data-testid="link" href="/parabank/admin.htm">
        <img className="admin" src={clearGif} alt="" width={56} height={42} />
      </a>
      <a data-testid="link-parabank" href="/parabank/index.htm">
        <img className="logo" src={logoGif} alt="ParaBank" width={136} height={31} />
      </a>
      <p className="caption">Experience the difference</p>
    </div>
  )
}

/* UI_SPEC §5 — HeaderNav. Hover states are pure CSS (§8.1). */
const MENU = [
  { key: 'link-about-us', text: 'About Us', href: '/parabank/about.htm' },
  { key: 'link-services', text: 'Services', href: '/parabank/services.htm' },
  { key: 'link-products', text: 'Products', href: 'http://www.parasoft.com/jsp/products.jsp' },
  { key: 'link-locations', text: 'Locations', href: 'http://www.parasoft.com/jsp/pr/contacts.jsp' },
  { key: 'link-admin-page', text: 'Admin Page', href: '/parabank/admin.htm' },
]

const QUICK = [
  { key: 'link-home', cls: 'home', text: 'home', href: '/parabank/index.htm' },
  { key: 'link-about', cls: 'aboutus', text: 'about', href: '/parabank/about.htm' },
  { key: 'link-contact', cls: 'contact', text: 'contact', href: '/parabank/contact.htm' },
]

function HeaderNav() {
  return (
    <div id="headerPanel">
      <ul className="leftmenu">
        <li className="Solutions">Solutions</li>
        {MENU.map((m) => (
          <li key={m.key}>
            <a data-testid={m.key} href={m.href}>{m.text}</a>
          </li>
        ))}
      </ul>
      <ul className="button">
        {QUICK.map((q) => (
          <li key={q.key} className={q.cls}>
            <a data-testid={q.key} href={q.href}>{q.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* UI_SPEC §5, §6, §7 — LoginForm. No client-side validation: empty submit is
   allowed and posts to the server, same as legacy (§6, T01). */
function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div id="leftPanel">
      <h2>Customer Login</h2>
      <div id="loginPanel">
        {/* The three `login` divs each carry margin-bottom:10px, which is what
            produces the capture's y rhythm: 304 -> 333 -> 381 -> 411.13. */}
        <form method="post" action="/api/login">
          <p><b>Username</b></p>
          <div className="login">
            <input
              data-testid="text"
              className="input"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p><b>Password</b></p>
          <div className="login">
            <input
              data-testid="text-2"
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login">
            <input data-testid="button-log-in" className="button" type="submit" value="Log In" />
          </div>
        </form>
        <p>
          <a data-testid="link-forgot-login-info" href="/parabank/lookup.htm">Forgot login info?</a>
        </p>
        <p>
          <a data-testid="link-register" href="/parabank/register.htm">Register</a>
        </p>
      </div>
    </div>
  )
}

/* UI_SPEC §5 — ServicesPanel */
const WSDL = '/parabank/services/ParaBank?wsdl'
const WADL = '/parabank/services/bank?_wadl&_type=xml'

const ATM_SERVICES = [
  { key: 'link-withdraw-funds', text: 'Withdraw Funds' },
  { key: 'link-transfer-funds', text: 'Transfer Funds' },
  { key: 'link-check-balances', text: 'Check Balances' },
  { key: 'link-make-deposits', text: 'Make Deposits' },
]

const ONLINE_SERVICES = [
  { key: 'link-bill-pay', text: 'Bill Pay' },
  { key: 'link-account-history', text: 'Account History' },
  { key: 'link-transfer-funds-2', text: 'Transfer Funds' },
]

function ServicesPanel() {
  return (
    <>
      <span className="services" />
      <ul className="services">
        <li className="captionone">ATM Services</li>
        {ATM_SERVICES.map((s) => (
          <li key={s.key}>
            <a data-testid={s.key} href={WSDL}>{s.text}</a>
          </li>
        ))}
      </ul>
      <ul className="servicestwo">
        <li className="captiontwo">Online Services</li>
        {ONLINE_SERVICES.map((s) => (
          <li key={s.key}>
            <a data-testid={s.key} href={WADL}>{s.text}</a>
          </li>
        ))}
      </ul>
      <p className="more">
        <a data-testid="link-read-more" href="/parabank/services.htm">Read More</a>
      </p>
    </>
  )
}

/* UI_SPEC §5 — NewsPanel */
const NEWS = [
  { key: 'link-parabank-is-now-re-opened', text: 'ParaBank Is Now Re-Opened', href: '/parabank/news.htm#6' },
  { key: 'link-new-online-bill-pay', text: 'New! Online Bill Pay', href: '/parabank/news.htm#5' },
  { key: 'link-new-online-account-transfers', text: 'New! Online Account Transfers', href: '/parabank/news.htm#4' },
]

function NewsPanel() {
  return (
    <>
      <h4>Latest News</h4>
      <ul className="events">
        {/* ponytail: date literal from UI_SPEC §2.3. Legacy almost certainly renders
            "today", but the spec gives it verbatim and a live date would break the
            pixel diff against reference.png on any other day. Swap for a formatted
            new Date() if the backend starts supplying it. */}
        <li className="captionthree">10/16/2026</li>
        {NEWS.map((n) => (
          <li key={n.key}>
            <a data-testid={n.key} href={n.href}>{n.text}</a>
          </li>
        ))}
      </ul>
      <p className="more">
        <a data-testid="link-read-more-2" href="/parabank/news.htm">Read More</a>
      </p>
    </>
  )
}

/* UI_SPEC §5 — Footer */
const FOOTER_LINKS = [
  { key: 'link-home-2', text: 'Home', href: '/parabank/index.htm' },
  { key: 'link-about-us-2', text: 'About Us', href: '/parabank/about.htm' },
  { key: 'link-services-2', text: 'Services', href: '/parabank/services.htm' },
  { key: 'link-products-2', text: 'Products', href: 'http://www.parasoft.com/jsp/products.jsp' },
  { key: 'link-locations-2', text: 'Locations', href: 'http://www.parasoft.com/jsp/pr/contacts.jsp' },
  { key: 'link-site-map', text: 'Site Map', href: '/parabank/sitemap.htm' },
  { key: 'link-contact-us', text: 'Contact Us', href: '/parabank/contact.htm' },
]

function Footer() {
  return (
    <div id="footermainPanel">
      <div id="footerPanel">
        <ul>
          {FOOTER_LINKS.map((l, i) => (
            <li key={l.key}>
              <a data-testid={l.key} href={l.href}>{l.text}</a>
              {i < FOOTER_LINKS.length - 1 ? '|' : null}
            </li>
          ))}
        </ul>
        <p className="copyright">© Parasoft. All rights reserved.</p>
        <ul className="visit">
          <li>Visit us at:</li>
          <li>
            <a
              data-testid="link-www-parasoft-com"
              href="http://www.parasoft.com/"
              target="_blank"
              rel="noreferrer"
            >
              www.parasoft.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default function ParabankHome() {
  return (
    <>
      <div id="mainPanel">
        <TopPanel />
        <HeaderNav />
        {/* Legacy quirk, reproduced verbatim: #bodyPanel does not clear its floated
            children, so it stays 22px tall and #footermainPanel's clear:both is what
            pushes the footer below them. Do not add a clearfix. */}
        <div id="bodyPanel">
          <LoginForm />
          <div id="rightPanel">
            <ServicesPanel />
            <NewsPanel />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
