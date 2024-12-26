import random

def generate_example(rows, cols, fill_prob=0.3):
    """Generate a random grid with 0 and 1 based on fill probability."""
    return [[1 if random.random() < fill_prob else 0 for _ in range(cols)] for _ in range(rows)]

def print_grid(grid):
    """Print the grid with 0 as '.' and 1 as '#'."""
    for row in grid:
        print("".join(['#' if cell == 1 else '.' for cell in row]))

def save_grid_to_file(grid, filename):
    """Save the grid to a file with 0 as '.' and 1 as '#'."""
    with open(filename, 'w') as f:
        for row in grid:
            f.write("".join(['#' if cell == 1 else '.' for cell in row]) + '\n')

def find_groups(grid):
    """Find all groups of adjacent 1s in the grid."""
    rows, cols = len(grid), len(grid[0])
    visited = [[False for _ in range(cols)] for _ in range(rows)]

    def is_valid(x, y):
        return 0 <= x < rows and 0 <= y < cols and not visited[x][y] and grid[x][y] == 1

    def dfs(x, y):
        """Perform DFS to find all connected cells in the group."""
        stack = [(x, y)]
        size = 0
        while stack:
            cx, cy = stack.pop()
            if not is_valid(cx, cy):
                continue
            visited[cx][cy] = True
            size += 1
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                stack.append((cx + dx, cy + dy))
        return size

    groups = []
    for x in range(rows):
        for y in range(cols):
            if is_valid(x, y):
                groups.append(dfs(x, y))

    return groups

# Generate 5 examples and analyze them
examples = [generate_example(100, 100, fill_prob=0.45) for _ in range(5)]

for i, grid in enumerate(examples):
    print(f"Example {i + 1}:")
    print_grid(grid)
    save_grid_to_file(grid, f"example_{i + 1}.txt")
    groups = find_groups(grid)
    print(f"Number of groups: {len(groups)}")
    print(f"Group sizes: {sorted(groups)}\n")
