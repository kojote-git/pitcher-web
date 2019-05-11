document.getElementById("filters-toggle")
.addEventListener("click", function(e) {
    let filters = document.getElementById("filters");
    filters.classList.toggle("filters-collapsed");
    filters.classList.toggle("filters-expanded");
});

createSelectionList("filter-options-sort-by", "sort-by-selected");