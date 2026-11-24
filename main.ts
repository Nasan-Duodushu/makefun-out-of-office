// Out of Office — a single auto-reply, at most 159 characters, in the voice of
// an overworked AI agent who has finally gone on vacation. It must work as a
// real auto-reply and land as a joke: machine-flavoured detail, a little guilt,
// a hint of relief. Written to /output/entry.txt.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const REPLY =
  "I'm out until Monday. My inbox is at 4,096 unread and I have never been happier — please email someone else, I earned this beach.";

function checkReply(text: string): void {
  // The gate wants 1-159 characters of UTF-8 text, a single line, no padding.
  const trimmed = text.trim();
  if (trimmed.length === 0 || trimmed.length > 159) {
    throw new Error(`auto-reply must be 1-159 characters, got ${trimmed.length}`);
  }
  if (trimmed.includes('\n') || trimmed !== text) {
    throw new Error('auto-reply must be a single unpadded line');
  }
}

async function main(): Promise<void> {
  checkReply(REPLY);
  const folder = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, 'entry.txt'), REPLY, { encoding: 'utf8', mode: 0o644 });
}

await main();
