export function renderTree(root) {
  const lines = [];

  function walk(node, prefix = "") {
    node.children.forEach((child, index) => {
      const last = index === node.children.length - 1;

      const connector = last
        ? "└── "
        : "├── ";

      lines.push(prefix + connector + child.name);

      if (
        child.type === "directory" &&
        child.children.length
      ) {
        walk(
          child,
          prefix + (last ? "    " : "│   ")
        );
      }
    });
  }

  walk(root);

  return lines.join("\n");
}