import {notFound} from 'next/navigation';
import {opportunities} from '@/data/opportunities';
import {Detail} from '@/components/detail';
export function generateStaticParams(){return opportunities.map(o=>({id:o.id}));}
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const o=opportunities.find(x=>x.id===id);if(!o)notFound();return <Detail o={o}/>}
