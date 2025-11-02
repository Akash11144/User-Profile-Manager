import { gql, useMutation, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const ME = gql`query { me { id email name } }`;
const UPDATE = gql`
  mutation Update($name:String!) {
    updateProfile(name:$name){ id email name }
  }`;

export default function Profile() {
  const { data, loading, error, refetch } = useQuery(ME, { fetchPolicy: 'cache-and-network' });
  const [form, setForm] = useState({ name:'' });
  const [update, { loading: saving, error: saveError }] = useMutation(UPDATE, {
    onCompleted: ()=>refetch()
  });

  useEffect(()=>{ if (data?.me) setForm({ name: data.me.name ?? '' }); }, [data]);

  if (loading && !data) return <p>Loading…</p>;
  if (error) return <p style={{color:'crimson'}}>Error: {error.message}</p>;
  if (!data?.me) return <p>No profile yet.</p>;

  return (
    <form onSubmit={e=>{e.preventDefault(); update({ variables: form });}}>
      <h2>My Profile</h2>
      <label>Email</label>
      <input value={data.me.email} readOnly />
      <label>Name</label>
      <input value={form.name} onChange={e=>setForm({ name:e.target.value })} required />
      <button disabled={saving}>Save</button>
      {saveError && <p style={{color:'crimson'}}>Error: {saveError.message}</p>}
    </form>
  );
}
