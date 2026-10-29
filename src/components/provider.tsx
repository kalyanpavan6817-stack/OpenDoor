'use client';
import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import type {Profile} from '@/types';
import {parseStorage,STORAGE_KEY,type SavedData} from '@/lib/storage';
import {opportunities} from '@/data/opportunities';
interface Context {profile:Profile;setProfile:(p:Profile)=>void;data:SavedData;toggleSave:(id:string)=>void;toggleTask:(id:string)=>void;clear:()=>void;ready:boolean;notice:string}
const AppContext=createContext<Context|null>(null);
export function Provider({children}:{children:ReactNode}) {
 const [profile,setProfile]=useState<Profile>({});const [data,setData]=useState<SavedData>({saved:[],tasks:{}});const [ready,setReady]=useState(false);const [notice,setNotice]=useState('');
 // One post-hydration read synchronizes external browser storage while keeping server/client initial markup identical.
 // eslint-disable-next-line react-hooks/set-state-in-effect
 useEffect(()=>{try{const parsed=parseStorage(localStorage.getItem(STORAGE_KEY));parsed.saved=parsed.saved.filter(id=>opportunities.some(o=>o.id===id));setData(parsed);}catch{setNotice('Browser storage is unavailable. Your shortlist will work for this visit.');}setReady(true);},[]);
 function persist(next:SavedData){setData(next);try{localStorage.setItem(STORAGE_KEY,JSON.stringify(next));}catch{setNotice('Changes are kept for this visit only because browser storage is unavailable.');}}
 function clear(){setProfile({});setData({saved:[],tasks:{}});try{localStorage.removeItem(STORAGE_KEY);setNotice('Your OpenDoor information has been cleared.');}catch{setNotice('Memory cleared. Browser storage is inaccessible; clear site data in browser settings if needed.');}}
 return <AppContext.Provider value={{profile,setProfile,data,ready,notice,clear,toggleSave:id=>persist({...data,saved:data.saved.includes(id)?data.saved.filter(x=>x!==id):[...data.saved,id]}),toggleTask:id=>persist({...data,tasks:{...data.tasks,[id]:!data.tasks[id]}})}}>{children}</AppContext.Provider>;
}
export function useApp(){const c=useContext(AppContext);if(!c)throw Error('Missing provider');return c;}
