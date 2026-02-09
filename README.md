# Blog Accordion Component

An interactive accordion component for blog cards that automatically cycles through items with smooth animations. Features SVG icon state transitions (active/inactive) and hover-based manual control.

## Reference

- [Using the Accordion](#using-the-accordion)
  - [HTML Structure](#html-structure)
  - [Required Attributes](#required-attributes)
  - [Integration](#integration)
  - [Customization](#customization)
- [Included tools](#included-tools)
- [Requirements](#requirements)
- [Getting started](#getting-started)
  - [Installing](#installing)
  - [Building](#building)
    - [Serving files on development mode](#serving-files-on-development-mode)
    - [Building multiple files](#building-multiple-files)
    - [Setting up a path alias](#setting-up-a-path-alias)
- [Contributing guide](#contributing-guide)
- [Pre-defined scripts](#pre-defined-scripts)
- [CI/CD](#cicd)
  - [Continuous Integration](#continuous-integration)
  - [Continuous Deployment](#continuous-deployment)
  - [How to automatically deploy updates to npm](#how-to-automatically-deploy-updates-to-npm)

## Using the Accordion

The blog accordion component automatically cycles through accordion items every 10 seconds. Each item features:

- Dynamic SVG icon state transitions (blue for active, gray for inactive)
- Hover interaction to manually select items
- Automatic cycling that restarts after manual selection
- Smooth animations and state management

### HTML Structure

Each accordion item requires the following structure:

```html
<div dev-target="accordion" class="blog-accordion_card">
  <div dev-target="accordion-svg" class="blog-accordion_logo w-embed">
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
      <circle cx="4.08" cy="4.08" r="4.08" fill="#3467E5"></circle>
      <circle cx="16.9999" cy="4.08" r="4.08" fill="#3467E5"></circle>
      <circle cx="29.9203" cy="4.08" r="4.08" fill="#3467E5"></circle>
      <circle cx="4.08" cy="16.9999" r="4.08" fill="#3467E5"></circle>
      <circle cx="16.9999" cy="16.9999" r="4.08" fill="#3467E5"></circle>
      <circle cx="29.9203" cy="16.9999" r="4.08" fill="#3467E5"></circle>
      <circle cx="4.08" cy="29.9198" r="4.08" fill="#3467E5"></circle>
      <circle cx="16.9999" cy="29.9198" r="4.08" fill="#3467E5"></circle>
      <circle cx="29.9203" cy="29.9198" r="4.08" fill="#3467E5"></circle>
    </svg>
  </div>
  <div class="blog-accordion-body">
    <div class="blog-accordion-header">
      <div dev-target="accordion-title" class="blog-accordion-title">Technical Excellence</div>
      <div dev-target="accordion-arrow" class="blog-accordion_arrow w-embed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="11"
          viewBox="0 0 20 11"
          fill="none"
        >
          <path d="M0.353516 0.353516L9.85352 9.85352L19.3535 0.353516" stroke="#020C2E"></path>
        </svg>
      </div>
    </div>
    <div dev-target="accordion-message" class="blog-accordion-text">
      Hand off a Figma design and we'll build it on Webflow via a white-glove process.
    </div>
  </div>
</div>
```

### Required Attributes

All accordion items **must** include these `dev-target` attributes:

- `dev-target="accordion"` - Main accordion card container
- `dev-target="accordion-svg"` - SVG icon container (circles will transition between #3467E5 for active and #E7E7E7 for inactive)
- `dev-target="accordion-title"` - Accordion title element
- `dev-target="accordion-message"` - Accordion content/description text

The component will automatically:

- Change SVG circle colors based on active state
- Add/remove the `is-active` class on the accordion container
- Cycle through items every 10 seconds
- Reset cycling when a user hovers over an item

⚠️ **Important:** The accordion will fail gracefully and log errors if any required attributes are missing.

### Integration

1. **Add the script to your Webflow page:**

```html
<script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/bx-blog-accordion@v0.0.1/dist/index.js"></script>
```

2. **Add multiple accordion items** with the structure shown above

3. **The accordion will automatically:**
   - Activate the first accordion on page load
   - Change SVG icon colors (blue #3467E5 for active, gray #E7E7E7 for inactive)
   - Automatically cycle to the next accordion every 10 seconds
   - Allow manual selection via hover (cycling restarts after hover)
   - Loop back to the first accordion after the last one

### Customization

**Timing:**
To change the accordion cycle duration, modify `TAB_DURATION` in `src/utils/accordion-animation.ts`:

```typescript
private readonly TAB_DURATION = 10000; // milliseconds (10 seconds)
```

**SVG Colors:**
The component automatically transitions SVG circle colors:

- **Active state:** `#3467E5` (blue)
- **Inactive state:** `#E7E7E7` (gray)

To customize these colors, update the color values in the `activateAccordion` method in `src/utils/accordion-animation.ts`.

**Styling:**
Customize the appearance by updating your Webflow styles or add custom CSS:

- `.blog-accordion_card` - Accordion card container
- `.blog-accordion_card.is-active` - Active accordion state
- `.blog-accordion-title` - Title styling
- `.blog-accordion-text` - Message text styling

**Manual Control:**
Access the accordion controller to manually control behavior:

```javascript
// Stop auto-cycling
accordionController.stop();

// Go to specific accordion (0-indexed)
accordionController.goToAccordion(2);

// Destroy the accordion
accordionController.destroy();
```

## Included tools

This template contains some preconfigured development tools:

- [Typescript](https://www.typescriptlang.org/): A superset of Javascript that adds an additional layer of Typings, bringing more security and efficiency to the written code.
- [Prettier](https://prettier.io/): Code formatting that assures consistency across all Finsweet's projects.
- [ESLint](https://eslint.org/): Code linting that enforces industries' best practices. It uses [our own custom configuration](https://github.com/finsweet/eslint-config) to maintain consistency across all Finsweet's projects.
- [Playwright](https://playwright.dev/): Fast and reliable end-to-end testing.
- [esbuild](https://esbuild.github.io/): Javascript bundler that compiles, bundles and minifies the original Typescript files.
- [Changesets](https://github.com/changesets/changesets): A way to manage your versioning and changelogs.
- [Finsweet's TypeScript Utils](https://github.com/finsweet/ts-utils): Some utilities to help you in your Webflow development.

## Requirements

This template requires the use of [pnpm](https://pnpm.js.org/en/). You can [install pnpm](https://pnpm.io/installation) with:

```bash
npm i -g pnpm
```

To enable automatic deployments to npm, please read the [Continuous Deployment](#continuous-deployment) section.

## Getting started

The quickest way to start developing a new project is by [creating a new repository from this template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template).

Once the new repository has been created, update the `package.json` file with the correct information, specially the name of the package which has to be unique.

### Installing

After creating the new repository, open it in your terminal and install the packages by running:

```bash
pnpm install
```

If this is the first time using Playwright and you want to use it in this project, you'll also have to install the browsers by running:

```bash
pnpm playwright install
```

You can read more about the use of Playwright in the [Testing](#testing) section.

It is also recommended that you install the following extensions in your VSCode editor:

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

### Building

To build the files, you have two defined scripts:

- `pnpm dev`: Builds and creates a local server that serves all files (check [Serving files on development mode](#serving-files-on-development-mode) for more info).
- `pnpm build`: Builds to the production directory (`dist`).

### Serving files on development mode

When you run `pnpm dev`, two things happen:

- esbuild is set to `watch` mode. Every time that you save your files, the project will be rebuilt.
- A local server is created under `http://localhost:3000` that serves all your project files. You can import them in your Webflow projects like:

```html
<script defer src="http://localhost:3000/{FILE_PATH}.js"></script>
```

- Live Reloading is enabled by default, meaning that every time you save a change in your files, the website you're working on will reload automatically. You can disable it in `/bin/build.js`.

### Building multiple files

If you need to build multiple files into different outputs, you can do it by updating the build settings.

In `bin/build.js`, update the `ENTRY_POINTS` array with any files you'd like to build:

```javascript
const ENTRY_POINTS = [
  'src/home/index.ts',
  'src/contact/whatever.ts',
  'src/hooyah.ts',
  'src/home/other.ts',
];
```

This will tell `esbuild` to build all those files and output them in the `dist` folder for production and in `http://localhost:3000` for development.

### Building CSS files

CSS files are also supported by the bundler. When including a CSS file as an entry point, the compiler will generate a minified version in your output folder.

You can define a CSS entry point by either:

- Manually defining it in the `bin/build.js` config. [See previous section](#building-multiple-files) for reference.
- Or importing the file inside any of your JavaScript / TypeScript files:

```typescript
// src/index.ts
import './index.css';
```

CSS outputs are also available in `localhost` during [development mode](#serving-files-on-development-mode).

### Setting up a path alias

Path aliases are very helpful to avoid code like:

```typescript
import example from '../../../../utils/example';
```

Instead, we can create path aliases that map to a specific folder, so the code becomes cleaner like:

```typescript
import example from '$utils/example';
```

You can set up path aliases using the `paths` setting in `tsconfig.json`. This template has an already predefined path as an example:

```json
{
  "paths": {
    "$utils/*": ["src/utils/*"]
  }
}
```

To avoid any surprises, take some time to familiarize yourself with the [tsconfig](/tsconfig.json) enabled flags.

## Testing

As previously mentioned, this library has [Playwright](https://playwright.dev/) included as an automated testing tool.

All tests are located under the `/tests` folder. This template includes a test spec example that will help you catch up with Playwright.

After [installing the dependencies](#installing), you can try it out by running `pnpm test`.
Make sure you replace it with your own tests! Writing proper tests will help improve the maintainability and scalability of your project in the long term.

By default, Playwright will also run `pnpm dev` in the background while the tests are running, so [your files served](#serving-files-on-development-mode) under `localhost:3000` will run as usual.
You can disable this behavior in the `playwright.config.ts` file.

If you project doesn't require any testing, you should disable the Tests job in the [CI workflow](#continuous-integration) by commenting it out in the `.github/workflows/ci.yml` file.
This will prevent the tests from running when you open a Pull Request.

## Contributing guide

In general, your development workflow should look like this:

1. Create a new branch where to develop a new feature or bug fix.
2. Once you've finished the implementation, [create a Changeset](#continuous-deployment) (or multiple) explaining the changes that you've made in the codebase.
3. Open a Pull Request and wait until the [CI workflows](#continuous-integration) finish. If something fails, please try to fix it before merging the PR.
   If you don't want to wait for the CI workflows to run on GitHub to know if something fails, it will be always faster to run them in your machine before opening a PR.
4. Merge the Pull Request. The Changesets bot will automatically open a new PR with updates to the `CHANGELOG.md`, you should also merge that one. If you have [automatic npm deployments](#how-to-automatically-deploy-updates-to-npm) enabled, Changesets will also publish this new version on npm.

If you need to work on several features before publishing a new version on npm, it is a good practise to create a `development` branch where to merge all the PR's before pushing your code to master.

## Pre-defined scripts

This template contains a set of predefined scripts in the `package.json` file:

- `pnpm dev`: Builds and creates a local server that serves all files (check [Serving files on development mode](#serving-files-on-development-mode) for more info).
- `pnpm build`: Builds to the production directory (`dist`).
- `pnpm lint`: Scans the codebase with ESLint and Prettier to see if there are any errors.
- `pnpm lint:fix`: Fixes all auto-fixable issues in ESLint.
- `pnpm check`: Checks for TypeScript errors in the codebase.
- `pnpm format`: Formats all the files in the codebase using Prettier. You probably won't need this script if you have automatic [formatting on save](https://www.digitalocean.com/community/tutorials/code-formatting-with-prettier-in-visual-studio-code#automatically-format-on-save) active in your editor.
- `pnpm test`: Will run all the tests that are located in the `/tests` folder.
- `pnpm test:headed`: Will run all the tests that are located in the `/tests` folder visually in headed browsers.
- `pnpm release`: This command is defined for [Changesets](https://github.com/changesets/changesets). You don't have to interact with it.
- `pnpm run update`: Scans the dependencies of the project and provides an interactive UI to select the ones that you want to update.

## Release Process

To create and publish a new version:

1. **Create a changeset** - Document your changes

   ```bash
   pnpm changeset
   ```

   This opens an interactive prompt where you'll:

   - Select the version bump type (patch/minor/major)
   - Write a summary of your changes
   - A changeset file will be created in `.changeset/`

2. **Update version** - Apply the changeset to bump version numbers

   ```bash
   pnpm changeset version
   ```

   This will:

   - Update the version in `package.json`
   - Update the `CHANGELOG.md` file
   - Delete the changeset file

3. **Create and push a git tag** - Tag the release and push to remote

   ```bash
   git tag v0.0.1
   git push origin v0.0.1
   ```

   Replace `v0.0.1` with your new version number

4. **Update Webflow script tag** - Use the new version in your Webflow project
   ```html
   <script src="https://cdn.jsdelivr.net/gh/YOUR-USERNAME/bx-blog-accordion@v0.0.1/dist/index.js"></script>
   ```
   Update the version number in the `@v0.0.1` part of the URL to match your release
