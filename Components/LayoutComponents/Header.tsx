import React from 'react';
import Link from 'next/link';
import { auth } from '../../firebase/clientApp';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Img from 'next/image';

const Header = ({ authState: { isAuthenticated, user, loading, error } }) => {
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
			<nav className='headerInner'>
				<Link href='/'>
					<a href='#'>
						<div className='logo'>
							<Img src='/images/logo.png' width={25} height={25} />
							<h1>Blog</h1>
						</div>
					</a>
				</Link>

				<div className='search'>
					<input type='search' />
				</div>

				<ul className='options'>
					<li>
						<Link href='/'>
							<a href='#'>Home</a>
						</Link>
					</li>
					{!isAuthenticated ? (
						<>
							<li>
								<Link href='/login'>
									<a href='#'>Login</a>
								</Link>
							</li>
							<li>
								<Link href='/signup'>
									<a href='#'>SignUp</a>
								</Link>
							</li>
						</>
					) : (
						<li>
							<div onClick={handleLogout} className='button'>
								Logout
							</div>
						</li>
					)}
				</ul>
			</nav>

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
					background: #fff;
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
					gap: 10px;
				}

				.search {
					flex-grow: 1;
				}

				ul {
					display: flex;
					align-items: center;
					gap: 20px;
				}

				@media screen and (min-width: 800px){
					h1 {
						display: block;
					}
				}
			`}</style>
		</header>
	);
};

export default Header;
