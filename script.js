document.querySelectorAll("tbody tr").forEach(row => {
    row.style.cursor = "pointer";
    row.addEventListener("click", () => {
        const url = row.getAttribute("data-href");
        if (url) window.open(url, "_blank");
    });
});

