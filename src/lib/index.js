var win = window;
var doc = document;
var body = doc.body;
var createElement = function(a, b) {
  var d = doc.createElement(a);
  if (b && "object" == typeof b) {
    var e;
    for (e in b) {
      if ("html" === e) {
        d.innerHTML = b[e];
      } else {
        d.setAttribute(e, b[e]);
      }
    }
  }
  return d;
};

var remove = function(array, element) {
  const arrCopy = [...array];
  const index = arrCopy.indexOf(element);

  if (index !== -1) {
    arrCopy.splice(index, 1);
  }
  return arrCopy;
};

var handleDelete = function(element) {
  const table = document.getElementById("spreadsheet");
  table.deleteRow(element.parentNode.parentNode.rowIndex);
};

win.dataTable = function(headers, rows) {
  console.log("inside data table", headers, rows);
  this.headers = ["", ...headers] || [];
  this.rows = rows || [];
  this.table = document.getElementById("spreadsheet");
  //   creating table headers
  var thead = createElement("thead");
  var tr = createElement("tr");
  for (var i = 0; i < this.headers.length; i++) {
    var td = createElement("td", {
      html: this.headers[i]
    });

    tr.appendChild(td);
  }
  thead.appendChild(tr);
  this.table.appendChild(thead);
  // creating table body
  var tbody = createElement("tbody");

  for (var i = 0; i < this.rows.length; i++) {
    const tbodyTr = createElement("tr");
    const tempTd = createElement("td");
    var deleteButton = createElement("button", {
      html: "delete",
      onclick: "handleDelete(this, this.table)",
      class: "danger"
    });
    tempTd.appendChild(deleteButton);
    tbodyTr.appendChild(tempTd);
    for (var j = 1; j < this.headers.length; j++) {
      const tbodyTd = createElement("td", {
        html: this.rows[i][this.headers[j]]
      });
      tbodyTr.appendChild(tbodyTd);
    }
    tbody.appendChild(tbodyTr);
  }
  this.table.appendChild(tbody);
};
