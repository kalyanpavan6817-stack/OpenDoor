import type {Metadata} from 'next';
import {Provider} from '@/components/provider';
import {Header,Footer} from '@/components/shell';
import './globals.css';
export const metadata:Metadata={title:'OpenDoor — Your next opportunity',description:'Evidence-backed scholarships for Indian students. Discover possibilities, understand requirements, and prepare to apply.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Provider><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></Provider></body></html>}
