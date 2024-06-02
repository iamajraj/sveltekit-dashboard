export function debounce(func: (...args: any[]) => void, wait: number) {
	let timeout: number;

	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

export function onClickOutside(node: HTMLElement, handler: () => void) {
	const onClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node) && event.target !== node) {
			handler();
		}
	};

	document.addEventListener('click', onClick);

	return {
		destroy() {
			document.removeEventListener('click', onClick);
		}
	};
}
