var array = ['a', 'b', 'c'];
var parentSpan = document.createElement("span");
console.log(parentSpan)

if (array.length === 1) {
    parentSpan.textContent = array[0];
} else if (array.length > 1) {
    parentSpan.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const childSpan = document.createElement('span');
        childSpan.className = `singer${i}`;
        childSpan.textContent = array[i];
        parentSpan.appendChild(childSpan);
        if (i !== array.length - 1) {
            const sepSpan = document.createElement('span');
            sepSpan.className = 'sepr';
            sepSpan.textContent = '/';
            parentSpan.appendChild(sepSpan);
        }
    }
}

console.log(parentSpan)