export function formatContentLen(content: number, len: number = 3) {
	let formatContent = '';

	if (content < 0) {
		formatContent = '-';
		content *= -1;
	}

	return formatContent + content.toString().padStart(len, '0');
}
