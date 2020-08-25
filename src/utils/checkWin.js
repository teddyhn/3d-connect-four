function checkWin(grid, player) {
    // x check
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 7; i++) {
            for (let k = 0; k < 7; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped x check")
                    break
                }
                if (grid[i][j][k] === player && grid[i][j + 1][k] === player && grid[i][j + 2][k] === player && grid[i][j + 3][k] === player) {
                    return true
                }
            }
        }
    }

    // z check
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 7; j++) {
            for (let k = 0; k < 7; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped z check")
                    break
                }
                if (grid[i][j][k] === player && grid[i + 1][j][k] === player && grid[i + 2][j][k] === player && grid[i + 3][j][k] === player) {
                    return true
                }
            }
        }
    }

    // y check
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            for (let k = 0; k < 7; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped y check")
                    break
                }
                if (grid[i][j][k] === player && grid[i][j][k + 1] === player && grid[i][j][k + 2] === player && grid[i][j][k + 3] === player) {
                    return true
                }
            }
        }
    }

    return false
}

export default checkWin