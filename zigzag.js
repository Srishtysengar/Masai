let matrix = [
    [5, 4, 3, 2, 1],
    [6, 7, 8, 9, 1],
    [6, 4, 5, 2, 3],
    [7, 8, 9, 1, 2]
];

function zigZagTraversal(matrix) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    let result = [];
    
    for (let i = 0; i < rows; i++) {
        if (i % 2 === 0) {
            for (let j = cols - 1; j >= 0; j--) {
                result.push(matrix[i][j]);
            }
        } else {
            for (let j = 0; j < cols; j++) {
                result.push(matrix[i][j]);
            }
        }
    }
    
    console.log(result.join(' '));
}

zigZagTraversal(matrix);
