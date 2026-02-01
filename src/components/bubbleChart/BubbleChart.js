import React, { Component } from 'react'
import * as d3 from "d3";
// import { select } from 'd3-selection';

class BubbleChart extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         data: {}
    //     };
    // }

    state = {
        data: {}
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        }, () => this.createChart())
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data.children !== this.props.data.children) {
            this.setState({
                data: this.props.data
            }, () => this.createChart())
        }
    }

    createChart = () => {
        d3.select('.bubble').remove();
        var color = d3.scaleOrdinal(d3.schemeCategory10);
        const width = this.props.width - (this.props.width * 0.1)

        var bubble = d3
            .pack(this.state.data)
            .size([width, width])
            .padding(1.5);

        var svg = d3
            .select("#chart-section")
            .append("svg")
            .attr("width", width)
            .attr("height", width)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(this.state.data)
            .sum(function (d) {
                return Number(d.id);
            })
            .sort(function (a, b) { return -1; });

        var node = svg
            .selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function (d) {
                // console.log(d)
                return !d.children;
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        node.append("title").text(function (d) {
            return d.Name + ": " + d.Count;
        });

        node
            .append("circle")
            .attr("r", function (d) {
                return d.r;
            })
            .style("fill", function (d, i) {
                return color(i);
            });

        node
            .append("text")
            .attr("dx", function (d) {
                return -d.r * 0.5
            })
            .attr("dy", ".2em")
            .text(function (d) {
                return d.data.title;
            })
            .attr("font-size", "12px")
            .attr("fill", "white");

        node
            .append("text")
            .attr("dx", function (d) {
                return -d.r * 0.5
            })
            .attr("dy", "1.3em")
            .text(function (d) {
                return d.data.value;
            })
            .attr("font-size", "32px")
            .attr("fill", "white");
    }

    render() {
        // console.log(this.state.data);
        return (
            <div id="chart-section">
                <div>{this.node}</div>
            </div>
        );
    }
}
export default BubbleChart