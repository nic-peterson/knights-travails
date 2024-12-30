const createKnight = () => {
  // All possible moves a knight can make
  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  // Check if position is within the board
  const isValidPosition = (position) => {
    const [x, y] = position;
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  };

  // Get all possible valid moves from current position
  const getPossibleMoves = (position) => {
    const [x, y] = position;
    return moves
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter((pos) => isValidPosition(pos));
  };

  const knightMoves = (start, end) => {
    // If start and end are the same, return immediately
    if (start[0] === end[0] && start[1] === end[1]) {
      return [start];
    }

    // Queue for BFS - each element contains position and path to it
    const queue = [[start, [start]]];
    // Set to keep track of visited positions
    const visited = new Set([start.toString()]);

    while (queue.length > 0) {
      const [currentPos, path] = queue.shift();

      // Get all possible moves from current position
      const possibleMoves = getPossibleMoves(currentPos);

      for (const move of possibleMoves) {
        // Skip if we've already visited this position
        if (visited.has(move.toString())) continue;

        // Create new path including this move
        const newPath = [...path, move];

        // Check if we've reached the target
        if (move[0] === end[0] && move[1] === end[1]) {
          console.log(
            `=> You made it in ${newPath.length - 1} moves! Here's your path:`
          );
          newPath.forEach((pos) => console.log(`    [${pos}]`));
          return newPath;
        }

        // Add move to queue and mark as visited
        queue.push([move, newPath]);
        visited.add(move.toString());
      }
    }
  };

  return { knightMoves };
};

// Test cases
const knight = createKnight();
knight.knightMoves([0, 0], [1, 2]);
knight.knightMoves([0, 0], [3, 3]);
knight.knightMoves([3, 3], [0, 0]);
knight.knightMoves([0, 0], [7, 7]);
knight.knightMoves([3, 3], [4, 3]);
