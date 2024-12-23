export function formatContentLen(content: number, len: number = 3) {
	let formatContent = '';
	let newContent = content;

	if (newContent == 0 && len == 3) return formatContent;

	if (newContent < 0) {
		formatContent = '-';
		newContent *= -1;
	}

	newContent = newContent % 1000;

	formatContent += newContent.toString().padStart(len, '0');

	return formatContent;
}
