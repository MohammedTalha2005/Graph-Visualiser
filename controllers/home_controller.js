export const home = (req, res) => {
  const { nodes, edges } = req.body;
  const n = Number(nodes);
  if (isNaN(n) || n <= 0) return res.redirect("/");

  let lines = edges.split("\n");

  // Validate all lines first
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    let parts = line.split(" ");
    if (parts.length < 2) return res.redirect("/");
    let fromnum = Number(parts[0]);
    let tonum = Number(parts[1]);
    if (
      isNaN(fromnum) ||
      isNaN(tonum) ||
      fromnum > n ||
      tonum > n ||
      fromnum <= 0 ||
      tonum <= 0
    ) {
      return res.redirect("/");
    }
  }

  // If validation passed, parse edges
  let vizedges = [];
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    let parts = line.split(" ");
    let weight = parts[2] ? parts[2].trim() : null;
    vizedges.push({
      from: parts[0],
      to: parts[1],
      weight,
      color: "#888",
      font: { align: "top", size: 14 },
    });
  }

  let viznodes = [];
  for (let i = 1; i <= n; i++) {
    viznodes.push({ id: `${i}`, label: `${i}` });
  }

  res.render("graph", { Nodes: viznodes, Edges: vizedges });
};