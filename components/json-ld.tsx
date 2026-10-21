type JsonLdData = object;

/** Server-rendered structured data. Callers must pass objects whose text matches the page. */
export function JsonLd({ data }: { data: JsonLdData }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
