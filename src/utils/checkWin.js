function checkWin(grid, player) {
    // x check
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 7; i++) {
            for (let k = 0; k < 4; k++) {
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
            for (let k = 0; k < 4; k++) {
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
            for (let k = 0; k < 4; k++) {
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

    // flat plane ascending diagonal check
    for (let i = 3; i < 7; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped ascending diagonal check")
                    break
                }
                if (grid[i][j][k] === player && grid[i - 1][j + 1][k] === player && grid[i - 2][j + 2][k] === player && grid[i - 3][j + 3][k] === player) {
                    return true
                }
            }
        }
    }

    // flat plane descending diagonal check
    for (let i = 3; i < 7; i++) {
        for (let j = 3; j < 7; j++) {
            for (let k = 0; k < 4; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped descending diagonal check")
                    break
                }
                if (grid[i][j][k] === player && grid[i - 1][j - 1][k] === player && grid[i - 2][j - 2][k] === player && grid[i - 3][j - 3][k] === player) {
                    return true
                }
            }
        }
    }

    // vertical plane diagonal checks
    for (let i = 0; i < 7; i ++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped vertical plane diagonal check")
                    break
                }
                if (grid[i][j][k] === player && grid[i][j + 1][k + 1] === player && grid[i][j + 2][k + 2] === player && grid[i][j + 3][k + 3] === player) {
                    return true
                }
            }
        }
    }

    for (let i = 0; i < 7; i ++) {
        for (let j = 3; j < 7; j++) {
            for (let k = 0; k < 4; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped vertical plane diagonal check")
                    break
                }
                if (grid[i][j][k] === player && grid[i][j - 1][k + 1] === player && grid[i][j - 2][k + 2] === player && grid[i][j - 3][k + 3] === player) {
                    return true
                }
            }
        }
    }

    for (let i = 0; i < 4; i ++) {
        for (let j = 0; j < 7; j++) {
            for (let k = 0; k < 4; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped vertical plane diagonal check")
                    break
                }
                if (grid[i][j][k] === player && grid[i + 1][j][k + 1] === player && grid[i + 2][j][k + 2] === player && grid[i + 3][j][k + 3] === player) {
                    return true
                }
            }
        }
    }

    for (let i = 3; i < 7; i ++) {
        for (let j = 0; j < 7; j++) {
            for (let k = 0; k < 4; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped vertical plane diagonal check")
                    break
                }
                if (grid[i][j][k] === player && grid[i - 1][j][k + 1] === player && grid[i - 2][j][k + 2] === player && grid[i - 3][j][k + 3] === player) {
                    return true
                }
            }
        }
    }

    for (let i = 0; i < 4; i ++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped vertical plane diagonal check")
                    break
                }
                if (grid[i][j][k] === player && grid[i + 1][j + 1][k + 1] === player && grid[i + 2][j + 2][k + 2] === player && grid[i + 3][j + 3][k + 3] === player) {
                    return true
                }
            }
        }
    }

    for (let i = 3; i < 7; i ++) {
        for (let j = 3; j < 7; j++) {
            for (let k = 0; k < 4; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped vertical plane diagonal check")
                    break
                }
                if (grid[i][j][k] === player && grid[i - 1][j - 1][k + 1] === player && grid[i - 2][j - 2][k + 2] === player && grid[i - 3][j - 3][k + 3] === player) {
                    return true
                }
            }
        }
    }

    for (let i = 0; i < 4; i ++) {
        for (let j = 3; j < 7; j++) {
            for (let k = 0; k < 4; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped vertical plane diagonal check")
                    break
                }
                if (grid[i][j][k] === player && grid[i + 1][j - 1][k + 1] === player && grid[i + 2][j - 2][k + 2] === player && grid[i + 3][j - 3][k + 3] === player) {
                    return true
                }
            }
        }
    }

    for (let i = 3; i < 7; i ++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                if (!grid[i][j][k]) {
                    console.log("Stopped vertical plane diagonal check")
                    break
                }
                if (grid[i][j][k] === player && grid[i - 1][j + 1][k + 1] === player && grid[i - 2][j + 2][k + 2] === player && grid[i - 3][j + 3][k + 3] === player) {
                    return true
                }
            }
        }
    }

    return false
}

export default checkWin