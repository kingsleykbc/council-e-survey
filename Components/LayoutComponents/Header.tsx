import React, { useState, useRef } from 'react';
import { auth } from '../../firebase/clientApp';
import { signOut } from 'firebase/auth';
import Logo from '../UIComponents/Logo';
import Animatable from '../UIComponents/Animatable';
import { useSearch } from '../../contexts/SearchContext';
import Button from '../UIComponents/Button';
import Lightbox from '../UIComponents/Lightbox';
import { IoMdMoon } from 'react-icons/io';
import { BsPersonCircle as IconPerson } from 'react-icons/bs';
import { RiSunFill as IconSun } from 'react-icons/ri';
import { FiLogOut as IcLogout } from 'react-icons/fi';
import { AiOutlineMail as IcEmail } from 'react-icons/ai';
import { BsPerson as IcUser } from 'react-icons/bs';
import { httpsCallable } from 'firebase/functions';
import { funcs } from '../../firebase/clientApp';
import AreYouSureBox from '../UIComponents/AreYouSureBox';

const Header = ({ theme, route, setTheme, authState: { isAdmin, userData } }) => {
	const { keyword, setKeyword } = useSearch();
	const aysRef = useRef(null);
	const [showAccountLB, setShowAccountLB] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const toggleAccountLB = () => setShowAccountLB(!showAccountLB);

	/**
	 * HANDLE LOGOUT
	 */
	const handleLogout = async () => {
		try {
			await signOut(auth);
		} catch (e) {}
	};

	/**
	 * DELETE ACCOUNT
	 */
	const handleAccountDelete = async () => {
		setIsLoading(true);
		try {
			// Add question data
			const deleteAccount = httpsCallable(funcs, 'deleteAccount');
			await deleteAccount({});
			handleLogout();
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
							<input
								type='search'
								value={keyword}
								onChange={({ target: { value } }) => setKeyword(value)}
								placeholder='Search Questions (case-sensitive)'
							/>
						</div>
					)}

					{/* OPTIONS */}
					<ul className='options'>
						<li>
							<ThemeToggleButton theme={theme} setTheme={setTheme} />
						</li>
						<li className='account' onClick={toggleAccountLB}>
							<IconPerson />
							<div className='username'>{userData.fullName}</div>
						</li>
						<li>
							<Button responsiveHideText icon={<IcLogout />} onClick={handleLogout} className='button'>
								Logout
							</Button>
						</li>
					</ul>
				</nav>
			</Animatable>

			<Lightbox width='400px' autoHeight show={showAccountLB} toggle={toggleAccountLB}>
				<div className='accountDetails'>
					<div className='iconAcct'>
						<IconPerson />
					</div>

					<ul className='dets'>
						<li>
							<IcUser />
							<span>{userData.fullName}</span>
						</li>
						<li>
							<IcEmail />
							<span>{userData.email}</span>
						</li>
					</ul>

					{!isAdmin && (
						<Button
							isLoading={isLoading}
							onClick={() =>
								aysRef.current.openAreYouSureBox({ message: 'Delete account and all your responses', onYes: handleAccountDelete })
							}
							className='delete'
						>
							Delete Account
						</Button>
					)}
				</div>
			</Lightbox>

			<AreYouSureBox ref={aysRef} />

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
					z-index: 10;
				}
				.username {
					display: none;
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
					cursor: pointer;
				}

				.account:hover {
					opacity: 0.6;
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

				.account div {
					max-width: 50px;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.accountDetails {
					text-align: center;
				}

				.iconAcct {
					font-size: 4rem;
					opacity: 0.5;
				}

				:global(button.delete) {
					background: #fc145a !important;
				}
				.dets {
					margin-bottom: 20px;
					display: block;
				}
				.dets li {
					width: 100%;
					display: flex;
					gap: 15px;
					justify-content: center;
					align-items: center;
					padding: 15px 0;
					border-bottom: var(--border);
				}

				.dets li:last-child {
					border-bottom: none;
				}

				.dets :global(svg) {
					opacity: 0.5;
					font-size: 1.5rem;
				}

				@media screen and (min-width: 800px) {
					h1,
					.username {
						display: block;
					}

					.headerInner {
						gap: 20px;
					}

					.account {
						margin-left: 15px;
					}

					.account div {
						max-width: 100%;
					}

					.iconAcct {
						font-size: 4rem;
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
