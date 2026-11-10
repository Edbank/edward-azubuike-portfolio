const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function renderPlaygroundHome({ header, footer, projects, esc = escapeHtml, arrow = '<span aria-hidden="true">↗</span>' }) {
  const projectCard = (project, index) => {
    const featured = index === 0;
    const tone = ['lime','violet','orange','blue','paper','ink'][index % 6];
    const imageAlt = project.alt || project.name + ' project interface preview';
    return `
      <article class="play-project play-project--${featured ? 'feature' : 'standard'} tone-${tone}" data-reveal>
        <a class="play-project__link" href="/work/${esc(project.slug)}/" aria-label="Explore the ${esc(project.name)} case study">
          <div class="play-project__visual">
            <div class="play-project__meta"><span>${esc(project.number)} / ${esc(project.type)}</span><span>OPEN CASE STUDY ↗</span></div>
            <div class="play-project__image"><img src="/assets/${esc(project.image)}" alt="${esc(imageAlt)}" loading="lazy" decoding="async"></div>
            <span class="play-project__sticker" aria-hidden="true">MADE<br>TO WORK <span>↗</span></span>
          </div>
          <div class="play-project__info">
            <div><p class="eyebrow">${esc(project.focus || project.type)}</p><h3>${esc(project.name)} <span aria-hidden="true">↗</span></h3><p>${esc(project.summary)}</p><span class="play-project__descriptor">${esc(project.platform)} · ${esc(project.status)}</span></div>
            <span class="play-project__index">0${index + 1}</span>
          </div>
        </a>
      </article>`;
  };

  return `
  ${header()}
  <main id="main" class="playground">
    <section class="play-hero" aria-labelledby="hero-title">
      <div class="play-hero__grain" aria-hidden="true"></div>
      <div class="play-hero__topline"><span><i class="status-pulse"></i> INDEPENDENT DESIGN PRACTICE</span><span>LAGOS, NG · OPEN TO GOOD PROJECTS</span></div>
      <div class="play-hero__composition">
        <div class="play-hero__copy">
          <p class="play-kicker"><span>PRODUCT DESIGN</span><span>INTERACTION</span><span>EXPERIMENTATION</span></p>
          <h1 id="hero-title">I MAKE<br><span class="hero-word hero-word--lime" data-scramble>DIGITAL</span><br>THINGS<span class="hero-period">.</span><br><em>THAT MAKE<br>SENSE.</em></h1>
          <p class="play-hero__intro">I'm Edward Azubuike — a Product Designer turning complex ideas into clear, useful and memorable digital experiences.</p>
          <div class="play-hero__actions"><a class="play-button play-button--lime" href="#work">ENTER THE WORK <span aria-hidden="true">↘</span></a><a class="play-text-link" href="mailto:eddyzubik98@gmail.com">HAVE A PROJECT? LET'S TALK ↗</a></div>
        </div>
        <div class="play-hero__art" aria-label="Portrait of Edward Azubuike integrated into an abstract graphic composition">
          <div class="orbit orbit--one" aria-hidden="true"></div><div class="orbit orbit--two" aria-hidden="true"></div>
          <div class="hero-orb hero-orb--lime" aria-hidden="true"><span>MAKE</span></div><div class="hero-orb hero-orb--violet" aria-hidden="true"><span>IDEAS</span></div>
          <div class="hero-portrait"><img src="/assets/profile/edward.webp" alt="Edward Azubuike" width="640" height="800" fetchpriority="high"></div>
          <div class="hero-portrait__frame" aria-hidden="true"></div>
          <div class="hero-sticker hero-sticker--top" aria-hidden="true"><span>EA®</span><small>MADE OF<br>IDEAS</small></div>
          <div class="hero-sticker hero-sticker--bottom" aria-hidden="true"><span>✳</span><small>THINK<br>DIFFERENT</small></div>
          <span class="hero-coordinate" aria-hidden="true">06°30' N / 03°23' E</span>
          <span class="hero-art-caption" aria-hidden="true">A LITTLE ORDER.<br>A LOT OF CURIOSITY.</span>
        </div>
      </div>
      <div class="play-hero__bottom"><span>SCROLL AROUND. TOUCH THINGS. GET CURIOUS.</span><a href="#manifesto" aria-label="Scroll to the manifesto">KEEP GOING <span aria-hidden="true">↓</span></a><span>VOL. 01 — 2026</span></div>
    </section>

    <div class="play-marquee" aria-label="Product design, interaction design, creative experiments">
      <div class="play-marquee__track" aria-hidden="true"><span>PRODUCT DESIGN</span><b>✣</b><span>INTERACTION</span><b>✣</b><span>VISUAL THINKING</span><b>✣</b><span>CREATIVE EXPERIMENTS</span><b>✣</b><span>PRODUCT DESIGN</span><b>✣</b><span>INTERACTION</span><b>✣</b><span>VISUAL THINKING</span><b>✣</b><span>CREATIVE EXPERIMENTS</span><b>✣</b></div>
    </div>

    <section class="play-manifesto" id="manifesto" aria-labelledby="manifesto-title">
      <div class="play-section-label"><span>01 / A SMALL MANIFESTO</span><span>THE WHY BEHIND THE WHAT</span></div>
      <div class="manifesto-layout">
        <div class="manifesto-aside"><span class="manifesto-mark">✳</span><p>GOOD DESIGN<br>SHOULD FEEL<br>LIKE SOMETHING.</p><span class="manifesto-aside__index">EA / 001</span></div>
        <div class="manifesto-main"><h2 id="manifesto-title">GOOD DESIGN ISN'T JUST HOW IT LOOKS.<br><span>IT'S WHAT IT MAKES POSSIBLE.</span></h2><div class="manifesto-foot"><p>I'm interested in the space between imagination and usability. I question familiar patterns, explore unexpected directions and turn real problems into experiences people can understand and use.</p><span class="manifesto-scribble" aria-hidden="true">stay curious ↗</span></div></div>
      </div>
      <div class="manifesto-stamp" aria-hidden="true">IDEAS<br>INTO<br>IMPACT</div>
    </section>

    <section class="play-work" id="work" aria-labelledby="work-title">
      <div class="play-section-label"><span>02 / SELECTED WORK</span><span>REAL PROBLEMS. THOUGHTFUL RESPONSES.</span></div>
      <div class="play-work__heading"><h2 id="work-title">A FEW THINGS<br>I'VE <em>PUT INTO THE WORLD.</em></h2><p>Different contexts, different constraints, one consistent obsession: making the next step clearer.</p></div>
      <div class="play-project-grid">${projects.map(projectCard).join('')}</div>
      <div class="play-work__note"><span>MORE WORK, MORE QUESTIONS, MORE TO COME.</span><a href="https://www.behance.net/eddyzubik98" target="_blank" rel="noopener noreferrer">FIND ME ON BEHANCE ↗</a></div>
    </section>

    <section class="play-lab" id="lab" aria-labelledby="lab-title">
      <div class="play-section-label play-section-label--light"><span>03 / THE EXPERIMENT LAB</span><span>NO BRIEF. JUST CURIOSITY.</span></div>
      <div class="play-lab__intro"><p class="play-lab__eyebrow">A WORK IN PROGRESS IS STILL A WORK.</p><h2 id="lab-title">NOT EVERYTHING<br>NEEDS A <em>BRIEF.</em></h2><p>This corner is for the things that don't fit neatly into a case study: interaction studies, motion tests, visual ideas and happy accidents.</p></div>
      <div class="lab-playground">
        <div class="lab-playground__top"><span>PLAY OBJECT / 001</span><span>DRAG THE SHAPE · REMIX THE TYPE</span><span class="lab-live"><i></i> LIVE</span></div>
        <div class="lab-canvas" id="lab-canvas">
          <span class="lab-canvas__coordinate lab-canvas__coordinate--one">EXPERIMENT 001</span><span class="lab-canvas__coordinate lab-canvas__coordinate--two">NO RULES / JUST PLAY</span>
          <div class="lab-type" id="lab-type" aria-live="polite"><span>MAKE</span><span>GOOD</span><span>NOISE<span class="lab-type__dot">.</span></span></div>
          <button class="lab-shape" id="lab-shape" type="button" aria-label="Move the experimental shape. Activate to remix its form"><span></span><i>DRAG<br>ME</i></button>
          <div class="lab-orbit" aria-hidden="true"></div><span class="lab-canvas__scribble" aria-hidden="true">ideas don't<br>sit still ↗</span>
        </div>
        <div class="lab-playground__bottom"><span>ONE LITTLE INTERACTION. ENDLESS DIRECTIONS.</span><button class="lab-remix" id="lab-remix" type="button">REMIX THE COMPOSITION <span aria-hidden="true">↻</span></button></div>
      </div>
      <div class="lab-coming"><span>EXPERIMENTATION IS PART OF THE PROCESS.</span><p>Interaction studies, motion tests and visual systems — built to explore an idea, not fill a gallery.</p></div>
    </section>

    <section class="play-about" id="about" aria-labelledby="about-title">
      <div class="play-section-label"><span>04 / THE HUMAN BIT</span><span>NOT JUST PIXELS AND PROTOTYPES</span></div>
      <div class="play-about__grid">
        <div class="about-graphic" aria-hidden="true"><span class="about-graphic__ring"></span><span class="about-graphic__cross">✳</span><span class="about-graphic__label">EDWARD<br>AZUBUIKE</span><span class="about-graphic__number">EA / 026</span></div>
        <div class="play-about__copy"><p class="play-kicker">HELLO, I'M EDWARD.</p><h2 id="about-title">CURIOUS BY<br>NATURE.<br><em>DESIGNER BY<br>CHOICE.</em></h2><p class="play-about__lead">I'm Edward Ebube Azubuike, a Product Designer based in Nigeria. I work across digital products, from transportation and financial tools to productivity and AI experiences.</p><p>I care about the reasoning behind an interface as much as its visual finish. I like exploring unusual directions, but I believe creativity is strongest when it helps someone do something better.</p><a class="play-text-link play-text-link--dark" href="/edward-azubuike-cv.pdf">A LITTLE MORE ABOUT MY JOURNEY ↗</a></div>
      </div>
    </section>

    <section class="play-toolkit" aria-labelledby="toolkit-title">
      <div class="play-section-label"><span>05 / WHAT I BRING</span><span>THINKING BEFORE TOOLING</span></div>
      <div class="play-toolkit__heading"><h2 id="toolkit-title">THE TOOLKIT<br>IS <em>JUST THE START.</em></h2><p>My focus is on the decisions, systems and details that turn an idea into a usable product.</p></div>
      <div class="toolkit-grid">
        <div class="toolkit-item"><span>01</span><strong>Product thinking</strong><small>Problem framing / product logic</small></div>
        <div class="toolkit-item"><span>02</span><strong>UX design</strong><small>Flows / information architecture</small></div>
        <div class="toolkit-item"><span>03</span><strong>Interface craft</strong><small>Visual systems / responsive UI</small></div>
        <div class="toolkit-item"><span>04</span><strong>Interaction</strong><small>Prototyping / motion studies</small></div>
        <div class="toolkit-item"><span>05</span><strong>Collaboration</strong><small>Handoff / iteration / feedback</small></div>
        <div class="toolkit-item"><span>06</span><strong>Exploration</strong><small>Creative coding / AI-assisted tools</small></div>
      </div>
      <div class="toolkit-tools"><span>IN THE MIX</span><b>FIGMA</b><b>FRAMER</b><b>JITTER</b><b>HTML / CSS</b><b>AI TOOLS</b></div>
    </section>

    <section class="play-cta" aria-labelledby="cta-title">
      <div class="play-cta__shape" aria-hidden="true">✳</div>
      <div class="play-section-label play-section-label--light"><span>06 / YOUR TURN</span><span>THE PLAYGROUND IS OPEN</span></div>
      <p class="play-cta__kicker">GOT SOMETHING INTERESTING?</p><h2 id="cta-title">LET'S MAKE<br><em>SOMETHING</em><br>MATTER.</h2>
      <div class="play-cta__bottom"><p>Good problems. Curious people. Thoughtful products.<br>That's a pretty good place to start.</p><a href="mailto:eddyzubik98@gmail.com">SAY HELLO <span aria-hidden="true">↗</span></a></div>
    </section>
  </main>
  ${footer()}
  <div class="play-cursor" aria-hidden="true"><span></span></div>`;
}
