import * as React from "react";

interface JsonLdProps {
  id: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Renders structured JSON-LD in a safe server-rendered <script> tag,
 * escaping "<" as "\u003c" per Next.js XSS prevention guidance.
 */
export function JsonLd({ id, data }: JsonLdProps) {
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}

