module.exports = {
  // Lint & Prettify TS and JS files
  "*.{js,jsx,ts,tsx}": (filenames) => [
    `prettier --write ${filenames.join(" ")}`
    // `npm run lint --fix . ${filenames.join(" --file")}`,
    // `npm test -- --findRelatedTests ${filenames.join(" ")}`
  ]
}
