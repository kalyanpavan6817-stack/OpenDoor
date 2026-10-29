import Link from 'next/link';
export default function NotFound(){return <div className="page empty"><h1>This door isn’t here.</h1><p>That opportunity may have moved, or the link is incorrect.</p><Link className="button" href="/opportunities">Explore opportunities</Link></div>}
