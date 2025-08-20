import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RepoCard from './components/RepoCard';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [repos, setRepos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const mockRepos = useMemo(
    () => [
      {
        id: 1,
        name: 'alpha-repo',
        description: 'Mock alpha repository for layout test.',
        stargazers_count: 42,
        forks_count: 3,
        html_url: '#',
        language: 'JavaScript',
      },
      {
        id: 2,
        name: 'bravo-kit',
        description: 'Another mock repo with a longer description to test wrapping.',
        stargazers_count: 17,
        forks_count: 1,
        html_url: '#',
        language: 'TypeScript',
      },
      {
        id: 3,
        name: 'charlie-utils',
        description: null,
        stargazers_count: 0,
        forks_count: 0,
        html_url: '#',
        language: 'Go',
      },
    ],
    []
  );

  useEffect(() => {
    if (!searchQuery) return;

    const controller = new AbortController();
    async function run() {
      try {
        setLoading(true);
        setError('');
        setRepos([]);

        const url = `https://api.github.com/users/${encodeURIComponent(searchQuery)}/repos`;
        const { data } = await axios.get(url, {
          params: { per_page: 100, sort: 'updated' },
          signal: controller.signal,
          headers: {
            ...(import.meta.env.VITE_GITHUB_TOKEN
              ? { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` }
              : {}),
            Accept: 'application/vnd.github+json',
          },
        });

        setRepos(Array.isArray(data) ? data : []);
      } catch (err) {
        if (axios.isCancel(err)) return;
        const status = err?.response?.status;
        if (status === 404) setError('User not found.');
        else if (status === 403) setError('Rate limit exceeded. Try later or add a GitHub token.');
        else setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    run();
    return () => controller.abort();
  }, [searchQuery]);

  const onSearch = (username) => setSearchQuery(username);

  const hasSearched = Boolean(searchQuery);

  return (
    <div className="app">
      <header className="header container">
        <div className="title">QuickRepo Viewer</div>
        <ThemeToggle />
      </header>

      <main className="container">
        <SearchBar onSearch={onSearch} />

        {!hasSearched && (
          <>
            <p style={{ marginTop: 0 }}>
              Tip: Try users like <code>facebook</code>, <code>vercel</code>, or <code>gaearon</code>.
            </p>
            <section className="grid" aria-label="Mock repositories">
              {mockRepos.map((r) => (
                <RepoCard
                  key={r.id}
                  name={r.name}
                  description={r.description}
                  stars={r.stargazers_count}
                  forks={r.forks_count}
                  url={r.html_url}
                  language={r.language}
                />
              ))}
            </section>
          </>
        )}

        {hasSearched && (
          <>
            {loading && <p>Loading…</p>}
            {!loading && error && <p role="alert">{error}</p>}
            {!loading && !error && (
              <>
                <p style={{ marginTop: 0 }}>
                  Showing public repos for <strong>{searchQuery}</strong> — {repos.length} found
                </p>
                <section className="grid" aria-label="Repositories">
                  {repos.map((r) => (
                    <RepoCard
                      key={r.id}
                      name={r.name}
                      description={r.description}
                      stars={r.stargazers_count}
                      forks={r.forks_count}
                      url={r.html_url}
                      language={r.language}
                    />
                  ))}
                </section>
              </>
            )}
          </>
        )}
      </main>

      <footer className="footer">
        Built with React + Vite.
        By Srishty Sengar
      </footer>
    </div>
  );
}