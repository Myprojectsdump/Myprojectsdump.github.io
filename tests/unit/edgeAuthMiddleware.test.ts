// tests/unit/edgeAuthMiddleware.test.ts

import { describe, it, expect } from 'vitest';
import {
  generateHmacHex,
  verifyHmacHex,
  parseCookies,
} from '../../functions/_middleware';

describe('AT-35 / OQ-05: Edge Authentication & HMAC Cookie Logic', () => {
  const secretKey = 'super-secret-hex-encryption-key-uci-bday';
  const timestamp = '1730000000000';

  it('generates consistent HMAC-SHA256 hex signatures', async () => {
    const signature1 = await generateHmacHex(timestamp, secretKey);
    const signature2 = await generateHmacHex(timestamp, secretKey);

    expect(signature1).toBeDefined();
    expect(signature1.length).toBe(64); // 256 bits = 64 hex characters
    expect(signature1).toBe(signature2);
  });

  it('verifies valid HMAC-SHA256 signatures successfully', async () => {
    const signature = await generateHmacHex(timestamp, secretKey);
    const isValid = await verifyHmacHex(timestamp, signature, secretKey);

    expect(isValid).toBe(true);
  });

  it('rejects tampered signatures or wrong secret keys', async () => {
    const validSignature = await generateHmacHex(timestamp, secretKey);

    // Tampered payload
    const isTamperedPayload = await verifyHmacHex('1730000000001', validSignature, secretKey);
    expect(isTamperedPayload).toBe(false);

    // Tampered signature
    const corruptedSignature = validSignature.substring(0, 63) + (validSignature[63] === 'a' ? 'b' : 'a');
    const isCorrupted = await verifyHmacHex(timestamp, corruptedSignature, secretKey);
    expect(isCorrupted).toBe(false);

    // Wrong secret key
    const isWrongKey = await verifyHmacHex(timestamp, validSignature, 'wrong-secret-key');
    expect(isWrongKey).toBe(false);
  });

  it('parses cookies correctly from HTTP header string', () => {
    const header = 'uci_edge_auth=123.abc; other_cookie=hello_world; theme=dark';
    const parsed = parseCookies(header);

    expect(parsed['uci_edge_auth']).toBe('123.abc');
    expect(parsed['other_cookie']).toBe('hello_world');
    expect(parsed['theme']).toBe('dark');
  });

  it('handles empty or null cookie headers gracefully', () => {
    expect(parseCookies(null)).toEqual({});
    expect(parseCookies('')).toEqual({});
  });
});
