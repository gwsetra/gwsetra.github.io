#!/usr/bin/env python3
import os
import re
import sys
import zlib

PROHIBITED_PATTERNS = [
    # UK phone numbers formatted, unformatted, hyphenated, dot-separated, or with (0)
    re.compile(r'(?:\+44\s*(?:\(0\)\s*)?7[\d\s.-]{8,12}|\b07[\d\s.-]{9,13}\b)'),
    # Indonesian phone numbers formatted, unformatted, hyphenated, or with (0)
    re.compile(r'(?:\+62\s*(?:\(0\)\s*)?8[\d\s.-]{8,13}|\b08[\d\s.-]{9,14}\b)'),
    # UK Residential Postcodes
    re.compile(r'\b[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}\b', re.IGNORECASE),
]

def check_text(content: str, filepath: str) -> list:
    findings = []
    for pattern in PROHIBITED_PATTERNS:
        matches = pattern.findall(content)
        if matches:
            findings.append((pattern.pattern, matches))
    return findings

def inspect_pdf(filepath: str) -> list:
    findings = []
    with open(filepath, 'rb') as f:
        data = f.read()
    raw_str = data.decode('latin1', errors='ignore')
    findings.extend(check_text(raw_str, filepath))
    stream_matches = re.findall(b'stream[\r\n]+(.*?)[\r\n]+endstream', data, re.DOTALL)
    for stream in stream_matches:
        try:
            decompressed = zlib.decompress(stream)
            dec_str = decompressed.decode('latin1', errors='ignore')
            findings.extend(check_text(dec_str, filepath))
        except Exception:
            try:
                decompressed = zlib.decompress(stream.strip())
                dec_str = decompressed.decode('latin1', errors='ignore')
                findings.extend(check_text(dec_str, filepath))
            except Exception:
                pass
    return findings

def scan_directory(directory: str) -> int:
    errors = 0
    if not os.path.exists(directory):
        return 0
    for root, _, files in os.walk(directory):
        for file in files:
            path = os.path.join(root, file)
            if file.endswith(('.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.woff', '.woff2', '.ttf')):
                continue
            if file.endswith('.pdf'):
                hits = inspect_pdf(path)
            else:
                try:
                    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                        hits = check_text(f.read(), path)
                except Exception as e:
                    continue
            if hits:
                print(f"[PII VIOLATION] Prohibited pattern found in {path}: {hits}")
                errors += 1
    return errors

if __name__ == '__main__':
    dirs_to_scan = ['src', 'public', 'dist']
    total_errors = sum(scan_directory(d) for d in dirs_to_scan)
    if total_errors > 0:
        print(f"\nFAILURE: {total_errors} file(s) contained prohibited PII!")
        sys.exit(1)
    print("SUCCESS: 0 PII patterns found across src/, public/, and dist/.")
    sys.exit(0)
