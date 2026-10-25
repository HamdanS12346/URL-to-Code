import { useEffect, useRef, useState, type CSSProperties } from 'react'
import './PcceHome.css'
import {
  A, MENU, SOCIAL, ABOUT_TEXT, ABOUT_TILES, ABOUT_SLIDES, TICKER, COURSES,
  NEWS_SLIDES, QUICK_LINKS, IMPORTANT_LINKS, PLACEMENT_SLIDES, COUNTERS, POSTS, USEFUL_LINKS,
} from './data'

/* ---------------------------------------------------------------------------
   Carousels (UI_SPEC §14 M01, M02, M04, M05)
   Autoplay is a CSS keyframe animation, one step per `delay` ms with a
   `speed` ms slide. The capture's freeze parks CSS animations at time 0, so a
   frozen screenshot shows slide 0 exactly as the reference does.
   Arrows take over (disableOnInteraction: true) and then drive the transform.
--------------------------------------------------------------------------- */
type AutoPlay = { name: string; delay: number; speed: number; pitch: number; slides: number }

function keyframes({ name, delay, speed, pitch, slides }: AutoPlay) {
  const total = slides * delay
  const stops: string[] = []
  for (let i = 0; i <= slides; i++) {
    const hold = ((i * delay) / total) * 100
    const move = Math.min((((i * delay) + (delay - speed)) / total) * 100, 100)
    stops.push(`${hold.toFixed(4)}%,${move.toFixed(4)}%{transform:translate3d(${-i * pitch}px,0,0)}`)
  }
  return `@keyframes ${name}{${stops.join('')}}`
}

function useCarousel(n: number) {
  const [manual, setManual] = useState<number | null>(null)
  const step = (d: number) => setManual((m) => ((m ?? 0) + d + n) % n)
  return { manual, prev: () => step(-1), next: () => step(1) }
}

type CarouselProps = {
  auto: AutoPlay
  slides: string[]
  wrapClass: string
  slideClass: string
  prevKey: string
  nextKey: string
  region?: string
}

function Carousel({ auto, slides, wrapClass, slideClass, prevKey, nextKey, region }: CarouselProps) {
  const { manual, prev, next } = useCarousel(slides.length)
  const track: CSSProperties = manual === null
    ? { animation: `${auto.name} ${auto.slides * auto.delay}ms linear infinite` }
    : { transform: `translate3d(${-manual * auto.pitch}px,0,0)`, transition: `transform ${auto.speed}ms ease` }
  return (
    <div className={`carousel-wrapper ${wrapClass}`} role="region" aria-roledescription="carousel" aria-label={region}>
      <style>{keyframes(auto)}</style>
      <div className="carousel-viewport">
        <div className="carousel-track" style={track}>
          {slides.map((s, i) => (
            <div className={`carousel-slide ${slideClass}`} key={`${s}-${i}`}>
              <figure><img src={A(s)} alt="" /></figure>
            </div>
          ))}
        </div>
      </div>
      <div className="swiper-button swiper-button-prev" data-testid={prevKey} role="button" tabIndex={0}
           aria-label="Previous slide" onClick={prev}><i className="eicon eicon-chevron-left" /></div>
      <div className="swiper-button swiper-button-next" data-testid={nextKey} role="button" tabIndex={0}
           aria-label="Next slide" onClick={next}><i className="eicon eicon-chevron-right" /></div>
    </div>
  )
}

/* Counters (M07–M09): 0 → value over 2000ms once the counter enters the viewport. */
function Counter({ to, delimiter, suffix, label }: { to: number; delimiter: string; suffix: string; label: string }) {
  const [value, setValue] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = box.current
    if (!el) return
    let raf = 0
    const run = () => {
      const t0 = performance.now()
      const tick = () => {
        const p = Math.min((performance.now() - t0) / 2000, 1)
        setValue(Math.round(p * to))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); run() } })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])
  return (
    <div className="counter" ref={box}>
      <div className="counter-number-wrapper">
        <span className="counter-number-prefix" />
        <span className="counter-number">{value.toLocaleString('en-US').replace(/,/g, delimiter)}</span>
        <span className="counter-number-suffix">{suffix}</span>
      </div>
      <div className="counter-title">{label}</div>
    </div>
  )
}

/* The exad-link-anything wrappers are plain divs with a URL, not anchors. */
const open = (href: string | null, target?: '_blank') => () => {
  if (!href) return
  if (target) window.open(href, target)
  else window.location.href = href
}

export default function PcceHome() {
  /* M05: the post carousel pauses on hover (pauseOnHover: true). */
  const [postsPaused, setPostsPaused] = useState(false)
  const posts = useCarousel(POSTS.length)
  const postAuto: AutoPlay = { name: 'kf-posts', delay: 3000, speed: 300, pitch: 324, slides: POSTS.length }
  const postTrack: CSSProperties = posts.manual === null
    ? { animation: `kf-posts ${POSTS.length * 3000}ms linear infinite`, animationPlayState: postsPaused ? 'paused' : 'running' }
    : { transform: `translate3d(${-posts.manual * 324}px,0,0)`, transition: 'transform 300ms ease' }

  return (
    <div id="outer-wrap">
      <a className="skip-link" href="#main" data-testid="link-skip-to-content">Skip to content</a>
      <div id="wrap">

        {/* ---------------- §2.1 Header + §2.2 main menu ---------------- */}
        <div className="header-band">
          <div className="header-inner">
            <div className="header-row1">
              <div className="header-logo-col">
                <a href="https://pccegoa.edu.in" data-testid="link" aria-label="Padre Conceição College Of Engineering — home">
                  <img src={A('assets/wp-content/uploads/2026/08/PCCE-Logo_rgb-02-1024x389.png')} alt="" />
                </a>
              </div>
              <div className="header-title-col">
                <h2 className="header-line">Society of the missionaries of St.Francis Xavier, Pilar, Goa, Agnel Region</h2>
                <h1 className="header-name">Padre Conceição College Of Engineering</h1>
                <div className="header-line-wrap">
                  <h2 className="header-line">Managed by Agnel Charities, Approved by AICTE and Affiliated to Goa University</h2>
                </div>
              </div>
              {SOCIAL.map((s) => (
                <div className="header-social-col" key={s.label}>
                  <div className="header-social-box">
                    {s.href
                      ? <a className="social-icon" href={s.href} data-testid={s.key!} aria-label={s.label}>{s.icon}</a>
                      /* no href in the capture: kept as the plain div it is */
                      : <div className="social-icon" aria-label={s.label} role="img">{s.icon}</div>}
                  </div>
                </div>
              ))}
            </div>
            <nav className="menu-row" aria-label="MAIN_MENU" data-testid="button-p-logo-pcce">
              <div className="menu-container">
                <ul className="menu-nav" role="menubar">
                  {MENU.map((m) => (
                    <li key={m.key} role="none">
                      <a role="menuitem" className={`menu-link${m.active ? ' active' : ''}`} href={m.href} data-testid={m.key}>
                        {m.label}
                        {m.chevron && <i className="ekit-chevron" />}
                      </a>
                      {/* §9 sub-menu panels: structure is a known gap (open question 1) */}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <main id="main">

          {/* ---------------- §2.3 Hero ---------------- */}
          <section className="band hero-band">
            <div className="hero-slider" data-testid="button-slider" role="region" aria-label="Slider" tabIndex={0}>
              <img className="hero-image" src={A('assets/wp-content/uploads/slider/cache/73cc096d06524d84a8c5c1df97d34b02/PCCE-PHOTO.jpg')} alt="" />
              <div className="hero-limiter">
                <div className="hero-slide">
                  <div className="hero-content">
                    <div className="hero-panel">
                      <div className="hero-panel-inner">
                        <div className="hero-heading">Degree and Masters Courses in Engineering</div>
                        <p className="hero-paragraph">Being Goa's 1st private engineering college, PCCE provides a range of engineering courses and is committed to producing top quality engineers!</p>
                        <div className="hero-button-container">
                          <a className="hero-button" href="https://pccegoa.edu.in/#Courses" data-testid="link-go-to-available-courses">
                            <div><div>Go to available courses</div></div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-note" role="note" data-testid="note-slide-1">Slide 1</div>
            </div>
          </section>

          {/* ---------------- §2.4 About Us ---------------- */}
          <section className="band about-band">
            <div className="about-container">
              <div className="about-left">
                <div className="about-heading-wrap"><h2 className="about-heading">About Us</h2></div>
                <div className="about-text-wrap"><p className="about-text">{ABOUT_TEXT}</p></div>
                <div className="about-tiles-wrap">
                  <div className="about-tiles">
                    {ABOUT_TILES.map((t) => (
                      <div className="about-tile-col" key={t.key}>
                        <div className="about-tile">
                          <a href={t.href} data-testid={t.key} aria-label={t.label}>
                            <img src={A(t.img)} alt="" />
                          </a>
                          <div className="image-grid-content">
                            <div className="hover-action">
                              <a href={t.href} data-testid={t.readMoreKey}>Read More</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="about-right">
                <div className="about-carousel-wrap">
                  <Carousel
                    auto={{ name: 'kf-about', delay: 5000, speed: 500, pitch: 1074, slides: ABOUT_SLIDES.length }}
                    slides={ABOUT_SLIDES}
                    wrapClass="about-carousel"
                    slideClass="about-slide"
                    prevKey="button-previous-slide"
                    nextKey="button-next-slide"
                    region="About Us images"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- §2.5 Newsline ticker (M10, M11) ---------------- */}
          <section className="band ticker-band">
            <div className="ticker-container">
              <div className="ticker-widget">
                <div className="news-ticker">
                  <div className="bn-label"><div className="nt-label">Newsline</div></div>
                  <div className="nt-news">
                    <ul className="nt-list">
                      {TICKER.map((t) => (
                        <li key={t.key}><a href={t.href} data-testid={t.key}>{t.text}</a></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- §2.6 Courses heading ---------------- */}
          <section className="band heading-band" id="Courses" data-testid="Courses">
            <div className="heading-overlay"><h2 className="band-heading">Courses</h2></div>
          </section>

          {/* ---------------- §2.7 Course cards ---------------- */}
          <section className="band cards-band">
            <div className="cards-container">
              {COURSES.map((c) => (
                <div className="card-col" key={c.key}>
                  <div className="card-wrapper" data-testid={c.key} onClick={open(c.href, '_blank')}>
                    <div className="exad-card">
                      <div className="exad-card-thumb"><img src={A(c.img)} alt="" /></div>
                      <div className={`exad-card-badge${c.master ? ' master' : ''}`}>{c.badge}</div>
                      <div className="exad-card-body">
                        <a className="exad-card-title" href={c.href} target="_blank" rel="noreferrer" data-testid={c.titleKey}>{c.title}</a>
                        <div className="exad-card-description">{c.text}</div>
                        <a className="exad-card-action" href={c.href} target="_blank" rel="noreferrer" data-testid={c.learnKey}>
                          <span>Learn More</span>
                          <span className="exad-button-icon-wrapper"><i className="fa-graduation-cap" /></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- §2.8 PCCE Newsline + quick links ---------------- */}
          <section className="band newsline-band">
            <div className="newsline-container">
              <div className="newsline-left">
                <div className="newsline-title-wrap"><h2 className="band-heading">PCCE Newsline</h2></div>
                <Carousel
                  auto={{ name: 'kf-news', delay: 5000, speed: 500, pitch: 1314, slides: NEWS_SLIDES.length }}
                  slides={NEWS_SLIDES}
                  wrapClass="news-carousel"
                  slideClass="news-slide"
                  prevKey="button-previous-slide-2"
                  nextKey="button-next-slide-2"
                  region="PCCE Newsline posters"
                />
              </div>
              <div className="newsline-right">
                {QUICK_LINKS.map((q) => (
                  <div className="quick-link" key={q.key} data-testid={q.key} onClick={open(q.href)}>
                    <img className="anim-hang" src={A(q.img)} alt={q.label} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------- §2.9 Important Links ---------------- */}
          <section className="band heading-band">
            <div className="heading-overlay"><h2 className="band-heading">Important Links</h2></div>
          </section>
          <section className="band links-band">
            <div className="links-container">
              {IMPORTANT_LINKS.map((l) => (
                <div className="link-col" key={l.caption}>
                  <div className="link-tile" {...(l.wrapperKey ? { 'data-testid': l.wrapperKey } : {})}
                       onClick={open(l.wrapperHref ?? l.innerHref)}>
                    {l.innerKey
                      ? <a href={l.innerHref!} data-testid={l.innerKey} aria-label={l.caption}>
                          <img className="anim-hang" src={A(l.img)} alt="" />
                        </a>
                      : <img className="anim-hang" src={A(l.img)} alt="" />}
                  </div>
                  <div className="link-caption"><h6>{l.caption}</h6></div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------------- §2.10 Placements ---------------- */}
          <section className="band heading-band">
            <div className="heading-overlay"><h2 className="band-heading">Placements</h2></div>
          </section>
          <section className="band placements-band">
            <div className="placements-container">
              <div className="placements-left">
                <Carousel
                  auto={{ name: 'kf-placements', delay: 5000, speed: 500, pitch: 378, slides: PLACEMENT_SLIDES.length }}
                  slides={PLACEMENT_SLIDES}
                  wrapClass="placement-carousel"
                  slideClass="placement-slide"
                  prevKey="button-previous-slide-4"
                  nextKey="button-next-slide-4"
                  region="Placement posters"
                />
              </div>
              <div className="placements-right">
                {COUNTERS.map((c) => <Counter key={c.label} {...c} />)}
              </div>
            </div>
          </section>

          {/* ---------------- §2.11 Campus Activities ---------------- */}
          <section className="band heading-band">
            <div className="heading-overlay"><h2 className="band-heading">Campus Activities</h2></div>
          </section>
          <section className="band campus-band">
            <div className="campus-container">
              <div className="campus-left">
                <div className="video-wrap">
                  <iframe
                    className="campus-video"
                    data-testid="widget2"
                    title="Campus activities"
                    src="https://www.youtube.com/embed/N1zF4ACp-u8?controls=1&rel=0&playsinline=0&cc_load_policy=0&autoplay=0&enablejsapi=1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="campus-right">
                <div className="post-carousel-wrapper"
                     onMouseEnter={() => setPostsPaused(true)}
                     onMouseLeave={() => setPostsPaused(false)}>
                  <style>{keyframes(postAuto)}</style>
                  <button className="post-arrow post-prev" data-testid="button-previous" aria-label="Previous" onClick={posts.prev}>
                    <i className="fa-angle-left" />
                  </button>
                  <div className="slick-list" data-testid="button-28">
                    <div className="slick-track" style={postTrack}>
                      {POSTS.map((p) => (
                        <div className="post-slide-outer" key={p.key}>
                          <div className="post-slide">
                            <a className="post-image" href={p.href} data-testid={p.imgKey} aria-label={p.title}>
                              <img src={A(p.img)} alt="" />
                            </a>
                            <div className="post-content">
                              <div className="post-inner">
                                <ul className="post-meta">
                                  <li><i className="fa-clock" />{p.date}</li>
                                </ul>
                                <h2><a href={p.href} data-testid={p.key}>{p.title}</a></h2>
                                <div className="post-btn">
                                  <a className="readmore-btn" href={p.href} data-testid={p.readMoreKey}>Read More</a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="post-arrow post-next" data-testid="button-next" aria-label="Next" onClick={posts.next}>
                    <i className="fa-angle-right" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ---------------- §2.12 Footer ---------------- */}
        <div className="footer-band">
          <div className="footer-container">
            <div className="footer-col footer-col-address">
              <div className="footer-heading-wrap"><h2 className="footer-heading">POSTAL ADDRESS</h2></div>
              <div className="footer-text">
                <p>The Principal,<br />Padre Conceição College Of Engineering,<br />Agnel Technical Education Complex,<br />Agnelganv,<br />Verna Goa, 403722, INDIA</p>
                <p>Administration: 0832-2791267<br />Exam Cell: 0832-2791266</p>
                <p>Email: agnelpcce@gmail.com&#8203;</p>
              </div>
            </div>
            <div className="footer-col footer-col-links">
              <div className="footer-heading-wrap"><h2 className="footer-heading">USEFUL LINKS</h2></div>
              <div className="footer-list-wrap">
                <ul className="footer-list">
                  {USEFUL_LINKS.map((l) => (
                    <li className="footer-list-item" key={l.text}>
                      {l.href
                        ? <a href={l.href} data-testid={l.key!}>
                            <span className="footer-list-icon"><i className="ri-link" /></span>
                            <span className="footer-list-text">{l.text}</span>
                          </a>
                        /* no href in the capture (open question 8) */
                        : <>
                            <span className="footer-list-icon"><i className="ri-link" /></span>
                            <span className="footer-list-text">{l.text}</span>
                          </>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="footer-col footer-col-contacts">
              <div className="footer-heading-wrap"><h2 className="footer-heading">Important Contacts</h2></div>
              <div className="footer-text footer-contacts">
                <ul>
                  <li>Tele MANAS: 14416 OR 18008914416</li>
                  <li>Drug De-addiction Helpline: 14446</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <a id="scroll-top" href="#outer-wrap" data-testid="scroll-top" aria-label="Scroll to the top">Scroll to the top</a>
      </div>
    </div>
  )
}
