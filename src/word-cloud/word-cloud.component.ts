import {Component, Input, ElementRef, DoCheck, KeyValueDiffers} from '@angular/core';
import * as D3 from 'd3';
import {DataService} from "../common/data.service";
import {ITag} from "../common/data.model";

import * as _ from "lodash";

//declare let d3: any;

export interface IWordCloudSettings {
    minFontSize: number; // default 18
    maxFontSize: number; // default 96
    fontFace: string; // default Roboto
    fontWeight: string; // default normal
    spiral: string; // default rectangular
}
export class WordCloudConfig {
    dataset: string[];
    settings: IWordCloudSettings;
}

@Component({
    selector: 'word-cloud-root',
    templateUrl: './word-cloud.component.html',
    styleUrls: ['./word-cloud.component.scss']
})
export class WordCloudComponent implements DoCheck {

    @Input() private settings:IWordCloudSettings;

    private config:WordCloudConfig;
    private tags:ITag[];

    private _host;              // D3 object referencing host DOM object
    private _svg;               // SVG in which we will print our chart
    private _margin: {          // Space between the svg borders and the actual chart graphic
        top: number,
        right: number,
        bottom: number,
        left: number
    };
    private _width: number;             // Component width
    private _height: number;            // Component height
    private _htmlElement: HTMLElement;  // Host HTMLElement
    private _minCount: number;          // Minimum word count
    private _maxCount: number;          // Maximum word count
    private _fontScale;                 // D3 scale for font size
    private _fillScale;                 // D3 scale for text color
    private _objDiffer;


    constructor(private _element: ElementRef,
                private _keyValueDiffers: KeyValueDiffers,
                private dataService:DataService) {
        this._htmlElement = this._element.nativeElement;
        this._host = D3.select(this._element.nativeElement);
        this._objDiffer = this._keyValueDiffers.find([]).create(null);


        this.config = new WordCloudConfig();
        this.config.dataset = ['foo', 'bar', 'baz'];

        if (!!this.settings) {
            this.config.settings = this.settings;
        } else {
            this.config.settings = {
                minFontSize: 18,
                maxFontSize: 96,
                fontFace: 'Roboto',
                fontWeight: 'normal',
                spiral: 'rectangular'
            };
        }

        this.dataService.tags.subscribe(queriedItems => {
            this.tags = queriedItems;

            /*
            console.log('tags array', this.tags);

            let flatTags = this.flatten(this.tags);
            console.log('flat tags', flatTags);
            */

            /*
            _.each(this.tags, postTags => {
                _.each(postTags, tag =>  this.config.dataset.push(tag.description));
            });

            queriedItems.map(postTags =>
                postTags.map(tag => this.config.dataset.push(tag.description))
            );
            */

            /*
            let foo = _.map(this.tags, postTags:ITag[] => {
                this.config.dataset.concat(_.map(postTags, 'description'));
            });
            */

            console.log('tags', this.tags);
        });
    }

    ngDoCheck() {
        let changes = this._objDiffer.diff(this.config);
        if (changes) {
            if (!this.config) {
                return;
            }
            this._setup();
            this._buildSVG();
            this._populate();
        }
    }

    private _setup() {
        this._margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };
        this._width = ((this._htmlElement.parentElement.clientWidth == 0)
                ? 300
                : this._htmlElement.parentElement.clientWidth) - this._margin.left - this._margin.right;
        if (this._width < 100) {
            this._width = 100;
        }
        this._height = this._width * 0.75 - this._margin.top - this._margin.bottom;

        this._minCount = D3.min(this.config.dataset, d => d.count);
        this._maxCount = D3.max(this.config.dataset, d => d.count);

        let minFontSize: number = (this.config.settings.minFontSize == null) ? 18 : this.config.settings.minFontSize;
        let maxFontSize: number = (this.config.settings.maxFontSize == null) ? 96 : this.config.settings.maxFontSize;
        this._fontScale = D3.scaleLinear()
            .domain([this._minCount, this._maxCount])
            .range([minFontSize, maxFontSize]);
        this._fillScale = D3.scaleOrdinal(D3.schemeCategory20);
    }

    private _buildSVG() {
        this._host.html('');
        this._svg = this._host
            .append('svg')
            .attr('width', this._width + this._margin.left + this._margin.right)
            .attr('height', this._height + this._margin.top + this._margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + ~~(this._width / 2) + ',' + ~~(this._height / 2) + ')');
    }

    private _populate() {
        let fontFace: string = (this.config.settings.fontFace == null) ? 'Roboto' : this.config.settings.fontFace;
        let fontWeight: string = (this.config.settings.fontWeight == null) ? 'normal' : this.config.settings.fontWeight;
        let spiralType: string = (this.config.settings.spiral == null) ? 'rectangular' : this.config.settings.spiral;

        D3.layout.cloud()
            .size([this._width, this._height])
            .words(this.config.dataset)
            .rotate(() => 0)
            .font(fontFace)
            .fontWeight(fontWeight)
            .fontSize(d => this._fontScale(d.count))
            .spiral(spiralType)
            .on('end', () => {
                this._drawWordCloud(this.config.dataset);
            })
            .start();
    }

    private _drawWordCloud(words) {
        this._svg
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .style('font-size', d => d.size + 'px')
            .style('fill', (d, i) => {
                return this._fillScale(i);
            })
            .attr('text-anchor', 'middle')
            .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
            .attr('class', 'word-cloud')
            .text(d => {
                return d.word;
            });
    }

    private flatten(items) {
        return _.flatMap(items, function(item) {
            return item.items ? this.flatten(item.items) : item;
        })
    }

}