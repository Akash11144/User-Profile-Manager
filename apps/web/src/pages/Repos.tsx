import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';

const REPOS = gql`
  query Repos($username:String!, $sortBy:String, $direction:String, $page:Int, $perPage:Int){
    githubRepos(username:$username, sortBy:$sortBy, direction:$direction, page:$page, perPage:$perPage){
      id name htmlUrl description stargazersCount language updatedAt
    }
  }`;

export default function Repos() {
  const [username, setUsername] = useState('facebook');
  const [getRepos, { data, loading, error }] = useLazyQuery(REPOS);

  return (
    <div>
      <h2>GitHub Repos</h2>
      <form onSubmit={e=>{e.preventDefault(); getRepos({ variables:{ username, sortBy:'updated', direction:'desc', perPage:10 } });}}>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="GitHub username" />
        <button>Fetch</button>
      </form>
      {loading && <p>Loading…</p>}
      {error && <p style={{color:'crimson'}}>Error: {error.message}</p>}
      <ul>
        {data?.githubRepos?.map((r:any)=>(
          <li key={r.id} className="repo-item">
            <a href={r.htmlUrl} target="_blank" rel="noreferrer">{r.name}</a>
            <div>{r.description ?? '—'}</div>
            <small>★ {r.stargazersCount} • {r.language ?? '—'} • {new Date(r.updatedAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
