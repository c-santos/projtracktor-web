import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ScrollArea, Theme, ThemePanel } from '@radix-ui/themes';

export default function BasePage() {
    return (
        <>
            <Theme appearance='dark'>
                <Navbar />
                <ScrollArea>
                    <Outlet />
                    <ThemePanel />
                </ScrollArea>
            </Theme>
        </>
    );
}
