import { allRandom } from "./sub_services/all_random";
import { gamme } from "./sub_services/gamme";
import { minMaxRandom } from "./sub_services/min_max_random";
import { oneRandom } from "./sub_services/one_random";
import { update } from "./vexflow";


export default function startup() {
  document.addEventListener("DOMContentLoaded", function () {
    update();
  });

  document
    .getElementById("btn-menu")
    ?.addEventListener("click", function (this) {
      const menu = document.getElementById("menu");

      this.style.display = "none";

      if (menu) {
        if (menu.style.display === "none") {
          menu.style.display = "flex";
        } else {
          menu.style.display = "none";
        }
      }
    });

  document.getElementById("btn-close")?.addEventListener("click", function () {
    const menu = document.getElementById("menu");
    if (menu) {
      menu.style.display = "none";
      document.getElementById("btn-menu").style.display = "block";
    }
  });

  document
    .getElementById("input-number-staves")
    ?.addEventListener("change", function (this) {
      update();
    });

    document
    .getElementById("input-beat-value")
    ?.addEventListener("change", function (this) {
      update();
    });

    document
    .getElementById("input-num-beat")
    ?.addEventListener("change", function (this) {
      update();
    });

    document
    .getElementById("btn-random-all-mesure")
    ?.addEventListener("click", function () {
      oneRandom();
    });

    document
    .getElementById("btn-all-random")
    ?.addEventListener("click", function () {
      allRandom();
    });

    document
    .getElementById("btn-random-min-max")
    ?.addEventListener("click", function () {
      minMaxRandom();
    })

    document
    .getElementById("btn-gamme")
    ?.addEventListener("click", function () {
      gamme();
    })
}
