# Convicted Ink Studios website

Complete static website exported from saved version 20, source commit 81b3185e3c5b9a9228579dfcfc43aae62ed565ad.

Includes the gallery, consultation booking page, JavaScript, tattoo images, logos, and videos. The agreement app is not included. No build step or package installation is required.

## Move to GitHub

1. Unzip this archive and upload its contents into the root of your GitHub repository. Include the `.github` folder to use automatic deployment.
2. In repository **Settings → Pages**, choose **GitHub Actions** as the source.
3. Push to `main`, or run the included **Deploy website to GitHub Pages** workflow manually. If your default branch has another name, update the workflow branch.
4. For `convictedinkstudios.com`, add that custom domain in Pages settings and configure your DNS using the records GitHub shows. Enable HTTPS after the domain verifies.

The site uses root-relative links such as `/images/` and `/consultations/`. Deploy it at a domain root, using a custom domain or a user/organization Pages site. A repository Pages URL with a `/repository-name/` prefix requires updating those links.

The social preview and structured-data URLs currently point to the existing chatgpt.site address. Replace that address in both HTML files with your final domain after migration. Booking calendars and payment links remain external services; this export does not change their settings.

## Edit or preview

- `index.html`: main gallery, styling, contact information, and booking/deposit details.
- `gallery.js`: gallery and image interactions.
- `consultations/index.html`: consultation page and embedded calendars.
- `images/`: all images and videos.

Preview locally with `python3 -m http.server 8000`, then open `http://localhost:8000`. Serve over HTTP rather than opening the HTML file directly so root-relative assets load.
