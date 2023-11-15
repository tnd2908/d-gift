import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import heart from './assets/heart3d.png';
import heartImg from './assets/big-heart.png';

import Gift from './components/Gift'
import Bubbles from './components/Bubbles/Bubbles';

function App() {

	const onMouseMove = useCallback((event: MouseEvent) => {
		const body = document.querySelector('body');
		const heart = document.createElement('span');
		heart.classList.add('heart-icon');

		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const y = event.clientY - rect.top;
		const x = event.clientX - rect.left;
		heart.style.left = x + 'px';
		heart.style.top = y + 'px';

		const size = Math.random() * 80;
		heart.style.width = size + 20 + 'px';
		heart.style.height = size + 20 + 'px';

		const transformValue = Math.random() * 360;
		heart.style.transform = 'rotate(' + transformValue + 'deg)';
		body?.appendChild(heart);
		setTimeout(() => {
			heart.remove();
		}, 1000);
		event.stopPropagation();
  		event.preventDefault();

	}, [])
	
	const [isCorrect, setIsCorrect] = useState(false);
	const [isShowResult, setIsShowResult] = useState(false);

	const onRemoveEvent = () => {
		window.removeEventListener('mousemove', onMouseMove)
	}
	useEffect(() => {
		if (isCorrect && !isShowResult) {
			document.querySelector('body')?.addEventListener('mousemove', onMouseMove);
		} 
		else {
			document.querySelector('body')?.removeEventListener('mousemove', onMouseMove)
		}
		return () => window.removeEventListener('mousemove', onMouseMove);
	}, [isCorrect, isShowResult, onMouseMove]);

	const onCheck = (c: boolean) => {
		setIsCorrect(c);
	};
	const onShowResult = (r: boolean) => {
		setIsShowResult(r);
	}
	const text = 'Love Bé Ly'.split('');

	return (
		<>
			{!isShowResult
				? <Gift isCorrect={isCorrect} onCheck={onCheck} unMountCb={onRemoveEvent} onShowResult={onShowResult}/>
				: <section className='bg-dark h-screen w-full flex flex-col px-4 justify-center items-center appear'>
					<h2 className='neon-text text-center items-center relative lg:text-[120px] text-[60px]'>
						{text.map((t, index) => (
							(t !== ' ') ? <span key={'text-' + index} className={' block neon-text-' + (index + 1)}>{t}</span>
								: <span key={'text-' + index} className={'block w-10'}>{t}</span>
						))}
					</h2>
					<div className="big-heart">
						<img src={heart} alt="" />
					</div>
					<Bubbles />
				</section>
			}
		</>
	)
}

export default App
