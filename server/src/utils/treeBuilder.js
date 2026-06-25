export function buildTree(flatTree) {
  const root = {
    name: "",
    type: "directory",
    children: [],
  };

  for (const item of flatTree) {
    const parts = item.path.split("/");

    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      const isLast = i === parts.length - 1;

      let child = current.children.find(
        (node) => node.name === name
      );

      if (!child) {
        child = {
          name,
          type:
            isLast && item.type === "blob"
              ? "file"
              : "directory",
          children: [],
        };

        current.children.push(child);
      }

      current = child;
    }
  }

  sortTree(root);

  return root;
}

function sortTree(node) {
  node.children.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === "directory" ? -1 : 1;
    }

    return a.name.localeCompare(b.name);
  });

  node.children.forEach(sortTree);
}