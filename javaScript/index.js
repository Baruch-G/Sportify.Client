function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("open");
  }
  document.addEventListener("click", (event) => {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector(".menu-icon");
    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
      sidebar.classList.remove("active");
    }
  });