```shell
npm i
```

```shell
npm install -D tailwindcss postcss autoprefixer
>>
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
    content: ['./src/**/*.{html,js,svelte,ts}'],
```

```css
/* src/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```javascript
// svelte.config.js
alias: {
	"@/*": "src/*"
}
```

```shell
npm i -D daisyui@latest

```

```shell
npm i -D @sveltejs/adapter-cloudflare
```

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-cloudflare';
///...
dapter: adapter();
```

```typescript
// src/app.d.ts

interface Platform {
	env: {
		URL: KVNamespace;
	};
}
```

```shell

```

```shell

```

```shell

```
