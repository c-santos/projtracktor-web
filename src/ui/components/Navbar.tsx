import { TabNav } from '@radix-ui/themes';
import { Link, useLocation } from 'react-router-dom';

type NavBarItem = { label: string; pathname: string };

const navBarItems: NavBarItem[] = [
    { pathname: '/', label: 'Home' },
    { pathname: '/profile', label: 'Profile' },
];

export default function Navbar() {
    const loc = useLocation();

    function renderNavBarItems() {
        return navBarItems.map((item) => (
            <TabNav.Link asChild active={loc.pathname === item.pathname}>
                <Link to={item.pathname}>{item.label}</Link>
            </TabNav.Link>
        ));
    }

    return (
        <TabNav.Root
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                //backgroundColor: 'slategray'
            }}
        >
            {renderNavBarItems()}
        </TabNav.Root>
    );
}
