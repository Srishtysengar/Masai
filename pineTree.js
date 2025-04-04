function printPineTree(N) {
    for (let i = 1; i <= N; i++) {
        let spaces = ' '.repeat(N - i);
        let stars = '*'.repeat(2 * i - 1);
        console.log(spaces + stars);
    }
    // Printing the trunk
    console.log(' '.repeat(N - 1) + '|');
}

// Example usage
let N = 4; // Change this value for different heights
printPineTree(N);