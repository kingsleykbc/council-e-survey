import React from 'react';
import Link from 'next/link';
import { auth } from '../../firebase/clientApp';
import { signOut } from 'firebase/auth';
import { IoMdMoon } from 'react-icons/io';
import { RiSunFill as IconSun } from 'react-icons/ri';
import { useAuthState } from 'react-firebase-hooks/auth';
import Img from 'next/image';
import Logo from '../UIComponents/Logo';
import { BsPersonCircle as IconPerson } from 'react-icons/bs';
import Animatable from '../UIComponents/Animatable';
import { useSearch } from '../../contexts/SearchContext';

const Header = ({ theme, route, setTheme, authState: { isAuthenticated, user, userData, loading, error } }) => {
	const { keyword, setKeyword } = useSearch();
	/**
	 * HANDLE LOGOUT
	 */
	const handleLogout = async () => {
		try {
			await signOut(auth);
		} catch (e) {}
	};

	// ===================================================================================================================
	//  UI
	// ===================================================================================================================
	return (
		<header>
			<Animatable variants={variants} initial='initial' animate='final'>
				<nav className='headerInner'>
					<Logo isLink showResponsiveText={false} />

					{/* SEARCH BAR */}
					{['/'].includes(route) && (
						<div className='search'>
							<input type='search' value={keyword} onChange={({ target: { value } }) => setKeyword(value)} placeholder='Search Questions (case-sensitive)' />
						</div>
					)}

					{/* OPTIONS */}
					<ul className='options'>
						<li>
							<ThemeToggleButton theme={theme} setTheme={setTheme} />
						</li>
						<li className='account'>
							<IconPerson />
							<div>{userData.fullName}</div>
						</li>
						<li>
							<div onClick={handleLogout} className='button'>
								Logout
							</div>
						</li>
					</ul>
				</nav>
			</Animatable>
			{/* STYLE */}
			<style jsx>{`
				h1 {
					font-size: 1.2rem;
					margin-left: 10px;
					display: none;
				}
				header {
					box-shadow: 0 2px 5px rgba(0, 0, 0, 0.137);
					padding: 10px;
					overflow: hidden;
					background: var(--backgroundColor);
					position: sticky;
					top: 0;
				}

				.logo {
					display: flex;
					align-items: center;
				}

				.headerInner {
					max-width: 870px;
					margin: auto;
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 20px;
				}

				.account {
					display: flex;
					align-items: center;
				}

				.account div {
					margin-left: 10px;
				}
				.account :global(svg) {
					font-size: 1.3rem;
					opacity: 0.4;
				}

				.search {
					flex-grow: 1;
				}

				ul {
					display: flex;
					align-items: center;
					gap: 15px;
				}

				@media screen and (min-width: 800px) {
					h1 {
						display: block;
					}

					.headerInner {
						gap: 20px;
					}

					.account {
						margin-left: 15px;
					}
				}
			`}</style>
		</header>
	);
};

export default Header;

const ThemeToggleButton = ({ theme, setTheme }) => (
	<div className='fab' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
		{theme === 'light' ? <IoMdMoon style={{ opacity: 0.6 }} /> : <IconSun />}

		{/* STYLE */}
		<style jsx>{`
			.fab {
				width: 40px;
				height: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1.2rem;
				cursor: pointer;
				border-radius: 5px;
				background: var(--faintColor);
				transition: opacity 0.2s linear;
			}

			.fab:hover {
				opacity: 0.5;
			}
		`}</style>
	</div>
);

const variants = {
	initial: { y: 20, opacity: 0 },
	final: { y: 0, opacity: 1 }
};
