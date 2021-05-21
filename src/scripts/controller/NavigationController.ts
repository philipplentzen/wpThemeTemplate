import {Controller} from "./Controller";
import {gsap} from "gsap";

export class NavigationController extends Controller {
    private navSelector: string;
    private button: HTMLButtonElement;
    private isOpen: boolean;
    private timelineMenu: gsap.core.Timeline;
    private timelineButton: gsap.core.Timeline;

    public init(): void {
        this.navSelector = "nav.header";
        this.button = document.querySelector("button#full-page-navigation");
        this.isOpen = false;
        this.timelineMenu = gsap.timeline();
        this.timelineButton = gsap.timeline();

        this.addEventListener();
        this.createTimeline();
    }

    private addEventListener(): void {
        this.button.addEventListener("click", () => {
            console.log(this.isOpen)
            if (this.isOpen) {
                this.isOpen = false;
                this.timelineMenu.reverse();
                this.timelineButton.reverse();
            } else {
                this.isOpen = true;
                this.timelineMenu.play();
                this.timelineButton.play();
            }
        });
    }

    private createTimeline() {
        this.timelineMenu
            .pause()
            .set(["body", this.navSelector, this.navSelector + " li"], {
                clearProps: "all",
            })
            .set("body", {
                overflow: "hidden"
            })
            .to(this.navSelector, {
                top: 0,
                width: "100%",
                ease: "power2.inOut",
                duration: .3,
            })
            .to(this.navSelector + " li", {
                opacity: 1,
                marginTop: 0,
                ease: "power2.inOut",
                duration: .3,
                stagger: .1
            });
        // Button
        this.timelineButton
            .pause()
            .to("button#full-page-navigation span", {
                background: "var(--text)",
                ease: "power2.inOut",
                duration: .3,
            })
            .to("button#full-page-navigation span", {
                width: "100%",
                ease: "power2.inOut",
                duration: .3,
            }, "<")
            .to("button#full-page-navigation span", {
                top: "50%",
                ease: "power2.inOut",
                duration: .3,
            })
            .to("button#full-page-navigation span:first-child", {
                transform: "rotate(45deg)",
                ease: "power2.inOut",
                duration: .3,
            })
            .to("button#full-page-navigation span:nth-child(2)", {
                opacity: 0,
                ease: "power2.inOut",
                duration: .3,
            }, "<")
            .to("button#full-page-navigation span:last-child", {
                transform: "rotate(-45deg)",
                ease: "power2.inOut",
                duration: .3,
            }, "<");
    }
}