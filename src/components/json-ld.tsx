export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // JSON.stringify alone doesn't escape HTML-unsafe sequences like `</script>`,
  // `<!--`, or `&`. Unicode-escape them so the browser's HTML tokenizer never
  // misreads the script tag boundary regardless of what Sanity content contains.
  const safeJson = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  )
}
