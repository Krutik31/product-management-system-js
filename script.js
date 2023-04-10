function main() {
  if (localStorage.getItem("entries") != null) {
    var html = "";
    var entries = parseInt(localStorage.getItem("entries"));
    for (let i = 0; i < entries; i++) {
      var ids = JSON.parse(localStorage.getItem("ids"))[i];
      var pname = JSON.parse(localStorage.getItem("pname"))[i];
      var price = JSON.parse(localStorage.getItem("price"))[i];
      var description = JSON.parse(localStorage.getItem("description"))[i];
      var pimage = JSON.parse(localStorage.getItem("pimage"))[i];

      html =
        html +
        "<tr><td>" +
        ids +
        "</td> <td>" +
        pname +
        "</td> <td><img src='" +
        pimage +
        "' style='width: 60px;'></td> <td>" +
        price +
        "</td> <td>" +
        description +
        "</td> <td><button type='button' onclick='editProduct(" +
        i +
        ")' class='btn btn-sm btn-warning' data-toggle='modal' data-target='#editProduct'>Edit</button> <button onclick='removeProduct(" +
        i +
        ")' class='btn btn-sm btn-danger'>Remove</button></td></tr>";
    }
    document.getElementById("ProductData").innerHTML = html;
  }
}

let form = document.getElementById("CreateProductForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  var pname = document.getElementById("pname").value;
  var price = document.getElementById("price").value;
  var description = document.getElementById("description").value;
  var pimage = document.getElementById("pimage").value;

  if (pname == "") {
    alert("Product name is required!");
  } else if (price == "") {
    alert("Price is required!");
  } else if (description == "") {
    alert("Product description is required!");
  } else if (pimage == "") {
    alert("Product image is required!");
  } else {
    if (localStorage.getItem("entries") == null) {
      var entries = 1;
      var idarr = [entries];
      var pnamearr = [pname];
      var pricearr = [price];
      var descriptionarr = [description];
      localStorage.setItem("entries", entries);
      localStorage.setItem("ids", JSON.stringify(idarr));
      localStorage.setItem("pname", JSON.stringify(pnamearr));
      localStorage.setItem("price", JSON.stringify(pricearr));
      localStorage.setItem("description", JSON.stringify(descriptionarr));

      const image = document.getElementById("pimage").files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener("load", () => {
        localStorage.setItem("pimage", JSON.stringify([reader.result]));
      });
    } else {
      var entries = parseInt(localStorage.getItem("entries")) + 1;
      localStorage.setItem("entries", entries);
      var idarr = JSON.parse(localStorage.getItem("ids"));
      idarr.push(entries);
      var pnamearr = JSON.parse(localStorage.getItem("pname"));
      pnamearr.push(pname);
      var pricearr = JSON.parse(localStorage.getItem("price"));
      pricearr.push(price);
      var descriptionarr = JSON.parse(localStorage.getItem("description"));
      descriptionarr.push(description);

      localStorage.setItem("ids", JSON.stringify(idarr));
      localStorage.setItem("pname", JSON.stringify(pnamearr));
      localStorage.setItem("price", JSON.stringify(pricearr));
      localStorage.setItem("description", JSON.stringify(descriptionarr));

      const image = document.getElementById("pimage").files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      var pimagearr = JSON.parse(localStorage.getItem("pimage"));
      reader.addEventListener("load", () => {
        pimagearr.push(reader.result);
        localStorage.setItem("pimage", JSON.stringify(pimagearr));
      });
    }
    location.reload();
  }
});

function removeProduct(index) {
  localStorage.setItem(
    "entries",
    parseInt(localStorage.getItem("entries")) - 1
  );
  var idarr = JSON.parse(localStorage.getItem("ids"));
  idarr.splice(index, 1);
  var pnamearr = JSON.parse(localStorage.getItem("pname"));
  pnamearr.splice(index, 1);
  var pricearr = JSON.parse(localStorage.getItem("price"));
  pricearr.splice(index, 1);
  var descriptionarr = JSON.parse(localStorage.getItem("description"));
  descriptionarr.splice(index, 1);
  var pimagearr = JSON.parse(localStorage.getItem("pimage"));
  pimagearr.splice(index, 1);

  localStorage.setItem("ids", JSON.stringify(idarr));
  localStorage.setItem("pname", JSON.stringify(pnamearr));
  localStorage.setItem("price", JSON.stringify(pricearr));
  localStorage.setItem("description", JSON.stringify(descriptionarr));
  localStorage.setItem("pimage", JSON.stringify(pimagearr));

  main();
}

function editProduct(index) {
  let form = document.getElementById("UpdateProductForm");

  var pnamearr = JSON.parse(localStorage.getItem("pname"));
  var pricearr = JSON.parse(localStorage.getItem("price"));
  var descriptionarr = JSON.parse(localStorage.getItem("description"));
  var pimagearr = JSON.parse(localStorage.getItem("pimage"));

  document.getElementById("edit-pname").value = pnamearr[index];
  document.getElementById("edit-price").value = pricearr[index];
  document.getElementById("edit-description").value = descriptionarr[index];
  document.getElementById("edit-productimage").innerHTML =
    "<img src='" + pimagearr[index] + "' style='width: 100px;'>";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    var pname = document.getElementById("edit-pname").value;
    var price = document.getElementById("edit-price").value;
    var description = document.getElementById("edit-description").value;
    var pimage = document.getElementById("edit-pimage").value;

    if (pname == "") {
      alert("Product name is required!");
    } else if (price == "") {
      alert("Price is required!");
    } else if (description == "") {
      alert("Product description is required!");
    } else if (pimage == "") {
      alert("Kindly select Product Image!");
    } else {
      pnamearr.splice(index, 1, pname);
      pricearr.splice(index, 1, price);
      descriptionarr.splice(index, 1, description);

      localStorage.setItem("pname", JSON.stringify(pnamearr));
      localStorage.setItem("price", JSON.stringify(pricearr));
      localStorage.setItem("description", JSON.stringify(descriptionarr));

      const image = document.getElementById("edit-pimage").files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener("load", () => {
        pimagearr.splice(index, 1, reader.result);
        localStorage.setItem("pimage", JSON.stringify(pimagearr));
      });
    }
    location.reload();
  });
}

function searchProduct() {
  var inp = document.getElementById("search").value;

  if (inp) {
    var idarr = JSON.parse(localStorage.getItem("ids"));

    if (localStorage.getItem("entries") != null) {
      var html = "";
      var entries = parseInt(localStorage.getItem("entries"));
      for (let i = 0; i < entries; i++) {
        var id = JSON.parse(localStorage.getItem("ids"))[i];
        var pname = JSON.parse(localStorage.getItem("pname"))[i];
        var price = JSON.parse(localStorage.getItem("price"))[i];
        var description = JSON.parse(localStorage.getItem("description"))[i];
        var pimage = JSON.parse(localStorage.getItem("pimage"))[i];

        if (
          id == inp ||
          pname.toLowerCase().includes(inp.toLowerCase()) ||
          price.includes(inp)
        ) {
          html =
            html +
            "<tr><td>" +
            id +
            "</td> <td>" +
            pname +
            "</td> <td><img src='" +
            pimage +
            "' style='width: 60px;'></td> <td>" +
            price +
            "</td> <td>" +
            description +
            "</td> <td><button type='button' onclick='editProduct(" +
            i +
            ")' class='btn btn-sm btn-warning' data-toggle='modal' data-target='#editProduct'>Edit</button> <button onclick='removeProduct(" +
            i +
            ")' class='btn btn-sm btn-danger'>Remove</button></td></tr>";
        }
      }
      document.getElementById("ProductData").innerHTML = html;
    }
  } else {
    main();
  }
}

// Bootstrap Form upload js
$(".custom-file-input").on("change", function () {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
