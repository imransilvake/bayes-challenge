// react
import React, { useEffect, useState, FC } from 'react';

// app
import './Scroll-To-Top.scss';
import ScrollTop from '../../../assets/svg/scroll-top.svg';

const ScrollToTop: FC = () => {
	// hook
	const [scrollView, setScrollView] = useState(false);

	useEffect(() => {
		// validate scroll position
		const handleScroll = () => {
			if (window.scrollY > 250) {
				if (!scrollView) {
					// set hook: setScrollView
					setScrollView(true);
				}
			} else if (scrollView) {
				// set hook: setScrollView
				setScrollView(false);
			}
		};

		// listener
		window.addEventListener('scroll', handleScroll);

		// clean up
		return () => window.removeEventListener('scroll', handleScroll);
	}, [scrollView, setScrollView]);

	/**
	 * scroll to top of the page
	 */
	const scrollToTop = () => {
		const scrollSpeed = 400;
		const scrollDuration = scrollSpeed / 25;
		const scrollStep = -window.scrollY / scrollDuration;
		const scrollInterval = setInterval(() => {
			if (window.scrollY !== 0) {
				window.scrollBy(0, scrollStep);
			} else {
				clearInterval(scrollInterval);
			}
		}, 15);
	};

	return (
		<div className="by-scroll-to-top">
			{scrollView && (
				<button type="button" onClick={scrollToTop}>
					<img src={ScrollTop} alt="load more" />
				</button>
			)}
		</div>
	);
};
export default ScrollToTop;
