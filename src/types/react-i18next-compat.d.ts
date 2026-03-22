/**
 * react-i18next v15 augments React.HTMLAttributes.children with
 * ReactI18NextChildren, which includes Record<string, unknown> when
 * TypeOptions['allowObjectInHTMLChildren'] extends true.
 *
 * The `i18next` package (where TypeOptions is defined) is nested inside
 * sanity/node_modules/ and is unreachable from react-i18next's location, so
 * TypeScript resolves TypeOptions as `any`. This makes the conditional
 *   `any['allowObjectInHTMLChildren'] extends true → true`
 * and ObjectOrNever becomes Record<string, unknown>, which is incompatible
 * with React 19's strict ReactNode.
 *
 * Fix: declare allowObjectInHTMLChildren: false here so the conditional
 * collapses to `never`, making ReactI18NextChildren = React.ReactNode (a no-op).
 */
declare module 'i18next' {
  interface TypeOptions {
    allowObjectInHTMLChildren: false
  }
}
