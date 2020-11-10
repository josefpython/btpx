document.getElementById("gen").addEventListener("click", generate);
document.getElementById("show").addEventListener("click", showPass);
document.getElementById("test").addEventListener("click", getUrl);
document.getElementById("showHelp").addEventListener("click", showHelp);

function showHelp() {

    if(document.getElementById("warn").style.display == "none") {
      document.getElementById("warn").style.display = "inline";
    } else {
      document.getElementById("warn").style.display = "none";
    }

}

function generate() {
    var x = document.getElementById("pw_phrase").value;
    var ydec = document.getElementById("pw_sys").value.toLowerCase();
    var y = letterValue(ydec).toString()
    var decodedString = y.replace(/,/g,"").replace(/ /g,"").slice(0,5).concat(btoa(x));
    document.getElementById("gen_text").innerHTML = decodedString;
    if(document.getElementById("autoCopy").checked == true)
    {
      navigator.clipboard.writeText(decodedString);
    }

  }

function showPass () {
  if (document.getElementById("pw_phrase").type == "password") { document.getElementById("pw_phrase").type = "text" }
  else { document.getElementById("pw_phrase").type = "password" }
  
}

function letterValue(str){
  var anum={
      a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, 
      l: 12, m: 13, n: 14,o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, 
      u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
  }
  if(str.length== 1) return anum[str] || ' ';
  return str.split('').map(letterValue);
}

function getUrl() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    var full = tabs[0].url
    var edit = new URL(full).hostname
    if(edit[0]==="w" & edit[1] === "w" & edit[2] === "w" & edit[3] === "."){
      edit = edit.split("www.")[1]
    };
    document.getElementById("pw_sys").value = edit.split(".").slice(-2)[0];
});
}
