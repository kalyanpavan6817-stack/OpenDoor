'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <div className="page empty"><h1>Something didn’t open.</h1><p>Please try again. Your saved shortlist is kept on this device.</p><button className="button" onClick={reset}>Try again</button></div>}
