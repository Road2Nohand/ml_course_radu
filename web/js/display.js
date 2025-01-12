
function createRow(container, studentName, samples) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    const rowLabel = document.createElement("p");
    rowLabel.innerHTML = studentName;
    rowLabel.classList.add("rowLabel");
    row.appendChild(rowLabel);

    for (let sample of samples) {
        const {id, label} = sample;
        const imgUrl = constants.IMG_DIR + "/" + id + ".png";

        const img = document.createElement("img");
        img.src = imgUrl;
        img.classList.add("thumb");

        // Jedes IMG im Vollbild öffnenbar
        img.onclick = () => {
            window.open(imgUrl);
        }

        row.appendChild(img);
    }
}