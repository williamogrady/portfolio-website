import { useEffect, useRef, useState } from "react";

import slideData from "../../data/slides";

const footerLinks = [
  {
    label: "Email William O'Grady",
    href: "mailto:billy.ogrady2001@gmail.com",
    icon: `${import.meta.env.BASE_URL}assets/icons/email.svg`,
  },
  {
    label: "William O'Grady on LinkedIn",
    href: "https://www.linkedin.com/in/williamjogrady",
    icon: `${import.meta.env.BASE_URL}assets/icons/linkedin.svg`,
    external: true,
  },
  {
    label: "William O'Grady on GitHub",
    href: "https://github.com/williamogrady",
    icon: `${import.meta.env.BASE_URL}assets/icons/github.svg`,
    external: true,
  },
];

export default function SiteFooter({
  modes,
  activeMode,
  onModeChange,
  visibility,
  modeGroupLabel = "Theme mode",
}) {
  const [footerHovered, setFooterHovered] = useState(false);
  const [footerCopied, setFooterCopied] = useState(false);
  const footerCopiedTimer = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(footerCopiedTimer.current);
  }, []);

  function copyFooterEmail() {
    const email = "billy.ogrady2001@gmail.com";

    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
    }

    window.clearTimeout(footerCopiedTimer.current);
    setFooterCopied(true);
    footerCopiedTimer.current = window.setTimeout(() => {
      setFooterCopied(false);
    }, 1400);
  }

  return (
    <footer
      className="deck-footer"
      style={{
        opacity: visibility,
        transform: `translateY(${(1 - visibility) * 18}px)`,
      }}
    >
      <p className="deck-footer__copyright">&copy; 2026 william o'grady </p>
      <div className="deck-footer__sky-modes" aria-label={modeGroupLabel}>
        {modes.map(mode => (
          <button
            key={mode.id}
            className={`deck-footer__sky-mode deck-footer__sky-mode--${mode.id}`}
            type="button"
            aria-label={`Use ${mode.label.toLowerCase()} mode`}
            aria-pressed={activeMode === mode.id}
            title={mode.label}
            onClick={() => onModeChange(mode.id)}
          >
            <span>{mode.label}</span>
          </button>
        ))}
      </div>
      <address>
        {footerLinks.map(link => {
          const isEmailLink = link.href.startsWith("mailto:");
          const iconSource = isEmailLink
            ? footerCopied
              ? slideData.about.checkIcon
              : footerHovered
                ? slideData.about.copyIcon
                : link.icon
            : link.icon;

          return isEmailLink ? (
            <button
              key={link.href}
              type="button"
              className="deck-footer__social-link"
              onClick={copyFooterEmail}
              onMouseEnter={() => setFooterHovered(true)}
              onMouseLeave={() => setFooterHovered(false)}
              onFocus={() => setFooterHovered(true)}
              onBlur={() => setFooterHovered(false)}
              aria-label="Copy email address to clipboard"
            >
              <img src={iconSource} alt="" aria-hidden="true" />
            </button>
          ) : (
            <a
              key={link.href}
              className="deck-footer__social-link"
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              aria-label={link.label}
            >
              <img src={link.icon} alt="" aria-hidden="true" />
            </a>
          );
        })}
      </address>
    </footer>
  );
}
