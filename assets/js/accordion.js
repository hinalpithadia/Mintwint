document.addEventListener('DOMContentLoaded', () => {
    const defaultAccordionGroups = document.querySelectorAll('.accordion-group[data-accordion="default-accordion"]');
    const alwaysOpenAccordionGroup = document.querySelector('.accordion-group[data-accordion="always-open-accordion"]');
  
    if (defaultAccordionGroups) {
        defaultAccordion(defaultAccordionGroups);
    }
    if (alwaysOpenAccordionGroup) {
        alwaysOpenAccordion(alwaysOpenAccordionGroup);
    }
  
  });
  
  
  function defaultAccordion(defaultAccordionGroups) {
    defaultAccordionGroups.forEach(defaultAccordionGroup => {
        const accordionButtons = defaultAccordionGroup.querySelectorAll('.accordion-toggle');
        accordionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const accordion = button.parentElement;
                const content = button.nextElementSibling;
                const isOpen = content.style.maxHeight !== '';
  
                if (isOpen) {
                    close(button);
                    content.style.maxHeight = '';
                    accordion.classList.remove('active');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    accordion.classList.add('active');
                    accordionButtons.forEach(otherButton => {
                        if (otherButton !== button) {
                            const otherAccordion = otherButton.parentElement;
                            otherAccordion.classList.remove('active');
                            close(otherButton);
                        }
                    });
                }
            });
        });
    });
  }
  
  function close(element, accordion) {
    const content = element.nextElementSibling;
    content.style.maxHeight = '';
  }
  function alwaysOpenAccordion(alwaysOpenAccordionGroup) {
    const accordionButtons = alwaysOpenAccordionGroup.querySelectorAll('.accordion-toggle');
    console.log(accordionButtons.length);
    // var acc = document.getElementsByClassName("acc");
    var i;
  
    for (i = 0; i < accordionButtons.length; i++) {
        accordionButtons[i].addEventListener("click", function () {
            this.parentElement.classList.toggle("active");
            var acc_panel = this.nextElementSibling;
  
            if (acc_panel.style.maxHeight) {
                acc_panel.style.maxHeight = '';
            } else {
                acc_panel.style.maxHeight = acc_panel.scrollHeight + "px";
            }
        });
    }
  }