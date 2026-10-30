<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep cover-specific styling scoped to `.valle-cover` and use a separate cover asset from catalog vehicle images so presentation changes do not alter inventory photos.
- Use an in-flow, single-column cover grid through the tablet breakpoint, with content followed by a proportionate image; preserve desktop overlay rules above it to avoid small-screen overlap without changing desktop composition.
- Store all catalog/detail vehicle records in `src/lib/vehicles.ts`, and verified social contacts in `src/lib/socials.ts`, so both views share facts without duplicating inventory or contact data.
- Keep public category options and category labels centralized with vehicle records; preserve legacy vehicle classifications under the all-items view instead of falsely assigning inventory to a new category.
- Use the shared ValleHeader on catalog and vehicle routes; restore the tab-scoped theme from sessionStorage after hydration to preserve it across navigation without hydration mismatches.
- Use Embla for the vehicle photo carousel; render only recorded photos and expose unavailable contact actions as unsent, copyable/downloadable inquiries until a verified contact is configured.

- Store currency, confirmed-price status, equipment and seller notes with each vehicle; render prices through the shared formatter so real listings never inherit demo-dollar labels.
- Represent missing vehicle prices as null and show the shared unknown-data label without currency or demo-price claims, so replacements do not inherit unrelated prices.
- Redirect replaced vehicle detail URLs to their replacement listings so existing links stay usable.
