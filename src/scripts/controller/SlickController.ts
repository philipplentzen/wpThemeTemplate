import {Controller} from "./Controller";
import * as $ from "jquery";
import "slick-carousel";

export class SlickController extends Controller {
    private selector: JQuery.htmlString;
    private readonly config: JQuerySlickOptions;

    constructor(selector: JQuery.htmlString, config: JQuerySlickOptions) {
        super();
        this.selector = selector;
        this.config = config;
    }

    public init(): void {
        $(this.selector).slick(
            {
                rows: 0,
                prevArrow: null,
                nextArrow: null,
                variableWidth: true,
                ...this.config
            }
        );
    }
}