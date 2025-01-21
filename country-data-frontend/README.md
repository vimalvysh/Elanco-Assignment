## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Vimal - Changes/Updates-----------------------------

- Banckend

1. Introduced a services layer for business logic.
2. Added Error handling with abstract class.
3. Created Config file for all configuration data.
4. Used express-async-errors for hanlding sync and async errors.
5. Changed routes to specific route handling.
   Enhancments
   1. Implement Retry logic for external api call.

- Forntend

1. Updated service layer for all the api fetching and logice.
2. Implemted lazy loading for CountryCard.
3. Implemented layout model pattern with header -> that accpets childrens for searchBar and filterBar.
4. Added Filter option for reagions.
   Enhancments.
   1. Get Region from api and shownin dropdown.
   2. More genric design for Layout patterns
