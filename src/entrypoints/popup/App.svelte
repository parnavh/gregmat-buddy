<main>
  <div>
    <a href="https://www.gregmat.com/" target="_blank" rel="noreferrer">
      <img src="/gregmat.svg" class="logo" alt="GregMat Logo" />
    </a>
    <a href="https://www.prepswift.com/" target="_blank" rel="noreferrer">
      <img src="/prepswift.svg" class="logo" alt="PrepSwift Logo" />
    </a>
  </div>

  <p>All the best!</p>

  <p class="read-the-docs">
    <a target="_blank" href="/options.html">Extension Options</a> - Configure your
    Preferences
  </p>

  <p class="read-the-docs">
    Found a bug or have a feature request?
    <a href={import.meta.env.VITE_GITHUB_URL + "/issues"}> Open an Issue </a>
  </p>

  <p>
    <a href={import.meta.env.VITE_GITHUB_URL}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path
          d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
        /><path d="M9 18c-4.51 2-5-2-7-2" /></svg
      >
      Source code
    </a>
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #092891);
  }
  .read-the-docs {
    color: #888;
  }
</style>
