import { Component, Method, Element, h, Listen, Prop } from '@stencil/core';
// import { Document, Operation } from 'document-viz-wasm';
import { initGraph, gradientArray } from '../../utils/utils';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { Operation } from 'document-viz-wasm';

@Component({
  tag: 'nama-graph-viz',
  styleUrl: 'nama-graph-viz.css',
  shadow: true,
})
export class NamaGraphViz {
  graph?: cytoscape.Core = null;

  @Prop() peer?: string;

  @Element() el;

  @Listen('namaPrune', { target: 'window' })
  async handleOnPrune(e: CustomEvent<{ peer: string, pruned: string[] }>) {
    const pruned = e.detail.pruned;
    await this.prune(pruned);
  }

  @Listen('namaSend', { target: 'window' })
  async handleOnSend(e: CustomEvent<{ operation: Operation }>) {
    const operation = e.detail.operation;
    await this.add(operation.authorName(), operation.hash(), operation.seqNum(), operation.previous());
    await this.layout();
  }

  @Method()
  public async add(author: string, id: string, seqNum: number, previous: string[]) {
    if (this.graph.$(`#${id}`).length !== 0) {
      return;
    }

    this.graph.add({
      group: 'nodes',
      grabbable: false,
      data: {
        label: `${author}_${seqNum}`,
        id,
        isNew: true,
      },
      style: {
        'background-color': gradientArray[seqNum % gradientArray.length],
      },
    });

    for (const previousId of previous) {
      if (this.graph.$(`#${previousId}`).length !== 0) {
        this.graph.add({
          group: 'edges',
          data: {
            source: previousId,
            target: id,
          },
        });
      }
    }
  }

  @Method()
  public async prune(pruned: string[]) {
    for (const hash of pruned) {
      if (this.graph.$(`#${hash}`).length === 0) {
        continue;
      }

      const node = this.graph.$(`#${hash}`);
      this.graph.remove(node);
    }
  }

  @Method()
  public async layout() {
    const options: dagre.DagreLayoutOptions = {
      name: 'dagre',
      animate: true,
      fit: true,
      nodeDimensionsIncludeLabels: true,
      animateFilter: function (node, _) {
        if (node.data().isNew) {
          node.data('isNew', false);
          return false;
        }
        return true;
      },
    };

    this.graph.layout(options).run();
  }

  componentDidLoad() {
    let div = this.el.shadowRoot.querySelector('#document');
    this.graph = initGraph(div as HTMLElement);
  }

  render() {
    return <div id="document"></div>;
  }
}
