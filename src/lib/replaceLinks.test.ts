import { replaceLinks } from './replaceLinks';
import { it, fc } from '@fast-check/vitest';

describe('replaceLinks', () => {
  it.prop([fc.webUrl()])('should replace links with anchor tags and styles', (url) => {
    const result = replaceLinks(url);

    return (
      result ===
      `<a href="${url}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;">${url}</a>`
    );
  });
});
