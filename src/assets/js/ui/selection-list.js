function createSelectionList(listId, classSelected) {
    let list = document.querySelector(`[data-selection-list-id="${listId}"]`);
    let options = document.querySelectorAll(
        `[data-selection-list-option][data-selection-list-id="${listId}"]`
    );
    options.forEach(element => {
        element.addEventListener("click", () => {
            let optionValue = element.getAttribute("data-selection-list-option");
            let attribute = list.getAttribute("data-selection-list-selected"); 
            if (attribute === optionValue) {
                list.removeAttribute("data-selection-list-selected");
                element.classList.remove(classSelected);
                return;
            } else if (attribute != undefined) {
                let option = document.querySelector(
                    `[data-selection-list-option=${attribute}][data-selection-list-id="${listId}"]`
                );
                option.classList.remove(classSelected);
            }
            
            list.setAttribute("data-selection-list-selected", optionValue);
            element.classList.add(classSelected);
        });
    })
}