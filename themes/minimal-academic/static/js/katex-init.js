// Common LaTeX macros from Yash's preamble, so posts can use the same
// shorthand they would in a .tex file. Add more here as needed.
var mathMacros = {
  "\\Z": "\\mathbb{Z}",
  "\\N": "\\mathbb{N}",
  "\\Q": "\\mathbb{Q}",
  "\\R": "\\mathbb{R}",
  "\\C": "\\mathbb{C}",
  "\\F": "\\mathbb{F}",
  "\\A": "\\mathbb{A}",
  "\\OO": "\\mathcal{O}",
  "\\op": "\\mathcal{O}",
  "\\im": "\\operatorname{im}",
  "\\coker": "\\operatorname{coker}",
  "\\id": "\\operatorname{id}",
  "\\Id": "\\operatorname{Id}",
  "\\Spec": "\\operatorname{Spec}",
  "\\Hom": "\\operatorname{Hom}",
  "\\End": "\\operatorname{End}",
  "\\Aut": "\\operatorname{Aut}",
  "\\Gal": "\\operatorname{Gal}",
  "\\rad": "\\operatorname{rad}",
  "\\ord": "\\operatorname{ord}",
  "\\eps": "\\varepsilon",
  "\\con": "\\overline{#1}",
  "\\Zc": "\\mathbb{Z}/#1\\mathbb{Z}",
  "\\tox": "\\xrightarrow{#1}"
};

document.addEventListener("DOMContentLoaded", function () {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false }
    ],
    macros: mathMacros,
    throwOnError: false
  });
});
