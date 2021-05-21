import * as $ from "jquery"
import {NavigationController} from "./controller/NavigationController";
import {SlickController} from "./controller/SlickController";

const navigationController = new NavigationController();
const slickController = new SlickController(
    ".carousel",
    {
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 300,
        adaptiveHeight: true,
        prevArrow: null,
        nextArrow: "<h1>TEST</h1>",
    }
);

$(() => {
    navigationController.init();
    slickController.init();
});