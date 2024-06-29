function ensureOtherIsLast(arr) {
  const otherIndex = (arr ?? []).findIndex((item) => item.value === "Other");

  if (otherIndex !== -1) {
    const [otherItem] = arr.splice(otherIndex, 1);
    arr.push(otherItem);
  }
  return arr;
}

function getGlobalLabels() {
  let labels = Near.view("${REPL_AI_PGF_FORUM_CONTRACT}", "get_global_labels");
  if (labels !== null) {
    labels = ensureOtherIsLast(labels);
  }
  console.log(labels);
  return labels ?? null;
}

return {
  getGlobalLabels,
};
