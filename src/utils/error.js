
export function parseError(err) {
  const msg = err?.data?.message
    || err?.message
    || err.toString();

  const match = msg.match(/Error: VM Exception while processing transaction: reverted with reason string '(.*)'/);
  if (match) {
    return match[1];
  }

  return msg;
}
