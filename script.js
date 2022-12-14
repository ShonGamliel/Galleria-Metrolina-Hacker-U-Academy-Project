/*
    paintings names in paintings-names.txt were taken from
    https://www.brushwiz.com/most-famous-paintings/

    by running the following code in the chrome console:

        let elements = document.querySelectorAll('[class="col-item-title"]')
        let names = ""
        for(let element of elements){
            names = names+"\n"+element.innerText
        }

        console.log(names)
*/
/*
    first names in first-names.txt were taken from
    https://github.com/dominictarr/random-name/blob/master/first-names.txt
*/
/*
    last names in last-names.txt were taken from
    https://github.com/arineng/arincli/blob/master/lib/last-names.txt
*/

class Image {
  constructor(imgname, creator, price, url, available) {
    this.imgname = imgname;
    this.creator = creator;
    this.price = price;
    this.url = url;
    this.available = available;
  }
}

let images = [];

Promise.all([
  fetch("./html from google images.html").then((t) => t.text()),
  fetch("./first-names.txt").then((t) => t.text()),
  fetch("./last-names.txt").then((t) => t.text()),
  fetch("./paintings-names.txt").then((t) => t.text()),
]).then(([googleHTML, firstnames, lastnames, paintingsnames]) => {
  firstnames = firstnames.split("\r\n");
  lastnames = lastnames.split("\r\n");
  paintingsnames = paintingsnames.split("\r\n");

  document.getElementById("testings").innerHTML = googleHTML;
  let elements = document
    .getElementById("testings")
    .getElementsByClassName("rg_i Q4LuWd");
  for (let element of elements) {
    if (element.getAttribute("src")) {
      if (
        element.getAttribute("src").length > 20 &&
        element.getAttribute("src").length < 1000
      ) {
        let random_name =
          firstnames[Math.floor(Math.random() * firstnames.length)] +
          " " +
          lastnames[Math.floor(Math.random() * lastnames.length)].toLowerCase();

        let random_painting_name =
          paintingsnames[Math.floor(Math.random() * paintingsnames.length)];
        let newImg = new Image(
          random_painting_name,
          random_name,
          Math.ceil(Math.floor(Math.random() * 1000) / 10) * 10,
          element.getAttribute("src"),
          Math.random() < 0.5
        );
        images.push(newImg);

        document.getElementById("images").innerHTML =
          document.getElementById("images").innerHTML +
          `
              <div class="image">
              <img src="${newImg.url}" alt="">
              <div class="image-title">${newImg.imgname}</div>
              <div class="image-creator">${newImg.creator}</div>
              <div class="image-price">$${newImg.price}</div>
              ${
                newImg.available == true
                  ? ""
                  : '<div style="color:red">Not available</div>'
              }
              </div>
          `;
      }
    }
  }
});

function showAllImages() {
  document.getElementById("images").innerHTML = "";
  for (let image of images) {
    document.getElementById("images").innerHTML =
      document.getElementById("images").innerHTML +
      `
              <div class="image">
              <img src="${image.url}" alt="">
              <div class="image-title">${image.imgname}</div>
              <div class="image-creator">${image.creator}</div>
              <div class="image-price">$${image.price}</div>
              ${
                image.available == true
                  ? ""
                  : '<div style="color:red">Not available</div>'
              }
              </div>
          `;
  }
}

function updateImages(e) {
  document.getElementById("images").innerHTML = "";
  let value = "";
  if (e.key.length == 1) {
    value = e.target.value + e.key;
  } else if (e.key == "Backspace") {
    value = e.target.value.slice(0, -1);
  }
  if (value.length == 0) {
    showAllImages();
  } else {
    filterImages(value);
  }
}

function filterImages(search_key) {
  document.getElementById("images").innerHTML = "";
  let imgs = images.filter((img) =>
    img.imgname.toLowerCase().includes(search_key)
  );
  for (let image of imgs) {
    document.getElementById("images").innerHTML =
      document.getElementById("images").innerHTML +
      `
        <div class="image">
        <img src="${image.url}" alt="">
        <div class="image-title">${image.imgname}</div>
        <div class="image-creator">${image.creator}</div>
        <div class="image-price">$${image.price}</div>
        ${
          image.available == true
            ? ""
            : '<div style="color:red">Not available</div>'
        }
        </div>
      `;
  }
}
