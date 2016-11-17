# Front-end Workflow

1. Boilerplate
1. Repositories & Git
    1. Branches
    1. Branch Naming
    1. Commits
1. Naming Conventions
    1. Scss
    1. JavaScript Functions & Variables
    1. Files & Folders
1. Production

## 1. Boilerplate

We use Gulp as our task-runner.
The front-end boilerplate currently sits on [GitHub](https://github.com/thomasxbanks/boilerplate.git) - with installation instructions.

- Fork the repo
- Clone to local
- You will need to have node.js installed globally
- Run `npm i` in Terminal/Command Prompt/iTerm2/GitBash/whatever (from now on referred to as Terminal)
- Go and make a brew while the dependencies install
- Open the project in your favourite text editor/IDE (we're not precious about that - you can even use Vim!)
- **Don't forget to personalise the info in the `package.json` file.**
- Run `gulp watch` in Terminal - this will open the default browser and show you `localhost:3000`. Updates to the codebase will live refresh.

![NPM Install](https://cdn.meme.am/instances/500x/63891053.jpg)

## 2. Repositories and Git

### 2.1. Branches

Updates are made to the codebase on branches and detailed using [Semantic Versioning](http://semver.org/). This means that _**trunk is always shippable**_.

### 2.2. Branch naming

- New feature - `feature/x.y.z-brief_description`
- Hotfix/bug - `bug/x.y.z-brief_description`
- Improvement/Change request - `cr/x.y.z-brief_description`  
(Where `x.y.z` is the incremented version number and `brief_description` is usually the ticket title)

New work is branched from `master` (which should always remain in a shippable state)

>In an ideal world, each commit or merge into the main branch gives birth to a release candidate — it should be safe to release after each commit. This means we have to stop committing patches that put our main branch in an unshippable state.  
> ~ Dries Buytaert (Drupal)

For example, imagine your lovely site has gone live (bumping the version number from 0.1.0 to 1.1.0); people are using it but someone notices that all the lightbox images are portrait instead of landscape. You investigate and this requires a codebase change, not just uploading new images. So, branch `master` (1.1.0) into `bug/1.0.1-landscape_images`. Make your changes, test it all works, increment the version number in `package.json`, commit changes (see below), and merge into `master` (now 1.1.1).

The next day, a "Newsletter Sign-up" ticket appears. This is a feature as it is new to the codebase. Branch `master` into `feature/1.2.1-newsletter_sign_up` and make your changes.

First thing the following Monday, someone decides the "Newsletter Sign-up" needs to include fields for 'first name' and 'surname', instead of a 'full name' field. As the form already exists, and this was not part of the original ticket, it's not a bug - it's an improvement/change request. So, branch to `cr/1.2.2-add_name_fields` and make your changes.

### 2.3. Commits
Commit messages should follow this structure -  
`type - ticket_number - brief_description`  
*e.g.* for the following ticket
```
#37: Bug - images are all still landscape
Steps to replicate:
 1. Go to 'Previous Finalists' page - http://website.tld/previous-finalists
 2. Select 'Enlarge image'

Actual:
 - Lightbox displays landscape image

Expected:
 - Lightbox displays portrait image
```
The commit message would be;  
`bug - #37 - images are all still landscape`

A brief description should ideally be no longer than a tweet - a snapshot of the problem. In most cases, the title of the ticket will suffice.


## 3. Naming Conventions
### 3.1. Scss

We use a simplified BEM structure for classnames  
  *e.g.* `.primaryNav_item` or `.message-error`  

This is also used for Scss variables  
*e.g.* `$font_size-std: 1rem;`

This structure is used to define clear relationships between elements.

We also use composition over inheritance when defining states to allow reuse of classes  
*e.g.* `is-active` vs `not-active`

Certain states are defined using opposites, such as validation  
*e.g.* `pristine` vs `dirty`

### 3.2. JavaScript Functions and Variables

camelCase/PascalCase-based composition over inheritance structure used here too  
*e.g.*  
`makeValid(target)` for _doing_ functions,  
`isEmpty(target)` for _asking_ functions,  
`browserSize()` for _calculation_ functions,  
`Nudge(distance)` for _named functions_.

Variables are also camelCase and should be descriptive. If describing a value of a specific element, the definition comes before the name - *e.g.* `heightMasthead` or ``

### 3.3. Files and folders

The `src` folder and `dist` folder should give you a good idea of basic folder structures. Even in production, we like to keep JavaScript and CSS separated into named folders for concision.

```
|- css/  
   |- base  
      |- _functions.scss  
      |- _mixins.scss  
      |- _normal.scss  
      |- _variables.scss  
   |- elements  
      |- _buttons.scss  
      |- _forms.scss  
      ...
   |- typography
      |- _base.scss

```

CSS, for example, is organised loosely on the OOCSS principle. Repeated elements (buttons, forms, etc) are kept in elements, top-level typography rules are defined in the typography folder, and so on. Base contains development-specific functions that generate no CSS of their own (the only anomaly being `_normal.scss` which sets some very basic top-level resets).

Borrowing heavily from the BBC GEL standards, typography rules are defined by a series of classnames (named for characters from the Sopranos because cool). This separates styling from function in the front-end.

```
.page_header span {
  @extend .tony;
}
.page_header h1, .page_header p {
  @extend .junior;
}
  ___
  <section class="page_header">
    <span>Page Title</span>
    <h1>Sometimes a description is better as the H1 than the page title</h1>
    <p>but the page title still needs to be huge</p>
  </section>
```

## 4. Production Code
> Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live. Code for readability.  
~ John Woods

Producing distribution code is fairly simple. Run `gulp production` and watch as the task-runner automagically compiles, concatenates, minifies, and optimises.

- Scss compilation
- Unused CSS classes removed`*`
- JS file concatenation
- Whitespace stripped from `*.html`, `bundle.js`, `style.css`, even `*.php`
- Images optimised

In a WordPress build, upload the `dist` folder into the theme and rename as `assets`

`*` Be aware of classes added dynamically as they may be stripped out. Commenting these will prevent this. Add the line `/* uncss:ignore */` above the declaration you want to keep.
*e.g.*
```
  /* uncss:ignore */
  .is-valid {
    border: 2px solid $clr_success;
  }

  .not-valid {
    border: 2px solid $clr_error;
  }
```
