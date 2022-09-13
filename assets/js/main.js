document.addEventListener("DOMContentLoaded", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  window.addEventListener("resize", () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
  const header = document.querySelector(".section_header");

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add("active");
        document.addEventListener("scroll", () => {
          window.scrollY > 0
            ? (header.style.backgroundColor = "rgba(255, 255, 255, .35)")
            : (header.style.backgroundColor = "white");

          document.querySelectorAll(".section_video video").forEach(video => {
            window.scrollY > document.querySelector(".section_steps").offsetTop ? video.pause() : video.play();
          });
        });

        if (entry.target.classList.contains("section_gradient")) {
          const images = entry.target.querySelectorAll("img");
          images.forEach(img => {});
        }
      } else {
        entry.target.classList.remove("active");
      }
    });

    const ioSteps = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target.querySelector("video");
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add("active");
          video.play();
        } else {
          entry.target.classList.remove("active");
          video.pause();
          video.currentTime = 0;
        }
      });
    });

    const steps = document.querySelectorAll(".section_steps .step");
    steps.forEach(step => {
      ioSteps.observe(step);
    });
  });

  const sections = document.querySelectorAll(".content_event section");
  sections.forEach(section => {
    io.observe(section);
  });
});
