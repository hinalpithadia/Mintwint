$(document).ready(function () {
  $(".dropbtn").click(function (event) {
    event.stopPropagation();

    const $this = $(this);
    const $thisDropdown = $this.closest("li").find(".dropdown-content-rel");

    // Close other dropdowns
    $(".dropdown-content-rel").not($thisDropdown).slideUp();
    $(".dropbtn").not($this).removeClass("active")
      .closest('.drop-top').removeClass('parent-active');

    // Toggle current dropdown
    $thisDropdown.slideToggle();
    $this.toggleClass("active");

    // Toggle parent class
    $this.closest('.drop-top').toggleClass('parent-active', $this.hasClass('active'));
  });

  // Close all when clicking outside
  $(window).click(function () {
    $(".dropdown-content-rel").slideUp();
    $(".dropbtn").removeClass("active");
    $(".drop-top").removeClass("parent-active");
  });

  // Prevent dropdown from closing on inner click
  $(".dropdown-content-rel").click(function (event) {
    event.stopPropagation();
  });
});



// $(document).ready(function () {
//   $(".nav-toggler").click(function () {
//     const $toggleData = $(".toggle-data");

//     if ($toggleData.is(":visible")) {
//       $toggleData.slideUp(200, function () {
//         $(this).addClass("hidden");
//       });
//     } else {
//       $toggleData.removeClass("hidden").hide().slideDown(200);
//     }
//   });
// });

$(document).ready(function () {
  $(".dropdown-toggle").click(function (e) {
    e.stopPropagation();
    const $wrapper = $(this).closest(".dropdown-wrapper");
    const $menu = $wrapper.find(".dropdown-menu");
    const placement = $wrapper.data("placement");

    // Hide all other dropdowns
    $(".dropdown-menu").not($menu).slideUp(150).addClass("hidden");

    // Toggle this one
    if ($menu.is(":visible")) {
      $menu.slideUp(150, () => $menu.addClass("hidden"));
    } else {
      // Set position based on placement
      $menu.removeClass("hidden").css({ top: "", bottom: "", left: "", right: "" });

      const offset = 8; // spacing between button and menu
      switch (placement) {
        case "top":
          $menu.css({ bottom: `calc(100% + ${offset}px)` });
          break;
        case "bottom":
          $menu.css({
            top: `calc(100% + ${offset}px)`,
            right: "0"
          });
          break;
        case "left":
          $menu.css({ right: `calc(100% + ${offset}px)`, top: "0" });
          break;
        case "right":
          $menu.css({ left: `calc(100% + ${offset}px)`, top: "0" });
          break;
      }

      $menu.hide().slideDown(150);
    }
  });

  // $(window).click(function () {
  //   $(".dropdown-menu").slideUp(150).addClass("hidden");
  // });
});

// Loop through all .menu-item blocks
document.querySelectorAll(".menu-item").forEach(item => {
  const sideLink = item.querySelector(".side-link");
  const dropTop = item.querySelector(".drop-top");

  // Hover effects - ONLY for dropdown visibility (.drop-top)
  sideLink.addEventListener("mouseenter", () => {
    dropTop.classList.add("active");
  });

  sideLink.addEventListener("mouseleave", () => {
    dropTop.classList.remove("active");  // Only affects dropdown, NOT parent
  });

  // Click functionality - ONLY for parent active state (.menu-item)
  sideLink.addEventListener("click", (e) => {
    //e.preventDefault();

    // Remove active class from ALL other menu-item parents
    document.querySelectorAll(".menu-item").forEach(menuItem => {
      menuItem.classList.remove("active");
    });

    // Add active class to THIS clicked item's parent
    item.classList.add("active");
    // This active class will NOT be removed by mouse leave events
  });
});


//==================Modal=====================//
const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modalTrigger");
const modalCloseButtons = document.querySelectorAll(".modal-close");
const CloseButtons = document.querySelectorAll(".close-btn");
const overlay = document.querySelector(".overlay-modal");

modalTriggerButtons.forEach(elem => {
    elem.addEventListener("click", event => {
        const targetModalId = event.currentTarget.getAttribute("data-modal-target");

        // Close all modals before opening the target modal
        modals.forEach(modal => {
            if (modal.id !== targetModalId) {
                closeModal(modal.id, false); // Close without hiding the overlay
            }
        });

        toggleModal(targetModalId);

        // Show the overlay
        overlay.style.opacity = "1";
        overlay.style.zIndex = "200";
        overlay.style.visibility = "visible";
        overlay.style.transition = "opacity 0.3s ease"; // Optional transition
    });
});

modalCloseButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        closeAllModals(); // Close all modals and hide overlay
    });
});

CloseButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        closeAllModals(); // Close all modals and hide overlay
    });
});

modals.forEach(elem => {
    elem.addEventListener("click", event => {
        if (event.currentTarget === event.target) closeModal(event.currentTarget.id, true);
    });
});

// Close Modal with "Esc" key
document.addEventListener("keydown", event => {
    if (event.key === "Escape" || event.keyCode === 27) {
        closeAllModals(); // Close all modals and hide overlay
    }
});

// Helper Functions

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);

    if (getComputedStyle(modal).display === "flex") {
        closeModal(modalId, true);
    } else {
        modal.style.display = "flex";
        modal.classList.add("modal-show");
    }
}

function closeModal(modalId, hideOverlay = true) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.add("modal-hide");
        setTimeout(() => {
            modal.classList.remove("modal-show", "modal-hide");
            modal.style.display = "none";
        }, 200);
    }

    // Hide overlay if specified
    if (hideOverlay) {
        overlay.style.opacity = "0";
        overlay.style.zIndex = "-1";
        overlay.style.visibility = "hidden";
        overlay.style.transition = "opacity 0.3s ease"; // Optional transition
    }
}

function closeAllModals() {
    modals.forEach(modal => closeModal(modal.id, true));
}


// Updated JavaScript for 3-way pricing toggle
document.addEventListener('DOMContentLoaded', function () {
  const monthlyRadio = document.getElementById('monthly');
  const yearlyRadio = document.getElementById('yearly');
  const lifetimeRadio = document.getElementById('lifetime');
  const slider = document.querySelector('.toggle-slider');
  const prices = document.querySelectorAll('.price');
  const postfixes = document.querySelectorAll('.postfix');
  const yearlyBadge = document.querySelector('.yearly-badge');
  const lifetimeBadge = document.querySelector('.lifetime-badge');
  const labels = document.querySelectorAll('.toggle-labels label');

  function updatePricing(selectedPlan) {
    // Update slider position
    if (selectedPlan === 'monthly') {
      slider.style.left = '4px';
      slider.style.width = '32%';
    } else if (selectedPlan === 'yearly') {
      slider.style.left = '34%';
      slider.style.width = '32%';
    } else if (selectedPlan === 'lifetime') {
      slider.style.left = '67.3%';
      slider.style.width = '32%';
    }

    // Update pricing
    prices.forEach(price => {
      const monthlyPrice = price.getAttribute('data-monthly');
      const yearlyPrice = price.getAttribute('data-yearly');
      const lifetimePrice = price.getAttribute('data-lifetime');

      if (selectedPlan === 'monthly') {
        price.textContent = monthlyPrice;
      } else if (selectedPlan === 'yearly') {
        price.textContent = yearlyPrice;
      } else if (selectedPlan === 'lifetime') {
        price.textContent = lifetimePrice;
      }
    });

    // Update postfix text
    postfixes.forEach(postfix => {
      if (selectedPlan === 'monthly') {
        postfix.textContent = '/ Month';
      } else if (selectedPlan === 'yearly') {
        postfix.textContent = '/ Month';
      } else if (selectedPlan === 'lifetime') {
        postfix.textContent = ' One-time';
      }
    });

    // ✅ Update copies only for Pro plan
    const copiesEl = document.querySelector('.copies');
    if (copiesEl) {
      if (selectedPlan === 'lifetime') {
        copiesEl.textContent = '500 Copies / month';
      } else {
        copiesEl.textContent = '300 Copies / month';
      }
    }

    // Update badges visibility
    yearlyBadge.style.opacity = selectedPlan === 'yearly' ? '1' : '1';
    lifetimeBadge.style.opacity = selectedPlan === 'lifetime' ? '1' : '0';
    yearlyBadge.style.opacity = selectedPlan === 'lifetime' ? '0' : '1';

    // Update label colors
    labels.forEach(label => {
      if (label.getAttribute('for') === selectedPlan) {
        label.style.color = '#004046'; // Dark color for selected
      } else {
        label.style.color = 'white'; // White for unselected
      }
    });
  }
  // Event listeners
  monthlyRadio.addEventListener('change', () => updatePricing('monthly'));
  yearlyRadio.addEventListener('change', () => updatePricing('yearly'));
  lifetimeRadio.addEventListener('change', () => updatePricing('lifetime'));

  // Label click handlers
  labels.forEach(label => {
    label.addEventListener('click', function () {
      const targetRadio = document.getElementById(this.getAttribute('for'));
      targetRadio.checked = true;
      updatePricing(this.getAttribute('for'));
    });
  });

  // Initialize with monthly selected
  updatePricing('monthly');
});
/*==========tabs===============*/
   document.addEventListener('click', function (event) {
        // Check if the clicked element has the "tablink" class
        if (event.target.classList.contains('tablink')) {
            var tab = event.target.dataset.tab; // Get the data-tab attribute value
            var tabContainer = event.target.closest('.tabs'); // Find the closest .tabs container
            // Hide all tab content within the current tab container
            var tabcontents = tabContainer.querySelectorAll('.tabcontent');
            for (var i = 0; i < tabcontents.length; i++) {
                tabcontents[i].style.display = 'none';
            }

            // Remove "active" class from all tab links within the current tab container
            var tablinks = tabContainer.querySelectorAll('.tablink');
            for (var i = 0; i < tablinks.length; i++) {
                tablinks[i].classList.remove('active');
            }

            // Show the current tab content and add "active" class to the clicked tab link
            var tabcontent = tabContainer.querySelector('#' + tab);
            tabcontent.style.display = 'block';
            event.target.classList.add('active');
        }
    });