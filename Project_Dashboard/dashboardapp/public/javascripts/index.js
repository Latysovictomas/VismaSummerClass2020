import { UI } from "./ui.js";
import { WidgetForm } from "./widget-form.js";
import { CURRENT_URL } from "./utils/urls.js";

function main() {
    if (CURRENT_URL.href === CURRENT_URL.origin + "/" ||
        CURRENT_URL.href.includes("/index.html")) {
        UI.init();
    }

    if (CURRENT_URL.href.includes("/widget-form")) {
        WidgetForm.init();
    }
}

main();