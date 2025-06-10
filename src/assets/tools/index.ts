import { Offcanvas } from "bootstrap"

export function openOffcanvas(offcanvas: string) {
  const offcanvasElement = document.getElementById(offcanvas);
  if (!offcanvasElement) return;

  let offcanvasInstance = Offcanvas.getInstance(offcanvasElement);

  if (!offcanvasInstance) {
    offcanvasInstance = new Offcanvas(offcanvasElement);
  }

  offcanvasInstance.show();
}