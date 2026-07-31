import React from 'react';

type AppLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string;
};

const getBasePath = () => {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : `${base}/`;
};

export const toAppHref = (to: string) => {
  if (/^(https?:)?\/\//.test(to) || to.startsWith('mailto:') || to.startsWith('#')) {
    return to;
  }

  const base = getBasePath();
  const path = to.startsWith('/') ? to.slice(1) : to;
  return `${base}${path}`;
};

export const getAppPath = () => {
  const base = getBasePath();
  let pathname = window.location.pathname;

  if (base !== '/' && pathname.startsWith(base)) {
    pathname = pathname.slice(base.length - 1);
  }

  return pathname || '/';
};

export const Link = ({ to, onClick, target, ...props }: AppLinkProps) => {
  const href = toAppHref(to);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      target ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 ||
      /^(https?:)?\/\//.test(to) ||
      to.startsWith('mailto:') ||
      to.startsWith('#')
    ) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return <a href={href} target={target} onClick={handleClick} {...props} />;
};
